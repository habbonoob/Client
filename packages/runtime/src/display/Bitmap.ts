import { Sprite as PixiSprite, Texture, type Filter, type RenderTexture } from 'pixi.js';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapData } from './BitmapData';
import { bitmapCanvas } from './Graphics';
import { DisplayObject, displayState, type RenderFilterSource } from './DisplayObject';
import { gpuAvailable, releaseRenderTexture, renderFiltered } from './gpuSurface';
import { addBeforeRender } from './renderHooks';

/** Bitmaps on the stage drawn through filters (see Bitmap.#refreshFiltered). */
const filtered = new Set<Bitmap>();

/**
 * A bitmap drawn through filters, kept: what it was made from (the bitmap data at a version of its pixels, the
 * filters as assigned, the colour transform) and the frame it was last shown in.
 */
interface FilteredImage {
    readonly texture: RenderTexture;
    readonly pad: number;
    readonly version: number;
    readonly sources: readonly RenderFilterSource[];
    readonly color: string;
    shownIn: number;
}

/**
 * The filtered images, by the bitmap data they show, shared by every Bitmap showing the same thing: the room hands
 * its bitmaps (and their filters) from sprite to sprite as it sorts them, every frame while it is dragged, and an
 * image per Bitmap was made again at every hand-over. One no Bitmap showed in a frame is let go after it.
 */
const images = new Map<BitmapData, FilteredImage[]>();
let frame = 0;

/**
 * Shows a BitmapData. Several Bitmaps can share one BitmapData; changes to its pixels show up on
 * the next frame. A bitmap hit-tests as its whole rectangle, transparent pixels included.
 */
export class Bitmap extends DisplayObject {
    #bitmapData: BitmapData | null = null;
    #smoothing: boolean;
    #pixelSnapping: string;
    /** The filters the bitmap is drawn through (null: none). */
    #filters: Filter[] | null = null;
    /**
     * The bitmap drawn through its filters, shown in place of filtering it every frame (Flash, too, kept a filtered
     * object's image until it changed). While there is one, the sprite shows it and is not attached to the bitmap data.
     */
    #image: FilteredImage | null = null;

    constructor(bitmapData: BitmapData = null, pixelSnapping: string = 'auto', smoothing: boolean = false) {
        super(new PixiSprite(Texture.EMPTY));
        this.#smoothing = smoothing;
        this.#pixelSnapping = pixelSnapping;
        this.#sprite.roundPixels = pixelSnapping !== 'never';
        this.bitmapData = bitmapData;
    }

    get bitmapData(): BitmapData | null {
        return this.#bitmapData;
    }

    set bitmapData(value: BitmapData | null) {
        if (this.#bitmapData === value) return;
        // (showing a filtered image, the sprite follows no bitmap data: the image is found again before it is drawn)
        const attached = this.#image == null;
        if (this.#bitmapData) {
            if (this.#smoothing) this.#bitmapData.smoothingUser(-1);
            if (attached) this.#bitmapData.detachSprite(this.#sprite);
        }
        this.#bitmapData = value;
        if (value) {
            if (this.#smoothing) value.smoothingUser(1);
            if (attached) value.attachSprite(this.#sprite);
        } else if (attached) {
            this.#sprite.texture = Texture.EMPTY;
        }
    }

    /** Smooth the bitmap when it is scaled or rotated. */
    get smoothing(): boolean {
        return this.#smoothing;
    }

    set smoothing(value: boolean) {
        if (value === this.#smoothing) return;
        this.#smoothing = value;
        this.#bitmapData?.smoothingUser(value ? 1 : -1);
    }

    /** 'auto', 'always' or 'never': whether the bitmap is drawn at whole pixel positions. */
    get pixelSnapping(): string {
        return this.#pixelSnapping;
    }

    set pixelSnapping(value: string) {
        this.#pixelSnapping = value;
        this.#sprite.roundPixels = value !== 'never';
    }

    get #sprite(): PixiSprite {
        return this.node as PixiSprite;
    }

    protected override localBounds(): Rectangle {
        const b = this.#bitmapData;
        return b ? new Rectangle(0, 0, b.width, b.height) : new Rectangle();
    }

    protected override renderContent(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void {
        if (!this.#bitmapData) return;
        const smoothing = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = smoothing || this.#smoothing;
        ctx.drawImage(bitmapCanvas(this.#bitmapData), 0, 0);
        ctx.imageSmoothingEnabled = smoothing;
    }

    protected override showFilters(filters: Filter[] | null): void {
        this.#filters = filters;
        if (filters) {
            filtered.add(this);
            // the image shown, if any, is found again (for these filters) before the next frame
            if (!this.#image) this.node.filters = filters;
        } else {
            filtered.delete(this);
            this.#dropFilteredImage();
            this.node.filters = null;
        }
    }

    /**
     * Before a frame: a bitmap shown through filters at its own pixel size (unscaled, unrotated, as room sprites
     * are) shows the filtered image of its bitmap data, made only when no Bitmap has shown that bitmap's pixels
     * through the same filters. A glowing furni filtered every frame (its passes, and binding them) cost a busy room
     * a third of its frame. Drawn any other way, it is filtered as it is drawn.
     */
    #refreshFiltered(): void {
        const data = this.#bitmapData, filters = this.#filters;
        // on the stage, shown, and drawn at its own pixel size (nothing above it scales or rotates it): one walk up,
        // making nothing
        let top: DisplayObject = this, shown = true, unscaled = true;
        for (let o: DisplayObject | null = this; o; o = o.parent) {
            top = o;
            if (!o.visible) shown = false;
            if (unscaled && !displayState.translatesOnly(o)) unscaled = false;
        }
        if (!(top as { isStage?: boolean }).isStage) {
            // nothing kept for a bitmap off the stage (one dropped there would be held here for good): until its
            // filters are set again, it is filtered as it is drawn
            filtered.delete(this);
            this.#dropFilteredImage();
            return;
        }
        if (!filters || !data || !gpuAvailable()) {
            this.#dropFilteredImage();
            return;
        }
        // not drawn now: left as it is until it is
        if (!shown) {
            if (this.#image) this.#image.shownIn = frame;
            return;
        }
        const version = data.contentVersion;
        if (!unscaled || version < 0) {
            this.#dropFilteredImage();
            return;
        }
        const sources = displayState.filterSources(this);
        const color = colorKey(displayState.colorTransform(this));
        let list = images.get(data);
        let image = list?.find(i => i.version === version && i.color === color && sameSources(i.sources, sources));
        if (!image) {
            const pad = filters.reduce((n, f) => n + Math.ceil(f.padding), 0);
            image = { texture: renderFiltered(data.texture(), filters, pad), pad, version, sources, color, shownIn: frame };
            if (!list) images.set(data, list = []);
            list.push(image);
        }
        image.shownIn = frame;
        if (image === this.#image) return;
        if (!this.#image) {
            data.detachSprite(this.#sprite);
            this.node.filters = null;
        }
        this.#image = image;
        this.#sprite.texture = image.texture;
        this.#sprite.anchor.set(image.pad / image.texture.width, image.pad / image.texture.height);
    }

    /** Back to showing the bitmap data, filtered as it is drawn. */
    #dropFilteredImage(): void {
        if (!this.#image) return;
        this.#image = null;
        const sprite = this.#sprite;
        sprite.anchor.set(0, 0);
        const data = this.#bitmapData;
        if (data && data.contentVersion >= 0) data.attachSprite(sprite);
        else sprite.texture = Texture.EMPTY;
        this.node.filters = this.#filters;
    }

    static {
        addBeforeRender(() => {
            frame++;
            for (const b of filtered) b.#refreshFiltered();
            // the images no Bitmap showed this frame are let go
            for (const [data, list] of images) {
                const kept = list.filter(i => i.shownIn === frame || (releaseRenderTexture(i.texture), false));
                if (kept.length) images.set(data, kept);
                else images.delete(data);
            }
        });
    }
}

/** Filters as assigned, the same effects in the same order (BitmapFilter.sameAs). */
function sameSources(a: readonly RenderFilterSource[], b: readonly RenderFilterSource[]): boolean {
    return a === b || (a.length === b.length && a.every((f, i) => (f as { sameAs?(o: unknown): boolean }).sameAs?.(b[i]) === true));
}

/** A colour transform's settings as a key (its colour filter is part of the filtered image). */
function colorKey(c: ColorTransform): string {
    return `${c.redMultiplier},${c.greenMultiplier},${c.blueMultiplier},${c.redOffset},${c.greenOffset},${c.blueOffset},${c.alphaOffset}`;
}
