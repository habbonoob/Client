// Canvases kept for reuse. Making a canvas and its 2D context is the costliest part of a small bitmap: the client makes
// and disposes them by the thousand (an avatar's every frame is a new BitmapData), and in a room of 150 avatars on a
// slow machine creating them took a quarter of the frame. A disposed bitmap's canvas, and a draw()'s scratch layer, go
// back here and are handed out again, emptied, to the next one the same size.

import type { Texture } from 'pixi.js';

/**
 * A canvas and its context, as handed out, and the PIXI texture showing it when a bitmap had made one: kept with the
 * canvas, the next bitmap uploads its pixels into the same GPU texture instead of having a new one made.
 */
export interface PooledCanvas {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    texture?: Texture | null;
}

/** Kept per size, at most. */
const MAX_PER_SIZE = 48;
/** Kept in all, at most (in pixels: 4 bytes each, so about 64 MB). */
const MAX_PIXELS = 16_000_000;

const pools = new Map<string, PooledCanvas[]>();
let pooledPixels = 0;

const keyOf = (w: number, h: number, alpha: boolean) => `${w}x${h}${alpha ? '' : 'o'}`;

/**
 * A canvas of this size, its context set up as a fresh one is (identity transform, full alpha, source-over) and empty.
 * `alpha` false is an opaque canvas (a non-transparent bitmap's), which the browser can draw faster.
 */
export function acquireCanvas(w: number, h: number, alpha: boolean = true): PooledCanvas {
    const pool = pools.get(keyOf(w, h, alpha));
    const reused = pool?.pop();
    if (reused) {
        pooledPixels -= w * h;
        return reused;
    }
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    // willReadFrequently: bitmaps read their pixels back often (getPixel, hit tests), which a GPU-backed canvas makes slow
    return { canvas, ctx: canvas.getContext('2d', { willReadFrequently: true, alpha })! };
}

/** Gives a canvas back: emptied and reset now, so whoever gets it next starts clean. Kept only while the pool has room. */
export function releaseCanvas(pooled: PooledCanvas, alpha: boolean = true): void {
    const { canvas, ctx } = pooled;
    const w = canvas.width, h = canvas.height;
    const key = keyOf(w, h, alpha);
    const pool = pools.get(key) ?? [];
    if (pooledPixels + w * h > MAX_PIXELS || pool.length >= MAX_PER_SIZE) {
        pooled.texture?.destroy(true);   // not kept: its GPU texture goes with it
        return;
    }

    if (typeof ctx.reset === 'function') {
        ctx.reset();   // the state stack, the transform, the clip and the pixels, all at once
    } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, w, h);
    }
    pool.push(pooled);
    pools.set(key, pool);
    pooledPixels += w * h;
}
