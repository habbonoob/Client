import { Sprite as PixiSprite, Texture } from 'pixi.js';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { displayState, type DisplayObject } from './DisplayObject';
import type { Graphics, Warp } from './Graphics';
import { addBeforeRender } from './renderHooks';

const views = new Set<WeakRef<VectorView>>();
const MAX_SIZE = 8192;

/** Before each render: bring every on-stage vector drawing up to date with its content and scale. */
export function updateVectorViews(resolution: number): void {
    for (const ref of views) {
        const v = ref.deref();
        if (!v) { views.delete(ref); continue; }
        v.update(resolution);
    }
}

/**
 * Shows a Graphics drawing through PIXI. The drawing is rasterised with Canvas2D at its current
 * on-screen scale (so it stays sharp when scaled) and re-rasterised when it changes or the scale
 * does. With a 9-slice grid on the owner, geometry is warped so the regions outside the grid centre
 * keep their size, and the sprite cancels the owner's own scale.
 */
export class VectorView {
    readonly sprite = new PixiSprite(Texture.EMPTY);
    readonly #graphics: Graphics;
    readonly #owner: DisplayObject;
    #canvas: HTMLCanvasElement | null = null;
    #texture: Texture | null = null;
    #dirty = true;
    #key = '';

    constructor(graphics: Graphics, owner: DisplayObject) {
        this.#graphics = graphics;
        this.#owner = owner;
        views.add(new WeakRef(this));
    }

    markDirty(): void {
        this.#dirty = true;
    }

    update(resolution: number): void {
        const owner = this.#owner;
        // a mask clips whether or not it is visible or on the stage itself, so its drawing is
        // needed either way (unrasterised, PIXI masks with an empty texture and hides everything)
        const isMask = displayState.isMaskOf(owner);
        if (!isMask && (!owner.stage || !owner.visible)) return;
        const wt = owner.node.worldTransform;
        const worldScale = Math.max(Math.hypot(wt.a, wt.b), Math.hypot(wt.c, wt.d)) || 1;
        const grid = displayState.scale9Grid(owner);
        const osx = grid ? Math.abs(owner.scaleX) || 1 : 1;
        const osy = grid ? Math.abs(owner.scaleY) || 1 : 1;
        // pixels per drawn unit: with 9-slice, drawn units already include the owner's scale
        const scale = Math.round(worldScale / Math.max(osx, osy) * resolution * 100) / 100 || 1;
        const key = `${scale}|${grid ? `${grid.x},${grid.y},${grid.width},${grid.height},${osx},${osy}` : ''}`;
        if (!this.#dirty && key === this.#key) return;
        this.#dirty = false;
        this.#key = key;
        const warp = grid ? nineSlice(this.#graphics.bounds(false), grid, osx, osy) : null;
        const b = this.#graphics.bounds(true, warp);
        if (b.isEmpty()) {
            this.sprite.visible = false;
            return;
        }
        this.sprite.visible = true;
        const w = Math.min(MAX_SIZE, Math.ceil(b.width * scale) + 2);
        const h = Math.min(MAX_SIZE, Math.ceil(b.height * scale) + 2);
        if (!this.#canvas || this.#canvas.width !== w || this.#canvas.height !== h) {
            this.#texture?.destroy(false);
            this.#canvas = document.createElement('canvas');
            this.#canvas.width = w;
            this.#canvas.height = h;
            this.#texture = Texture.from(this.#canvas);
            this.#texture.source.scaleMode = 'linear';
            this.sprite.texture = this.#texture;
        }
        const ctx = this.#canvas.getContext('2d')!;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.setTransform(scale, 0, 0, scale, 1 - b.x * scale, 1 - b.y * scale);
        this.#graphics.render(ctx, scale, warp);
        this.#texture!.source.update();
        this.sprite.position.set((b.x - 1 / scale) / osx, (b.y - 1 / scale) / osy);
        this.sprite.scale.set(1 / (scale * osx), 1 / (scale * osy));
    }
}

/**
 * The 9-slice mapping for fill bounds `b`, grid `g` and owner scale (sx, sy): content left of /
 * above the grid keeps its size, content right of / below it keeps its size and moves with the
 * scaled edge, and the centre stretches over what remains. Results are in owner-scaled units.
 */
function nineSlice(b: Rectangle, g: Rectangle, sx: number, sy: number): Warp {
    const axis = (min: number, max: number, g0: number, g1: number, s: number) => {
        const lo = Math.max(0, g0 - min), hi = Math.max(0, max - g1);
        const inner = Math.max(0, g1 - g0);
        const stretch = inner > 0 ? Math.max(0, (max - min) * s - lo - hi) / inner : 0;
        const start = min * s;
        return {
            map: (v: number) => (v <= g0 ? start + (v - min) : v >= g1 ? start + (max - min) * s - (max - v) : start + lo + (v - g0) * stretch),
            // region affine: scale and offset of the region containing v
            region: (v: number): [number, number] => (v <= g0 ? [1, start - min] : v >= g1 ? [1, start + (max - min) * s - max] : [stretch, start + lo - g0 * stretch]),
        };
    };
    const ax = axis(b.left, b.right, g.left, g.right, sx);
    const ay = axis(b.top, b.bottom, g.top, g.bottom, sy);
    return {
        point: (x, y) => [ax.map(x), ay.map(y)],
        affineAt: (x, y) => {
            const [kx, ox] = ax.region(x);
            const [ky, oy] = ay.region(y);
            return new Matrix(kx, 0, 0, ky, ox, oy);
        },
    };
}

/**
 * Draw `owner`'s graphics into a canvas whose transform is the owner's full transform (as
 * BitmapData.draw renders it): with a 9-slice grid the owner's scale is cancelled and the geometry
 * warped instead, as on screen, so the regions outside the grid centre keep their size.
 */
export function renderGraphics(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, graphics: Graphics, owner: DisplayObject): void {
    const grid = displayState.scale9Grid(owner);
    if (!grid) {
        graphics.render(ctx);
        return;
    }
    const sx = Math.abs(owner.scaleX) || 1, sy = Math.abs(owner.scaleY) || 1;
    ctx.save();
    ctx.scale(1 / sx, 1 / sy);
    graphics.render(ctx, 1, nineSlice(graphics.bounds(false), grid, sx, sy));
    ctx.restore();
}

addBeforeRender(updateVectorViews);

/** A 1×1 canvas for point-in-path tests. */
export const hitContext = (() => {
    let ctx: CanvasRenderingContext2D | null = null;
    return (): CanvasRenderingContext2D => (ctx ??= document.createElement('canvas').getContext('2d')!);
})();
