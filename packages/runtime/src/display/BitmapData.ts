import { Matrix as PixiMatrix, Texture, type Sprite as PixiSprite, type TextureSource } from 'pixi.js';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import { COMPOSITE, PIXEL_BLENDS, applyColorTransform, blendPixels, isIdentityColor, newLayer, releaseLayer, renderTree } from './canvasRender';
import { acquireCanvas, releaseCanvas, type PooledCanvas } from './canvasPool';
import type { Ctx } from './canvasRender';
import { DisplayObject } from './DisplayObject';
import { FILTER_PIXELS, isPixelFilter } from './filterHooks';
import { BitmapPass } from './BitmapPass';
import { GpuSurface, cropDraw, gpuAvailable, gpuBitmapStats, paletteTexture, releaseRenderTexture, snapshot } from './gpuSurface';
import { setBitmapCanvasAccessor } from './Graphics';
import type { IBitmapDrawable } from './IBitmapDrawable';
import { ATLAS_MAX_SIDE, allocateSlot, copyToSlot, flushAtlas, releaseSlot, setAtlasResetHandler, slotLive, type AtlasSlot } from './displayAtlas';
import { encodePng } from './png';
import { perlinNoise } from './perlin';
import { addBeforeRender, runBeforeRender } from './renderHooks';

const MAX_SIDE = 8191;
/** The one BitmapPass, configured for each pass it runs. */
let passFilter: BitmapPass | null = null;
const MAX_PIXELS = 16777215;
/** Bitmaps with a texture to upload, or GPU drawing to render, before the next frame. */
const dirty = new Set<BitmapData>();

/** Bitmaps whose sprites changed (the first came, or the last went): shown from the atlas, or not, before the frame. */
const slotChecks = new Set<BitmapData>();
/** Bitmaps shown from the atlas, weakly: given new slots when its pages are emptied. */
const atlased = new Set<WeakRef<BitmapData>>();
let syncSlotOf: (b: BitmapData) => void;

/**
 * Before each render: upload changed bitmaps to their textures, render the drawing queued for GPU bitmaps, and copy
 * the changed ones shown from the display atlas into it.
 */
export function flushBitmapTextures(): void {
    for (const b of dirty) b.syncTexture();
    dirty.clear();
    for (const b of slotChecks) syncSlotOf(b);
    slotChecks.clear();
    flushAtlas();
}

/** What a bitmap holds outside the JS heap: its render texture, and its canvas with the texture uploading it. */
interface Held {
    gpu: GpuSurface | null;
    canvas: PooledCanvas | null;
    readonly transparent: boolean;
}

/**
 * Gives what a bitmap held back to the pools once the bitmap itself is collected, as Flash freed a dropped
 * BitmapData's pixels. The client drops many without dispose() (a room's coloured copy of a plane, made anew at every
 * repaint), and their render textures, which the renderer keeps a list of, stayed for good.
 */
const reclaim = new FinalizationRegistry<Held>(held => {
    held.gpu?.destroy();
    if (held.canvas) releaseCanvas(held.canvas, held.transparent);
});

/**
 * A rectangular pixel image (premultiplied internally, like the original format, so very low alpha values lose
 * colour precision the same way). Pixel values going in and out are 0xAARRGGBB, unmultiplied. A non-transparent
 * bitmap is always fully opaque.
 *
 * Its pixels live on the CPU, in a Canvas2D canvas, or on the GPU, in a render texture (gpuSurface), or both while
 * they agree. A new bitmap is only its fill colour until one side is needed. Copying and drawing bitmaps into a
 * bitmap that is on the GPU (or new) runs on the GPU when the arguments allow (copyPixels without an alpha bitmap,
 * draw of a bitmap through a translation or flip, a multiply-only colour transform and the normal blend, fillRect),
 * and is shown straight from the render texture. Everything else runs on the canvas: canvas operations (fillRect,
 * copyPixels, draw) on it, per-pixel operations on a cached copy of its pixels written back before the next canvas
 * operation; a GPU bitmap is read back first. A bitmap written on the CPU after it was on the GPU stays on the CPU,
 * so one used both ways does not move back and forth. Shown through a canvas, it uploads when its pixels changed,
 * unless locked.
 */
export class BitmapData implements IBitmapDrawable {
    readonly #width: number;
    readonly #height: number;
    readonly #transparent: boolean;
    /** The CPU side, taken from the pool when first needed (a bitmap that only lives on the GPU never has one). */
    #canvas: HTMLCanvasElement | null = null;
    #ctx: CanvasRenderingContext2D | null = null;
    #disposed = false;
    /** Straight RGBA copy of the canvas, when it is current. */
    #pixels: ImageData | null = null;
    /** #pixels holds changes the canvas doesn't have yet. */
    #pixelsAhead = false;
    /** The canvas's texture (showing the bitmap while it is on the CPU, or reading it as a GPU source). */
    #texture: Texture | null = null;
    #locked = false;
    #smoothUsers = 0;
    /** The PIXI sprites currently showing this bitmap (Bitmap instances). */
    #sprites = new Set<PixiSprite>();

    /** The pixels on the GPU, when they have been there. */
    #gpu: GpuSurface | null = null;
    /** Whether the canvas, and the render texture, hold the current pixels (neither: the bitmap is #fillOnly). */
    #cpuCurrent = false;
    #gpuCurrent = false;
    /** The colour the whole bitmap is, while nothing else has been drawn into it (no side holds it yet). */
    #fillOnly: number | null;
    /** Written on the CPU after being on the GPU: stays on the CPU. */
    #stayCpu = false;
    /**
     * GPU bitmaps whose queued drawing reads this one, held weakly: rendered before this one changes. One whose queue
     * has been rendered reads it no more and is let go (held, an asset kept every copy ever made of it).
     */
    #readers = new Set<WeakRef<BitmapData>>();
    /** How many readers the set may hold before the ones done reading are let go. */
    #readersLimit = 32;
    /** This bitmap, weakly, as the bitmaps it reads hold it (made when it first reads one). */
    #weak: WeakRef<BitmapData> | null = null;
    /** What it holds outside the heap, for the pools once it is collected (see reclaim); registered when it holds any. */
    readonly #held: Held;
    #registered = false;
    /** Counts the changes to the pixels (see contentVersion). */
    #version = 0;
    /** The display atlas slot its sprites show it from, and the version of its pixels copied there (see #syncSlot). */
    #slot: AtlasSlot | null = null;
    #slotVersion = -1;
    /** The alpha channel as the GPU had it at a version (null while it is being fetched): alphaWithoutWaiting. */
    #fetchedAlpha: { version: number; alpha: Uint8Array | null } | null = null;

    constructor(width: number, height: number, transparent: boolean = true, fillColor: number = 0xffffffff) {
        width |= 0;
        height |= 0;
        if (width <= 0 || height <= 0 || width > MAX_SIDE || height > MAX_SIDE || width * height > MAX_PIXELS) {
            throw new ArgumentError('Invalid BitmapData.');
        }
        this.#width = width;
        this.#height = height;
        this.#transparent = transparent;
        this.#fillOnly = (transparent ? fillColor : fillColor | 0xff000000) >>> 0;
        this.#held = { gpu: null, canvas: null, transparent };
    }

    get width(): number {
        this.#live();
        return this.#width;
    }

    get height(): number {
        this.#live();
        return this.#height;
    }

    get transparent(): boolean {
        this.#live();
        return this.#transparent;
    }

    get rect(): Rectangle {
        this.#live();
        return new Rectangle(0, 0, this.#width, this.#height);
    }

    /**
     * A number every change to the pixels moves on, -1 once disposed: what was made from the pixels (a Bitmap's
     * filtered image) is stale when it no longer matches.
     */
    get contentVersion(): number {
        return this.#disposed ? -1 : this.#version;
    }

    // ---------- single pixels ----------

    /** 0xRRGGBB at (x, y); 0 outside the bitmap. */
    getPixel(x: number, y: number): number {
        return this.getPixel32(x, y) & 0xffffff;
    }

    /** 0xAARRGGBB at (x, y); 0 outside the bitmap. */
    getPixel32(x: number, y: number): number {
        x |= 0;
        y |= 0;
        if (!this.#inside(x, y)) return 0;
        if (!this.#cpuCurrent) {
            // one pixel of a bitmap that is only its fill colour
            if (this.#fillOnly != null) return this.#fillOnly >>> 24 === 0 ? 0 : this.#fillOnly;
        }
        const d = this.#read().data, i = (y * this.#width + x) * 4;
        return ((d[i + 3] << 24) | (d[i] << 16) | (d[i + 1] << 8) | d[i + 2]) >>> 0;
    }

    /**
     * The alpha (0-255) at (x, y) when it can be had without waiting for the GPU; null when the pixels are only
     * there, drawn since they were last read: they are then fetched without waiting, for a call on a later frame.
     * Not part of AS3: for tests run every frame that can take an answer a frame late (the room's hover test), where
     * getPixel32 would hold the frame until the GPU had drawn everything asked of it.
     */
    alphaWithoutWaiting(x: number, y: number): number | null {
        x |= 0;
        y |= 0;
        if (!this.#inside(x, y)) return 0;
        if (this.#cpuCurrent || this.#fillOnly != null || !this.#gpu || this.#replayable(true)) return this.getPixel32(x, y) >>> 24;
        const fetched = this.#fetchedAlpha;
        if (fetched?.version === this.#version) return fetched.alpha ? fetched.alpha[y * this.#width + x] : null;
        const version = this.#version;
        const fetch: { version: number; alpha: Uint8Array | null } = { version, alpha: null };
        this.#fetchedAlpha = fetch;
        if (!this.#gpu.fetchAlpha(alpha => { fetch.alpha = alpha; })) return this.getPixel32(x, y) >>> 24;
        return null;
    }

    /** Set RGB at (x, y), keeping the pixel's alpha. */
    setPixel(x: number, y: number, color: number): void {
        x |= 0;
        y |= 0;
        if (!this.#inside(x, y)) return;
        this.#cpuWrite();
        const d = this.#read().data, i = (y * this.#width + x) * 4;
        d[i] = (color >> 16) & 255;
        d[i + 1] = (color >> 8) & 255;
        d[i + 2] = color & 255;
        this.#wrote();
    }

    setPixel32(x: number, y: number, color: number): void {
        x |= 0;
        y |= 0;
        if (!this.#inside(x, y)) return;
        this.#cpuWrite();
        const d = this.#read().data, i = (y * this.#width + x) * 4;
        d[i] = (color >> 16) & 255;
        d[i + 1] = (color >> 8) & 255;
        d[i + 2] = color & 255;
        d[i + 3] = this.#transparent ? (color >>> 24) & 255 : 255;
        this.#wrote();
    }

    // ---------- pixel blocks ----------

    /** The pixels of `rect` (clipped) as big-endian 0xAARRGGBB words. */
    getPixels(rect: Rectangle): ByteArray {
        const out = new ByteArray();
        for (const v of this.getVector(rect)) out.writeUnsignedInt(v);
        out.position = 0;
        return out;
    }

    /** Write `rect` (clipped) from 32-bit ARGB words read from `inputByteArray`. */
    setPixels(rect: Rectangle, inputByteArray: ByteArray): void {
        const r = this.#clip(rect);
        this.#cpuWrite();
        const d = this.#read().data;
        for (let y = r.y; y < r.bottom; y++) {
            for (let x = r.x; x < r.right; x++) this.#put(d, x, y, inputByteArray.readUnsignedInt());
        }
        this.#wrote();
    }

    getVector(rect: Rectangle): number[] {
        const r = this.#clip(rect);
        const d = this.#read().data;
        const out: number[] = [];
        for (let y = r.y; y < r.bottom; y++) {
            for (let x = r.x; x < r.right; x++) {
                const i = (y * this.#width + x) * 4;
                out.push(((d[i + 3] << 24) | (d[i] << 16) | (d[i + 1] << 8) | d[i + 2]) >>> 0);
            }
        }
        return out;
    }

    setVector(rect: Rectangle, inputVector: number[]): void {
        const r = this.#clip(rect);
        this.#cpuWrite();
        const d = this.#read().data;
        let n = 0;
        for (let y = r.y; y < r.bottom; y++) {
            for (let x = r.x; x < r.right; x++) {
                if (n >= inputVector.length) throw new RangeError('The supplied vector is too short.');
                this.#put(d, x, y, inputVector[n++]);
            }
        }
        this.#wrote();
    }

    // ---------- canvas operations ----------

    fillRect(rect: Rectangle, color: number): void {
        const r = this.#clip(rect);
        if (r.width <= 0 || r.height <= 0) return;
        const fill = (this.#transparent ? color : color | 0xff000000) >>> 0;
        if (r.width === this.#width && r.height === this.#height) {
            // the whole bitmap one colour: nothing to draw until a side is needed
            this.#beforeWrite();
            this.#gpu?.clear(fill, !this.#transparent);
            this.#fillOnly = fill;
            this.#cpuCurrent = false;
            this.#gpuCurrent = false;
            this.#pixels = null;
            this.#pixelsAhead = false;
            this.#changed();
            return;
        }
        if (this.#onGpu()) {
            this.#gpuWrite();
            const white = Texture.WHITE;
            const a = this.#transparent ? ((fill >>> 24) & 255) / 255 : 1;
            this.#gpu!.enqueue({
                texture: white, matrix: [r.width / white.frame.width, 0, 0, r.height / white.frame.height, r.x, r.y],
                blend: 'none', tint: fill & 0xffffff, alpha: a,
            });
            return;
        }
        this.#cpuWrite();
        this.#fill(r.x, r.y, r.width, r.height, fill);
    }

    /**
     * Copy `sourceRect` of `sourceBitmapData` to `destPoint`. Without mergeAlpha the destination
     * pixels are replaced; with it (or copying a transparent source into an opaque bitmap) the
     * source is composited over them. With an alpha bitmap, its alpha channel (from alphaPoint)
     * multiplies the source alpha.
     */
    copyPixels(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, alphaBitmapData: BitmapData = null, alphaPoint: Point = null, mergeAlpha: boolean = false): void {
        const mapped = this.#mapRect(sourceBitmapData, sourceRect, destPoint);
        if (!mapped) return;
        const [x0, y0, w, h, dx, dy] = mapped;
        const blend = mergeAlpha || (sourceBitmapData.#transparent && !this.#transparent);
        if (alphaBitmapData && this.#onGpuFor(sourceBitmapData)) {
            const ap = alphaPoint ?? new Point();
            const mask = snapshot(alphaBitmapData.#passSource(this), Math.floor(ap.x), Math.floor(ap.y), w, h);
            this.#pass(sourceBitmapData, x0, y0, w, h, dx, dy, (pass, source) =>
                pass.alphaCopy(source, mask.source, mergeAlpha || !this.#transparent, !this.#transparent));
            releaseRenderTexture(mask);
            return;
        }
        if (!alphaBitmapData && sourceBitmapData !== this && this.#onGpuFor(sourceBitmapData)) {
            // onto a bitmap that is still all transparent, replacing and compositing come to the same: composited,
            // the copy stays one a copy of this bitmap can take over, or the canvas replay (the first copy into a
            // new bitmap usually replaces: a skin piece cut out of its sheet)
            const composite = blend || (this.#transparent && this.#fillOnly === 0);
            if (this.#copyQueued(sourceBitmapData, x0, y0, w, h, dx, dy, !composite)) return;
            const source = sourceBitmapData.#gpuSource(this);
            this.#gpuWrite();
            this.#gpu!.enqueue({
                texture: source, frame: { x: x0, y: y0, width: w, height: h }, matrix: [1, 0, 0, 1, dx, dy],
                blend: composite ? 'normal' : 'none', tint: 0xffffff, alpha: 1, source: sourceBitmapData,
            });
            return;
        }
        this.#cpuWrite();
        if (alphaBitmapData) {
            this.#copyWithAlphaBitmap(sourceBitmapData, x0, y0, w, h, dx, dy, alphaBitmapData, alphaPoint ?? new Point(), mergeAlpha);
            return;
        }
        const src = sourceBitmapData.#canvasFor();
        const ctx = this.#canvasCtx();
        ctx.save();
        ctx.beginPath();
        ctx.rect(dx, dy, w, h);
        ctx.clip();
        ctx.globalCompositeOperation = blend ? 'source-over' : 'copy';
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(src, x0, y0, w, h, dx, dy, w, h);
        ctx.restore();
        this.#drew();
    }

    /**
     * Draw a display object (its content and children, without its own transform) or another
     * bitmap, through `matrix`, colour transform, blend mode and clip rectangle.
     */
    draw(source: IBitmapDrawable, matrix: Matrix = null, colorTransform: ColorTransform = null, blendMode: string = null,
        clipRect: Rectangle = null, smoothing: boolean = false): void {
        const m = matrix ? matrix.clone() : new Matrix();
        if (source instanceof BitmapData && source !== this && this.#onGpuFor(source) && this.#gpuDraw(source, m, colorTransform, blendMode, clipRect)) return;
        // only what is on the stage: the frame's preparation keeps its GPU side current; something drawn off the
        // stage (a text field into a window's bitmap) is drawn on the canvas, as it always was
        if (source instanceof DisplayObject && source.stage != null && this.#onGpu() && (blendMode ?? 'normal') === 'normal' && clipRect == null) {
            if (isIdentityColor(colorTransform)) {
                this.#gpuDrawDisplay(source, m);
                return;
            }
            // with a colour transform: drawn into a layer of its own, transformed there, and that layer drawn over
            // this one (a modal dialog's second layer darkens the window under it so)
            const layer = new BitmapData(this.#width, this.#height, true, 0);
            layer.#gpuDrawDisplay(source, m);
            layer.colorTransform(layer.rect, colorTransform!);
            this.draw(layer);
            layer.dispose();
            return;
        }
        this.#cpuWrite();
        const ctx = this.#canvasCtx();
        const direct = isIdentityColor(colorTransform) && !PIXEL_BLENDS.has(blendMode ?? 'normal');
        const target: Ctx = direct ? ctx : newLayer(this.#width, this.#height);
        target.save();
        if (clipRect) {
            target.beginPath();
            target.rect(clipRect.x, clipRect.y, clipRect.width, clipRect.height);
            target.clip();
        }
        if (source instanceof BitmapData) {
            target.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            target.imageSmoothingEnabled = smoothing;
            if (direct) target.globalCompositeOperation = COMPOSITE[blendMode ?? 'normal'] ?? 'source-over';
            target.drawImage(source.#canvasFor(), 0, 0);
        } else if (source instanceof DisplayObject) {
            if (direct) target.globalCompositeOperation = COMPOSITE[blendMode ?? 'normal'] ?? 'source-over';
            renderTree(target, source, m, null, null, smoothing);
        } else {
            throw new TypeError('draw(): the source must be a display object or a BitmapData.');
        }
        target.restore();
        if (!direct) {
            if (!isIdentityColor(colorTransform)) {
                const img = target.getImageData(0, 0, this.#width, this.#height);
                applyColorTransform(img.data, colorTransform!);
                target.putImageData(img, 0, 0);
            }
            ctx.save();
            if (PIXEL_BLENDS.has(blendMode ?? 'normal')) blendPixels(ctx, target, blendMode!);
            else {
                ctx.globalCompositeOperation = COMPOSITE[blendMode ?? 'normal'] ?? 'source-over';
                ctx.drawImage(target.canvas, 0, 0);
            }
            ctx.restore();
            releaseLayer(target);
        }
        this.#drew();
    }

    /** draw() with a quality setting; the canvas renderer has a single quality. */
    drawWithQuality(source: IBitmapDrawable, matrix: Matrix = null, colorTransform: ColorTransform = null, blendMode: string = null,
        clipRect: Rectangle = null, smoothing: boolean = false, quality: string = null): void {
        void quality;
        this.draw(source, matrix, colorTransform, blendMode, clipRect, smoothing);
    }

    // ---------- per-pixel operations ----------

    /** Apply a colour transform to the pixels of `rect`. */
    colorTransform(rect: Rectangle, colorTransform: ColorTransform): void {
        const r = this.#clip(rect);
        if (r.width <= 0 || r.height <= 0) return;
        if (this.#onGpu()) {
            const tint = tintOf(colorTransform);
            if (tint) {
                this.#gpuWrite();
                // an opaque bitmap stays opaque: only its colour is multiplied
                const [colour, alpha] = this.#transparent ? tint : [tint[0], 1];
                // the whole of a bitmap that is one queued copy (a window skin's piece, cloned to be coloured at every
                // draw) is tinted by tinting that copy: nothing renders, and its canvas can still be made without the
                // GPU (#replayOnCanvas) when a canvas bitmap copies it
                if (r.x === 0 && r.y === 0 && r.width === this.#width && r.height === this.#height && this.#gpu!.tintQueued(colour, alpha)) return;
                // multiplying the premultiplied pixels by the alpha too multiplies their colour by the colour multipliers
                this.#gpu!.multiply(r.x, r.y, r.width, r.height, colour, alpha);
                return;
            }
            // anything else a tint cannot do (offsets, a multiplier between two 255ths) as the CPU computes it
            const ct = colorTransform;
            this.#pass(this, r.x, r.y, r.width, r.height, r.x, r.y, pass => pass.colorTransform(
                [ct.redMultiplier, ct.greenMultiplier, ct.blueMultiplier, ct.alphaMultiplier],
                [ct.redOffset, ct.greenOffset, ct.blueOffset, ct.alphaOffset], !this.#transparent));
            return;
        }
        this.#cpuWrite();
        const d = this.#read().data;
        for (let y = r.y; y < r.bottom; y++) {
            const row = new Uint8ClampedArray(d.buffer, (y * this.#width + r.x) * 4, r.width * 4);
            applyColorTransform(row, colorTransform);
            if (!this.#transparent) for (let i = 3; i < row.length; i += 4) row[i] = 255;
        }
        this.#wrote();
    }

    /** Copy one channel (1 red, 2 green, 4 blue, 8 alpha) of the source into a channel of this bitmap. */
    copyChannel(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, sourceChannel: number, destChannel: number): void {
        const ch = (c: number) => (c === 1 ? 0 : c === 2 ? 1 : c === 4 ? 2 : c === 8 ? 3 : -1);
        const sc = ch(sourceChannel), dc = ch(destChannel);
        if (sc < 0 || dc < 0) return;
        if (dc === 3 && !this.#transparent) return;
        const mapped = this.#mapRect(sourceBitmapData, sourceRect, destPoint);
        if (!mapped) return;
        if (this.#onGpuFor(sourceBitmapData)) {
            const [x0, y0, w, h, dx, dy] = mapped;
            this.#pass(sourceBitmapData, x0, y0, w, h, dx, dy, (pass, source) => pass.channelCopy(source, sc, dc, !this.#transparent));
            return;
        }
        this.#cpuWrite();
        const s = sourceBitmapData.#read().data;
        const d = this.#read().data;
        this.#eachMapped(sourceBitmapData, sourceRect, destPoint, (si, di) => { d[di + dc] = s[si + sc]; });
        this.#wrote();
    }

    /** Per channel: (source × mult + dest × (256 − mult)) / 256. */
    merge(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, redMultiplier: number, greenMultiplier: number, blueMultiplier: number, alphaMultiplier: number): void {
        this.#cpuWrite();
        const s = sourceBitmapData.#read().data;
        const d = this.#read().data;
        const mult = [redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier].map(v => Math.max(0, Math.min(256, v >>> 0)));
        this.#eachMapped(sourceBitmapData, sourceRect, destPoint, (si, di) => {
            for (let c = 0; c < 4; c++) d[di + c] = (s[si + c] * mult[c] + d[di + c] * (256 - mult[c])) >> 8;
            if (!this.#transparent) d[di + 3] = 255;
        });
        this.#wrote();
    }

    /**
     * Remap channels through lookup tables: each output pixel is the sum of redArray[r],
     * greenArray[g], blueArray[b] and alphaArray[a] (full ARGB values); a missing array passes
     * its channel through unchanged.
     */
    paletteMap(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, redArray: any[] = null, greenArray: any[] = null, blueArray: any[] = null, alphaArray: any[] = null): void {
        const table = (arr: any[] | null, shift: number) => {
            const t = new Uint32Array(256);
            for (let i = 0; i < 256; i++) t[i] = arr ? (arr[i] >>> 0) : (i << shift) >>> 0;
            return t;
        };
        const tr = table(redArray, 16), tg = table(greenArray, 8), tb = table(blueArray, 0), ta = table(alphaArray, 24);
        const mapped = this.#mapRect(sourceBitmapData, sourceRect, destPoint);
        if (!mapped) return;
        if (this.#onGpuFor(sourceBitmapData)) {
            const [x0, y0, w, h, dx, dy] = mapped;
            const palette = paletteTexture([tr, tg, tb, ta]);
            this.#pass(sourceBitmapData, x0, y0, w, h, dx, dy, (pass, source) => pass.paletteMap(source, palette, !this.#transparent));
            return;
        }
        this.#cpuWrite();
        const s = sourceBitmapData.#read().data;
        const d = this.#read().data;
        this.#eachMapped(sourceBitmapData, sourceRect, destPoint, (si, di) => {
            const v = (tr[s[si]] + tg[s[si + 1]] + tb[s[si + 2]] + ta[s[si + 3]]) >>> 0;
            d[di] = (v >> 16) & 255;
            d[di + 1] = (v >> 8) & 255;
            d[di + 2] = v & 255;
            d[di + 3] = this.#transparent ? (v >>> 24) & 255 : 255;
        });
        this.#wrote();
    }

    /**
     * Test each source pixel (ARGB, masked) against `threshold` (masked) with `operation` ("<", "<=", ">",
     * ">=", "==", "!="): a pixel that passes is set to `color`, one that fails is copied from the source when
     * `copySource` (left as it is otherwise). Returns how many pixels passed.
     */
    threshold(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, operation: string, threshold: number,
              color: number = 0, mask: number = 0xffffffff, copySource: boolean = false): number {
        const test: ((v: number, t: number) => boolean) | undefined = ({
            '<': (v, t) => v < t, '<=': (v, t) => v <= t, '>': (v, t) => v > t,
            '>=': (v, t) => v >= t, '==': (v, t) => v === t, '!=': (v, t) => v !== t,
        } as Record<string, (v: number, t: number) => boolean>)[operation];
        if (!test) throw new ArgumentError('Error #2005: Parameter 3 is of the incorrect type. Should be type Operation.');
        mask >>>= 0;
        const t = (threshold & mask) >>> 0;
        this.#cpuWrite();
        // the source as it was before any write (it may be this bitmap)
        const s = sourceBitmapData === this ? this.#read().data.slice() : sourceBitmapData.#read().data;
        const d = this.#read().data;
        const opaque = !sourceBitmapData.#transparent;
        const r = (color >> 16) & 255, g = (color >> 8) & 255, b = color & 255, a = this.#transparent ? (color >>> 24) & 255 : 255;
        let passed = 0;
        this.#eachMapped(sourceBitmapData, sourceRect, destPoint, (si, di) => {
            const v = ((opaque ? 255 : s[si + 3]) << 24 | s[si] << 16 | s[si + 1] << 8 | s[si + 2]) >>> 0;
            if (test((v & mask) >>> 0, t)) {
                d[di] = r; d[di + 1] = g; d[di + 2] = b; d[di + 3] = a;
                passed++;
            } else if (copySource) {
                d[di] = s[si]; d[di + 1] = s[si + 1]; d[di + 2] = s[si + 2];
                d[di + 3] = this.#transparent ? (opaque ? 255 : s[si + 3]) : 255;
            }
        });
        this.#wrote();
        return passed;
    }

    /** Fill the 4-connected area of pixels equal to the one at (x, y) with `color`. */
    floodFill(x: number, y: number, color: number): void {
        x |= 0;
        y |= 0;
        if (!this.#inside(x, y)) return;
        const target = this.getPixel32(x, y);
        const fill = this.#transparent ? color >>> 0 : (color | 0xff000000) >>> 0;
        if (target === fill) return;
        this.#cpuWrite();
        const d = this.#read().data, w = this.#width, h = this.#height;
        const same = (i: number) => ((d[i + 3] << 24) | (d[i] << 16) | (d[i + 1] << 8) | d[i + 2]) >>> 0 === target;
        const stack = [x, y];
        while (stack.length) {
            const py = stack.pop()!, px = stack.pop()!;
            if (px < 0 || py < 0 || px >= w || py >= h) continue;
            const i = (py * w + px) * 4;
            if (!same(i)) continue;
            this.#put(d, px, py, fill);
            stack.push(px + 1, py, px - 1, py, px, py + 1, px, py - 1);
        }
        this.#wrote();
    }

    /** Fill with Perlin noise (see perlin.ts); channels: 1 red, 2 green, 4 blue, 8 alpha. */
    perlinNoise(baseX: number, baseY: number, numOctaves: number, randomSeed: number, stitch: boolean, fractalNoise: boolean,
        channelOptions: number = 7, grayScale: boolean = false, offsets: any[] = null): void {
        this.#cpuWrite();
        const img = this.#read();
        perlinNoise(img.data, this.#width, this.#height, { baseX, baseY, numOctaves, randomSeed, stitch, fractalNoise, channelOptions, grayScale, offsets });
        if (!this.#transparent) for (let i = 3; i < img.data.length; i += 4) img.data[i] = 255;
        this.#wrote();
    }

    /**
     * Replace `numPixels` pixels of `sourceRect` (at destPoint) in a seeded pseudo-random order:
     * with the source's pixels, or with fillColor when the source is this bitmap. Returns the seed
     * to continue the dissolve with on the next call.
     */
    pixelDissolve(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, randomSeed: number = 0, numPixels: number = 0, fillColor: number = 0): number {
        const w = Math.floor(sourceRect.width), h = Math.floor(sourceRect.height);
        const total = w * h;
        if (total <= 0) return randomSeed;
        this.#cpuWrite();
        const s = sourceBitmapData.#read().data;
        const d = this.#read().data;
        const self = sourceBitmapData === this;
        // a full-period linear congruential walk over the rectangle's pixels
        let seed = ((randomSeed % total) + total) % total;
        const step = coprimeStep(total);
        for (let n = 0; n < numPixels; n++) {
            seed = (seed + step) % total;
            const px = seed % w, py = Math.floor(seed / w);
            const sx = Math.floor(sourceRect.x) + px, sy = Math.floor(sourceRect.y) + py;
            const dx = Math.floor(destPoint.x) + px, dy = Math.floor(destPoint.y) + py;
            if (!this.#inside(dx, dy)) continue;
            if (self) this.#put(d, dx, dy, fillColor);
            else if (sourceBitmapData.#inside(sx, sy)) {
                const si = (sy * sourceBitmapData.#width + sx) * 4, di = (dy * this.#width + dx) * 4;
                d[di] = s[si]; d[di + 1] = s[si + 1]; d[di + 2] = s[si + 2]; d[di + 3] = this.#transparent ? s[si + 3] : 255;
            }
        }
        this.#wrote();
        return seed;
    }

    /** Run a filter over `sourceRect` of the source, writing the result at destPoint. */
    applyFilter(sourceBitmapData: BitmapData, sourceRect: Rectangle, destPoint: Point, filter: any): void {
        if (!isPixelFilter(filter)) throw new TypeError('applyFilter(): unsupported filter.');
        const r = sourceBitmapData.#clip(sourceRect);
        if (r.isEmpty()) return;
        this.#cpuWrite();
        const src = sourceBitmapData.#read();
        const region = new ImageData(r.width, r.height);
        for (let y = 0; y < r.height; y++) {
            const from = ((r.y + y) * sourceBitmapData.#width + r.x) * 4;
            region.data.set(src.data.subarray(from, from + r.width * 4), y * r.width * 4);
        }
        const out = filter[FILTER_PIXELS](region);
        const d = this.#read().data;
        for (let y = 0; y < out.height; y++) {
            for (let x = 0; x < out.width; x++) {
                const dx = Math.floor(destPoint.x) + x, dy = Math.floor(destPoint.y) + y;
                if (!this.#inside(dx, dy)) continue;
                const si = (y * out.width + x) * 4, di = (dy * this.#width + dx) * 4;
                d[di] = out.data[si]; d[di + 1] = out.data[si + 1]; d[di + 2] = out.data[si + 2];
                d[di + 3] = this.#transparent ? out.data[si + 3] : 255;
            }
        }
        this.#wrote();
    }

    /**
     * Pixel-level hit test from `firstPoint` (where this bitmap sits) against a point, rectangle,
     * or another bitmap (at secondBitmapDataPoint); pixels count when their alpha reaches the threshold.
     */
    hitTest(firstPoint: Point, firstAlphaThreshold: number, secondObject: any, secondBitmapDataPoint: Point = null, secondAlphaThreshold: number = 1): boolean {
        const d = this.#read().data;
        const opaqueAt = (x: number, y: number) => this.#inside(x, y) && d[(y * this.#width + x) * 4 + 3] >= firstAlphaThreshold;
        if (secondObject instanceof Point) {
            return opaqueAt(Math.floor(secondObject.x - firstPoint.x), Math.floor(secondObject.y - firstPoint.y));
        }
        if (secondObject instanceof Rectangle) {
            const r = secondObject;
            for (let y = Math.floor(r.y); y < r.bottom; y++) for (let x = Math.floor(r.x); x < r.right; x++) {
                if (opaqueAt(x - Math.floor(firstPoint.x), y - Math.floor(firstPoint.y))) return true;
            }
            return false;
        }
        const other: BitmapData | null = secondObject instanceof BitmapData ? secondObject : secondObject?.bitmapData ?? null;
        if (!other) throw new TypeError('hitTest(): unsupported second object.');
        const p2 = secondBitmapDataPoint ?? new Point();
        const o = other.#read().data;
        const x0 = Math.max(Math.floor(firstPoint.x), Math.floor(p2.x)), y0 = Math.max(Math.floor(firstPoint.y), Math.floor(p2.y));
        const x1 = Math.min(firstPoint.x + this.#width, p2.x + other.#width), y1 = Math.min(firstPoint.y + this.#height, p2.y + other.#height);
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
            if (!opaqueAt(x - Math.floor(firstPoint.x), y - Math.floor(firstPoint.y))) continue;
            const ox = x - Math.floor(p2.x), oy = y - Math.floor(p2.y);
            if (o[(oy * other.#width + ox) * 4 + 3] >= secondAlphaThreshold) return true;
        }
        return false;
    }

    /** Encode `rect` as PNG bytes (appended to `byteArray` when given). */
    encode(rect: Rectangle, compressor: any, byteArray: ByteArray = null): ByteArray {
        const r = this.#clip(rect);
        const src = this.#read().data;
        const rgba = new Uint8ClampedArray(r.width * r.height * 4);
        for (let y = 0; y < r.height; y++) {
            const from = ((r.y + y) * this.#width + r.x) * 4;
            rgba.set(src.subarray(from, from + r.width * 4), y * r.width * 4);
        }
        if (!this.#transparent) for (let i = 3; i < rgba.length; i += 4) rgba[i] = 255;
        const png = encodePng(rgba, r.width, r.height, !!compressor?.fastCompression);
        const out = byteArray ?? new ByteArray();
        out.writeBytes(byteArrayAccess.from(png));
        return out;
    }

    /** A bitmap holding a decoded image (from an image file or an embedded asset). */
    static fromImage(image: CanvasImageSource & { width: number; height: number }, transparent: boolean = true): BitmapData {
        const b = new BitmapData(image.width, image.height, transparent, 0);
        b.#cpuWrite();
        const ctx = b.#canvasCtx();
        ctx.globalCompositeOperation = 'copy';
        ctx.drawImage(image, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        b.#drew();
        return b;
    }

    // ---------- lifecycle ----------

    clone(): BitmapData {
        this.#live();
        const b = new BitmapData(this.#width, this.#height, this.#transparent, 0);
        if (this.#fillOnly != null) {
            b.#fillOnly = this.#fillOnly;
        } else if (this.#gpuCurrent && b.#onGpu()) {
            // b is transparent black: the copy needs nothing cleared first
            if (!(this.#transparent && b.#copyQueued(this, 0, 0, this.#width, this.#height, 0, 0, false))) {
                b.copyPixels(this, this.rect, new Point(), null, null, false);
            }
        } else {
            b.#cpuWrite();
            b.#canvasCtx().globalCompositeOperation = 'copy';
            b.#canvasCtx().drawImage(this.#canvasFor(), 0, 0);
            b.#canvasCtx().globalCompositeOperation = 'source-over';
            b.#drew();
        }
        return b;
    }

    /** Free the pixels; any later use throws. The canvas goes back to the pool, for the next bitmap this size. */
    dispose(): void {
        if (this.#disposed) return;
        this.#disposed = true;
        // drawing still queued elsewhere that reads this bitmap is rendered while it is here to read
        this.#beforeWrite();
        // anything still showing this bitmap shows nothing from now on
        for (const sprite of this.#sprites) sprite.texture = Texture.EMPTY;
        this.#sprites.clear();
        this.#dropSlot();
        // the texture reads this canvas: it goes back with it, for the next bitmap this size to upload into
        if (this.#held.canvas) releaseCanvas(this.#held.canvas, this.#transparent);
        this.#gpu?.destroy();
        this.#gpu = null;
        // given back now: nothing left for the registry to
        this.#held.gpu = null;
        this.#held.canvas = null;
        if (this.#registered) reclaim.unregister(this.#held);
        this.#texture = null;
        this.#canvas = null;
        this.#ctx = null;
        this.#pixels = null;
        dirty.delete(this);
    }

    /** Hold texture updates until unlock(), so a burst of pixel changes uploads once. */
    lock(): void {
        this.#locked = true;
    }

    unlock(changeRect: Rectangle = null): void {
        void changeRect;
        this.#locked = false;
        if (this.#texture || this.#sprites.size > 0) dirty.add(this);
    }

    // ---------- for Bitmap, Graphics and the renderer ----------

    /** The PIXI texture showing this bitmap: its render texture while it is on the GPU, else its canvas's. */
    texture(): Texture {
        this.#live();
        if (this.#gpuCurrent && this.#gpu) {
            this.#gpu.flush();
            return this.#gpu.texture;
        }
        this.#ensureCpu();
        return this.#canvasTexture();
    }

    /** A Bitmap's sprite starts or stops showing this bitmap. */
    attachSprite(sprite: PixiSprite): void {
        const slot = this.#slot;
        sprite.texture = slot && slotLive(slot) ? slot.texture : this.texture();
        this.#sprites.add(sprite);
        if (this.#gpu?.pending) dirty.add(this);
        // shown from a page from the next frame on (see #syncSlot)
        slotChecks.add(this);
    }

    detachSprite(sprite: PixiSprite): void {
        this.#sprites.delete(sprite);
        // its slot is let go before the frame, unless something shows it again by then (the room hands bitmaps
        // from sprite to sprite as it sorts them)
        if (this.#sprites.size === 0 && this.#slot) slotChecks.add(this);
    }

    /** A Bitmap showing this one wants (or no longer wants) smoothing. */
    smoothingUser(delta: number): void {
        this.#smoothUsers += delta;
        const mode = this.#smoothUsers > 0 ? 'linear' : 'nearest';
        if (this.#texture) this.#texture.source.scaleMode = mode;
        if (this.#gpu) this.#gpu.texture.source.scaleMode = mode;
        // smoothed, it is shown from its own texture (a slot scaled smoothly would blend in its neighbours)
        slotChecks.add(this);
    }

    /** Before a frame: GPU drawing rendered, or the canvas uploaded; and the copy its sprites show made again. */
    syncTexture(): void {
        if (this.#disposed) return;
        if (this.#gpuCurrent && this.#gpu) {
            this.#gpu.flush();
        } else if (this.#locked) {
            return;
        } else if (this.#texture) {
            this.#ensureCpu();
            this.#flush();
            this.#texture.source.update();
        }
        this.#syncSlot();
    }

    /**
     * Its sprites shown from a slot of the display atlas while it can be (shown, small, not smoothed), the slot a copy of
     * its pixels as they are now; else from its own texture.
     */
    #syncSlot(): void {
        if (this.#disposed) return;
        let slot = this.#slot;
        if (slot && !slotLive(slot)) {
            // its page was emptied (resetAtlas)
            slot.texture.destroy(false);
            this.#slot = slot = null;
        }
        if (this.#sprites.size === 0 || this.#smoothUsers > 0 || this.#locked || !gpuAvailable()
            || this.#width > ATLAS_MAX_SIDE || this.#height > ATLAS_MAX_SIDE) {
            if (slot) {
                this.#dropSlot();
                const own = this.texture();
                for (const s of this.#sprites) s.texture = own;
            }
            return;
        }
        if (!slot) {
            slot = allocateSlot(this.#width, this.#height);
            if (!slot) return;   // no room: its own texture, as it is
            this.#slot = slot;
            this.#slotVersion = -1;
            atlased.add(this.#weak ??= new WeakRef(this));
        }
        if (this.#slotVersion !== this.#version) {
            copyToSlot(slot, this.texture());
            this.#slotVersion = this.#version;
        }
        for (const s of this.#sprites) if (s.texture !== slot.texture) s.texture = slot.texture;
    }

    /** Its slot given back (kept for the next bitmap this size). */
    #dropSlot(): void {
        const slot = this.#slot;
        if (!slot) return;
        this.#slot = null;
        if (this.#weak) atlased.delete(this.#weak);
        releaseSlot(slot);
    }

    // ---------- where the pixels are ----------

    /** Whether drawing into this bitmap runs on the GPU: it is there already, or new (nothing to upload). */
    #onGpu(): boolean {
        this.#live();
        return !this.#stayCpu && gpuAvailable() && (this.#gpuCurrent || this.#fillOnly != null);
    }

    /**
     * `sourceRect` of `source` mapped to `destPoint`, clipped to both bitmaps: [sourceX, sourceY, width, height,
     * destX, destY] in whole pixels, or null when nothing is left.
     */
    #mapRect(source: BitmapData, sourceRect: Rectangle, destPoint: Point): [number, number, number, number, number, number] | null {
        this.#live();
        source.#live();
        const sx = Math.floor(sourceRect.x), sy = Math.floor(sourceRect.y);
        let w = Math.floor(sourceRect.width), h = Math.floor(sourceRect.height);
        let dx = Math.floor(destPoint.x), dy = Math.floor(destPoint.y);
        // clip to the source, then to the destination
        let x0 = Math.max(0, sx), y0 = Math.max(0, sy);
        w -= x0 - sx; h -= y0 - sy; dx += x0 - sx; dy += y0 - sy;
        w = Math.min(w, source.#width - x0);
        h = Math.min(h, source.#height - y0);
        if (dx < 0) { x0 -= dx; w += dx; dx = 0; }
        if (dy < 0) { y0 -= dy; h += dy; dy = 0; }
        w = Math.min(w, this.#width - dx);
        h = Math.min(h, this.#height - dy);
        return w > 0 && h > 0 ? [x0, y0, w, h, dx, dy] : null;
    }

    /** This bitmap's pixels as a texture a pass into `reader` reads now: rendered, or its canvas uploaded. */
    #passSource(reader: BitmapData): Texture {
        if (this === reader) {
            this.#gpuWrite();
            this.#gpu!.flush();
            return this.#gpu!.texture;
        }
        return this.#gpuSource(reader);
    }

    /**
     * A BitmapPass over the destination rectangle (dx, dy, w, h), reading the source rectangle (x0, y0) at the same
     * positions: copyChannel, paletteMap, copyPixels through an alpha bitmap.
     */
    #pass(source: BitmapData, x0: number, y0: number, w: number, h: number, dx: number, dy: number,
        configure: (pass: BitmapPass, source: TextureSource) => BitmapPass): void {
        this.#gpuWrite();
        const read = snapshot(source.#passSource(this), x0, y0, w, h);
        passFilter ??= new BitmapPass();
        this.#gpu!.applyPass(dx, dy, w, h, configure(passFilter, read.source));
        releaseRenderTexture(read);
    }

    /**
     * Whether drawing `source` into this bitmap runs on the GPU: as #onGpu, or this bitmap on the CPU while the source
     * is only on the GPU (uploading this one costs less than reading the source back, and keeps it there after).
     */
    #onGpuFor(source: BitmapData): boolean {
        if (this.#onGpu()) return true;
        return !this.#stayCpu && gpuAvailable() && source.#gpuCurrent && !source.#cpuCurrent;
    }

    /**
     * Copies a rectangle of `source` (to dx, dy; replacing what is there, or composited over it) without rendering
     * the source, when it is only queued drawing: a fill colour, or draws over a transparent clear (see
     * GpuSurface.inlineable), which are queued here instead. The avatar renderer builds an image out of its parts,
     * then crops and clones it, every frame; this way only the image shown renders. False when it cannot.
     */
    #copyQueued(source: BitmapData, sx: number, sy: number, w: number, h: number, dx: number, dy: number, replace: boolean): boolean {
        const white = Texture.WHITE;
        const fillRect = (argb: number, blend: 'normal' | 'none') => this.#gpu!.enqueue({
            texture: white, matrix: [w / white.frame.width, 0, 0, h / white.frame.height, dx, dy], blend,
            tint: argb & 0xffffff, alpha: this.#transparent ? (argb >>> 24) / 255 : 1,
        });
        if (source.#fillOnly != null) {
            const fill = source.#transparent ? source.#fillOnly : (source.#fillOnly | 0xff000000) >>> 0;
            if (!replace && fill >>> 24 === 0) return true;   // nothing composited over
            this.#gpuWrite();
            fillRect(fill, replace ? 'none' : 'normal');
            return true;
        }
        const queued = source.#gpu;
        if (!source.#gpuCurrent || !queued?.inlineable) return false;
        // what was there goes, where a replacing copy lands (unless it is all transparent already)
        const clearFirst = replace && !(this.#fillOnly === 0 || (this.#fillOnly != null && this.#fillOnly >>> 24 === 0 && this.#transparent));
        this.#gpuWrite();
        if (clearFirst) fillRect(0, 'none');
        for (const d of queued.draws) {
            const cropped = cropDraw(d, sx, sy, w, h);
            if (!cropped) continue;
            cropped.matrix[4] += dx - sx;
            cropped.matrix[5] += dy - sy;
            this.#gpu!.enqueue(cropped);
            // this bitmap now reads what the source read
            if (d.source instanceof BitmapData) d.source.#addReader(this);
        }
        return true;
    }

    /** Before any change: drawing queued in other bitmaps that reads this one is rendered first. */
    #beforeWrite(): void {
        this.#version++;
        if (this.#readers.size === 0) return;
        for (const ref of this.#readers) {
            const reader = ref.deref();
            if (reader) reader.#gpu?.flush();
        }
        this.#readers.clear();
    }

    /** `reader` queues drawing that reads this bitmap (see #readers). */
    #addReader(reader: BitmapData): void {
        if (this.#readers.size >= this.#readersLimit) {
            // those collected, or done reading (their queue rendered), are let go; the limit grows with those left
            for (const r of this.#readers) {
                const b = r.deref();
                if (!b || !b.#gpu?.pending) this.#readers.delete(r);
            }
            this.#readersLimit = Math.max(32, this.#readers.size * 2);
        }
        this.#readers.add(reader.#weak ??= new WeakRef(reader));
    }

    /** It holds something outside the heap now: given back to the pools if it is collected undisposed. */
    #hold(): void {
        if (this.#registered) return;
        this.#registered = true;
        reclaim.register(this, this.#held, this.#held);
    }

    /** About to draw on the GPU: the render texture holds the current pixels, and the canvas will not. */
    #gpuWrite(): void {
        this.#beforeWrite();
        const wasShowingCanvas = !this.#gpuCurrent;
        if (!this.#gpu) {
            this.#gpu = this.#held.gpu = new GpuSurface(this.#width, this.#height);
            this.#hold();
        }
        if (!this.#gpuCurrent) {
            if (this.#fillOnly != null) {
                this.#gpu.clear(this.#fillOnly, !this.#transparent);
            } else {
                // what the canvas has goes up first (a bitmap that was on the CPU, now drawn into on the GPU)
                this.#ensureCpu();
                this.#flush();
                const tex = this.#canvasTexture();
                tex.source.update();
                this.#gpu.clear(0, false);
                this.#gpu.enqueue({ texture: tex, matrix: [1, 0, 0, 1, 0, 0], blend: 'none', tint: 0xffffff, alpha: 1 });
            }
        }
        this.#fillOnly = null;
        this.#gpuCurrent = true;
        this.#cpuCurrent = false;
        this.#pixels = null;
        this.#pixelsAhead = false;
        if (wasShowingCanvas && !this.#slot) for (const s of this.#sprites) s.texture = this.#gpu.texture;
        // rendered before the frame only while shown; otherwise when something reads it
        if (this.#sprites.size > 0) dirty.add(this);
    }

    /**
     * Whether #replayOnCanvas can make the canvas: nothing rendered yet, and only whole-pixel, untinted copies and
     * fills queued. `withoutReadBack`: and every copy is from a bitmap on the canvas already (a replay draws from
     * canvases, so a source only on the GPU would be read back for it).
     */
    #replayable(withoutReadBack: boolean = false): boolean {
        const surface = this.#gpu;
        if (!surface || !surface.clearColor) return false;
        const white = Texture.WHITE;
        for (const d of surface.draws) {
            const [a, b, c, dd] = d.matrix;
            if (b !== 0 || c !== 0) return false;
            if (d.texture === white) continue;   // a fill
            if (!(d.source instanceof BitmapData) || d.source === this) return false;
            // tinted only alone (GpuSurface.tintQueued): the replay tints what it drew, which is all there is
            if ((d.tint !== 0xffffff || d.alpha !== 1) && surface.draws.length !== 1) return false;
            if (Math.abs(a) !== 1 || Math.abs(dd) !== 1) return false;
            if (withoutReadBack && !d.source.#cpuCurrent && d.source.#fillOnly == null) return false;
        }
        return true;
    }

    /** About to change the pixels on the CPU: the canvas holds them, and the render texture no longer will. */
    #cpuWrite(): void {
        this.#beforeWrite();
        this.#ensureCpu();
        if (this.#gpu) {
            // written on the CPU after the GPU: it stays on the CPU, and shows its canvas
            this.#stayCpu = true;
            this.#gpu.destroy();
            this.#gpu = this.#held.gpu = null;
            if (this.#gpuCurrent) {
                this.#gpuCurrent = false;
                // (made now either way: the write that follows marks it for upload, and a slot copies from it)
                const tex = this.#canvasTexture();
                if (!this.#slot) for (const s of this.#sprites) s.texture = tex;
            }
        }
        this.#gpuCurrent = false;
    }

    /** The canvas holds the current pixels: filled, or read back from the GPU. */
    #ensureCpu(): void {
        if (this.#cpuCurrent) return;
        if (!this.#ctx) {
            // a canvas this size from the pool (a disposed bitmap's), or a new one
            const pooled = acquireCanvas(this.#width, this.#height, this.#transparent);
            const { canvas, ctx, texture } = pooled;
            this.#canvas = canvas;
            this.#ctx = ctx;
            this.#held.canvas = pooled;
            this.#hold();
            if (texture) {
                // the previous bitmap's texture, still made for this canvas: uploaded once the canvas has this one's pixels
                texture.source.scaleMode = this.#smoothUsers > 0 ? 'linear' : 'nearest';
                this.#texture = texture;
            }
        }
        if (this.#fillOnly != null) {
            this.#cpuCurrent = true;
            this.#fill(0, 0, this.#width, this.#height, this.#fillOnly);
        } else if (this.#gpuCurrent && this.#gpu) {
            if (!this.#replayOnCanvas()) this.#ctx.putImageData(this.#gpu.readPixels(), 0, 0);
            this.#cpuCurrent = true;
            this.#pixels = null;
            this.#pixelsAhead = false;
            if (this.#texture) dirty.add(this);
            return;
        }
        this.#cpuCurrent = true;
    }

    /**
     * The canvas made from the GPU side without the GPU, when nothing has been rendered there yet: the clear colour
     * and the queued drawing are done on the canvas instead (copies from other bitmaps, untinted, by whole pixels;
     * fills; each composited or replacing what is there). A read-back would render them and stall until the GPU is
     * done; windows built from skin pieces (cut into new bitmaps, so on the GPU) and drawn on the CPU read every
     * piece back. False when it cannot (tinted copies, a colour transform's pass, something already rendered): the
     * caller reads back.
     */
    #replayOnCanvas(): boolean {
        if (!this.#replayable()) return false;
        const surface = this.#gpu!;
        const clear = surface.clearColor!;
        const white = Texture.WHITE;
        const draws = surface.draws;
        const ctx = this.#ctx!;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.globalCompositeOperation = 'copy';
        // the clear colour is kept premultiplied
        const [r, g, bl, alpha] = clear;
        const straight = (v: number) => (alpha > 0 ? Math.round((v / alpha) * 255) : 0);
        ctx.fillStyle = `rgba(${straight(r)},${straight(g)},${straight(bl)},${alpha})`;
        ctx.fillRect(0, 0, this.#width, this.#height);
        for (const d of draws) {
            const [a, , , dd, tx, ty] = d.matrix;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            if (d.texture === white) {
                const w = a * white.frame.width, h = dd * white.frame.height;
                const left = Math.min(tx, tx + w), top = Math.min(ty, ty + h);
                if (d.blend === 'none') ctx.clearRect(left, top, Math.abs(w), Math.abs(h));
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = `rgba(${(d.tint >> 16) & 255},${(d.tint >> 8) & 255},${d.tint & 255},${d.alpha})`;
                ctx.fillRect(left, top, Math.abs(w), Math.abs(h));
                continue;
            }
            const source = d.source as BitmapData;
            const f = d.frame ?? { x: 0, y: 0, width: source.#width, height: source.#height };
            if (d.blend === 'none') ctx.clearRect(a > 0 ? tx : tx - f.width, dd > 0 ? ty : ty - f.height, f.width, f.height);
            ctx.globalCompositeOperation = 'source-over';
            ctx.setTransform(a, 0, 0, dd, tx, ty);
            ctx.drawImage(source.#canvasFor(), f.x, f.y, f.width, f.height, 0, 0, f.width, f.height);
            if (d.tint !== 0xffffff || d.alpha !== 1) {
                // a tinted copy, alone over transparent (see #replayable): tinted as the CPU's colorTransform does
                const x = a > 0 ? tx : tx - f.width, y = dd > 0 ? ty : ty - f.height;
                const img = ctx.getImageData(x, y, f.width, f.height);
                applyColorTransform(img.data, new ColorTransform(((d.tint >> 16) & 255) / 255, ((d.tint >> 8) & 255) / 255, (d.tint & 255) / 255, d.alpha));
                ctx.putImageData(img, x, y);
            }
        }
        ctx.restore();
        gpuBitmapStats.replays++;
        return true;
    }

    /** This bitmap read by a GPU drawing into `reader`: its texture, current; and `reader` noted as reading it. */
    #gpuSource(reader: BitmapData): Texture {
        this.#live();
        this.#addReader(reader);
        if (this.#gpuCurrent && this.#gpu) {
            this.#gpu.flush();
            return this.#gpu.texture;
        }
        this.#ensureCpu();
        this.#flush();
        const tex = this.#canvasTexture();
        if (dirty.has(this) && !this.#locked) tex.source.update();
        return tex;
    }

    /** The texture the canvas uploads into (made on first use). */
    #canvasTexture(): Texture {
        this.#ensureCpu();
        if (!this.#texture) {
            this.#flush();
            // this bitmap's own texture, kept out of PIXI's global cache (which held on to every bitmap's canvas and
            // texture until disposed, so a bitmap simply dropped never went)
            this.#texture = this.#held.canvas!.texture = Texture.from(this.#canvas!, true);
            this.#texture.source.scaleMode = this.#smoothUsers > 0 ? 'linear' : 'nearest';
        }
        return this.#texture;
    }

    /**
     * draw() of a bitmap on the GPU, when the GPU can draw it exactly: through a translation or a horizontal or
     * vertical flip (by whole pixels), a colour transform that only multiplies (by at most 1), the normal blend, and
     * a clip that is a rectangle. False otherwise (the CPU draws it).
     */
    #gpuDraw(source: BitmapData, m: Matrix, ct: ColorTransform | null, blendMode: string | null, clipRect: Rectangle | null): boolean {
        if (blendMode != null && blendMode !== 'normal') return false;
        if (m.b !== 0 || m.c !== 0 || Math.abs(m.a) !== 1 || Math.abs(m.d) !== 1 || !Number.isInteger(m.tx) || !Number.isInteger(m.ty)) return false;
        let tint = 0xffffff, alpha = 1;
        if (ct) {
            const t = tintOf(ct);
            if (!t) return false;
            [tint, alpha] = t;
        }
        // where the source lands, clipped to the clip rectangle and the bitmap
        const sw = source.#width, sh = source.#height;
        const x0 = m.a > 0 ? m.tx : m.tx - sw, y0 = m.d > 0 ? m.ty : m.ty - sh;
        let left = Math.max(0, x0), top = Math.max(0, y0);
        let right = Math.min(this.#width, x0 + sw), bottom = Math.min(this.#height, y0 + sh);
        if (clipRect) {
            if (!Number.isInteger(clipRect.x) || !Number.isInteger(clipRect.y) || !Number.isInteger(clipRect.width) || !Number.isInteger(clipRect.height)) return false;
            left = Math.max(left, clipRect.x); top = Math.max(top, clipRect.y);
            right = Math.min(right, clipRect.x + clipRect.width); bottom = Math.min(bottom, clipRect.y + clipRect.height);
        }
        if (right <= left || bottom <= top) return true;   // nothing lands: done
        // the source pixels that land there
        const fx = m.a > 0 ? left - m.tx : m.tx - right, fy = m.d > 0 ? top - m.ty : m.ty - bottom;
        const fw = right - left, fh = bottom - top;
        if (m.a === 1 && m.d === 1 && tint === 0xffffff && alpha === 1 && this.#copyQueued(source, fx, fy, fw, fh, left, top, false)) return true;
        const texture = source.#gpuSource(this);
        this.#gpuWrite();
        this.#gpu!.enqueue({
            texture, frame: { x: fx, y: fy, width: fw, height: fh },
            matrix: [m.a, 0, 0, m.d, m.a > 0 ? left : right, m.d > 0 ? top : bottom],
            blend: 'normal', tint, alpha, source,
        });
        return true;
    }

    /**
     * draw() of a display object on the GPU: the display list renders straight into this bitmap's texture, where
     * drawing it on the canvas read every GPU bitmap in it back, each read waiting for the GPU (a modal dialog's
     * backdrop, the whole screen with a busy room in it, stalled the client for most of a second). Its own transform,
     * alpha, blend mode and visibility are not applied, as draw() leaves them.
     */
    #gpuDrawDisplay(source: DisplayObject, m: Matrix): void {
        // what changed since the last frame (text, vector drawing, bitmaps) is brought up to date first
        runBeforeRender(GpuSurface.resolution);
        this.#gpuWrite();
        const node = source.node;
        const { visible, alpha, blendMode } = node;
        node.visible = true;
        node.alpha = 1;
        node.blendMode = 'normal';
        try {
            this.#gpu!.renderContainer(node, new PixiMatrix(m.a, m.b, m.c, m.d, m.tx, m.ty));
        } finally {
            node.visible = visible;
            node.alpha = alpha;
            node.blendMode = blendMode;
        }
    }

    // ---------- internals ----------

    #live(): void {
        if (this.#disposed) throw new ArgumentError('Invalid BitmapData.');
    }

    #inside(x: number, y: number): boolean {
        this.#live();
        return x >= 0 && y >= 0 && x < this.#width && y < this.#height;
    }

    /** `rect` rounded to whole pixels and clipped to the bitmap. */
    #clip(rect: Rectangle): Rectangle {
        this.#live();
        const x = Math.max(0, Math.floor(rect.x)), y = Math.max(0, Math.floor(rect.y));
        const r = Math.min(this.#width, Math.floor(rect.x + rect.width)), b = Math.min(this.#height, Math.floor(rect.y + rect.height));
        return new Rectangle(x, y, Math.max(0, r - x), Math.max(0, b - y));
    }

    /** The cached straight pixels, reading them from the canvas if needed. */
    #read(): ImageData {
        this.#live();
        this.#ensureCpu();
        if (!this.#pixels) this.#pixels = this.#ctx!.getImageData(0, 0, this.#width, this.#height);
        return this.#pixels;
    }

    #put(d: Uint8ClampedArray, x: number, y: number, argb: number): void {
        const i = (y * this.#width + x) * 4;
        d[i] = (argb >> 16) & 255;
        d[i + 1] = (argb >> 8) & 255;
        d[i + 2] = argb & 255;
        d[i + 3] = this.#transparent ? (argb >>> 24) & 255 : 255;
    }

    /** The pixel cache changed. */
    #wrote(): void {
        this.#pixelsAhead = true;
        this.#fillOnly = null;
        if (this.#texture) dirty.add(this);
    }

    /** Write pending pixel changes back to the canvas. */
    #flush(): void {
        if (this.#pixelsAhead && this.#pixels) {
            this.#ctx!.putImageData(this.#pixels, 0, 0);
            this.#pixelsAhead = false;
        }
    }

    /** The canvas context, up to date, for a canvas operation. */
    #canvasCtx(): CanvasRenderingContext2D {
        this.#live();
        this.#ensureCpu();
        this.#flush();
        return this.#ctx!;
    }

    /** The canvas, up to date, as a drawing source. */
    #canvasFor(): HTMLCanvasElement {
        this.#live();
        this.#ensureCpu();
        this.#flush();
        return this.#canvas!;
    }

    /** The canvas changed: the pixel cache is stale. */
    #drew(): void {
        this.#pixels = null;
        this.#pixelsAhead = false;
        this.#fillOnly = null;
        if (this.#texture) dirty.add(this);
    }

    /** Shown sprites see a change that leaves neither side current (a whole-bitmap fill): canvas or GPU, refilled. */
    #changed(): void {
        if (this.#gpu && this.#onGpu()) {
            this.#gpuCurrent = true;   // the surface was cleared to the fill
            this.#fillOnly = null;
            dirty.add(this);
            return;
        }
        if (this.#sprites.size > 0 || this.#texture) {
            this.#ensureCpu();
            const tex = this.#canvasTexture();
            if (!this.#slot) for (const s of this.#sprites) s.texture = tex;
            dirty.add(this);
        }
    }

    #fill(x: number, y: number, w: number, h: number, color: number): void {
        if (w <= 0 || h <= 0) return;
        const ctx = this.#canvasCtx();
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        const a = this.#transparent ? ((color >>> 24) & 255) / 255 : 1;
        ctx.fillStyle = `rgba(${(color >> 16) & 255},${(color >> 8) & 255},${color & 255},${a})`;
        ctx.fillRect(x, y, w, h);
        ctx.restore();
        this.#drew();
    }

    /** Visit (sourceIndex, destIndex) byte offsets for sourceRect mapped to destPoint, clipped to both. */
    #eachMapped(source: BitmapData, sourceRect: Rectangle, destPoint: Point, fn: (si: number, di: number) => void): void {
        const sx = Math.floor(sourceRect.x), sy = Math.floor(sourceRect.y);
        const dx = Math.floor(destPoint.x), dy = Math.floor(destPoint.y);
        for (let y = 0; y < Math.floor(sourceRect.height); y++) {
            for (let x = 0; x < Math.floor(sourceRect.width); x++) {
                if (!source.#inside(sx + x, sy + y) || !this.#inside(dx + x, dy + y)) continue;
                fn(((sy + y) * source.#width + sx + x) * 4, ((dy + y) * this.#width + dx + x) * 4);
            }
        }
    }

    #copyWithAlphaBitmap(source: BitmapData, sx: number, sy: number, w: number, h: number, dx: number, dy: number,
        alpha: BitmapData, alphaPoint: Point, mergeAlpha: boolean): void {
        const s = source.#read().data, a = alpha.#read().data, d = this.#read().data;
        const ax0 = Math.floor(alphaPoint.x), ay0 = Math.floor(alphaPoint.y);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const si = ((sy + y) * source.#width + sx + x) * 4, di = ((dy + y) * this.#width + dx + x) * 4;
                const ax = ax0 + x, ay = ay0 + y;
                const am = alpha.#inside(ax, ay) ? a[(ay * alpha.#width + ax) * 4 + 3] / 255 : 0;
                const sa = (s[si + 3] / 255) * am;
                if (mergeAlpha || !this.#transparent) {
                    const da = d[di + 3] / 255;
                    const oa = sa + da * (1 - sa);
                    for (let c = 0; c < 3; c++) d[di + c] = oa > 0 ? (s[si + c] * sa + d[di + c] * da * (1 - sa)) / oa : 0;
                    d[di + 3] = this.#transparent ? oa * 255 : 255;
                } else {
                    d[di] = s[si]; d[di + 1] = s[si + 1]; d[di + 2] = s[si + 2]; d[di + 3] = sa * 255;
                }
            }
        }
        this.#wrote();
    }

    static {
        setBitmapCanvasAccessor(b => b.#canvasFor());
        syncSlotOf = b => b.#syncSlot();
        setAtlasResetHandler(() => {
            // every slot is gone: the bitmaps shown from them take new ones before the frame
            for (const ref of atlased) {
                const b = ref.deref();
                if (b) slotChecks.add(b);
            }
            atlased.clear();
        });
    }
}

addBeforeRender(flushBitmapTextures);

/**
 * A colour transform as a GPU tint and alpha, when it only multiplies, by at most 1, with colour multipliers a tint
 * says exactly (it has 256 steps; the client's are colour / 255); null otherwise (the CPU applies it).
 */
function tintOf(ct: ColorTransform): [number, number] | null {
    if (ct.redOffset !== 0 || ct.greenOffset !== 0 || ct.blueOffset !== 0 || ct.alphaOffset !== 0) return null;
    const mults = [ct.redMultiplier, ct.greenMultiplier, ct.blueMultiplier, ct.alphaMultiplier];
    if (mults.some(v => !(v >= 0 && v <= 1))) return null;
    const channel = (v: number) => Math.round(v * 255);
    if (mults.slice(0, 3).some(v => Math.abs(channel(v) / 255 - v) > 1e-6)) return null;
    return [(channel(ct.redMultiplier) << 16) | (channel(ct.greenMultiplier) << 8) | channel(ct.blueMultiplier), ct.alphaMultiplier];
}

/** A step coprime with n, so stepping visits every index once per n steps. */
function coprimeStep(n: number): number {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    let step = Math.floor(n * 0.618) | 1;
    while (gcd(step, n) !== 1) step++;
    return step;
}
