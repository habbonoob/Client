// Renders a display object tree into a Canvas2D context, for BitmapData.draw(). The drawn object's
// own transform, colour transform and alpha are not used (the caller supplies them); its
// descendants' transforms, colour transforms, alpha, visibility, blend modes, masks and filters are.

import { acquireCanvas, releaseCanvas } from './canvasPool';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { DisplayObject } from './DisplayObject';
import { displayState } from './DisplayObject';
import { DisplayObjectContainer } from './DisplayObjectContainer';

export type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/** Canvas composite operations for blend modes Canvas2D can do directly. */
export const COMPOSITE: Record<string, GlobalCompositeOperation> = {
    normal: 'source-over', layer: 'source-over', add: 'lighter', multiply: 'multiply', screen: 'screen',
    lighten: 'lighten', darken: 'darken', difference: 'difference', overlay: 'overlay', hardlight: 'hard-light',
    erase: 'destination-out', alpha: 'destination-in',
};

/** Blend modes with no Canvas2D equivalent, done per pixel. */
export const PIXEL_BLENDS = new Set(['subtract', 'invert']);

export function isIdentityColor(ct: ColorTransform | null): boolean {
    return !ct || (ct.redMultiplier === 1 && ct.greenMultiplier === 1 && ct.blueMultiplier === 1 && ct.alphaMultiplier === 1
        && ct.redOffset === 0 && ct.greenOffset === 0 && ct.blueOffset === 0 && ct.alphaOffset === 0);
}

/** Apply a colour transform to straight RGBA pixels, clamping each channel to 0-255. */
export function applyColorTransform(px: Uint8ClampedArray, ct: ColorTransform): void {
    for (let i = 0; i < px.length; i += 4) {
        px[i] = px[i] * ct.redMultiplier + ct.redOffset;
        px[i + 1] = px[i + 1] * ct.greenMultiplier + ct.greenOffset;
        px[i + 2] = px[i + 2] * ct.blueMultiplier + ct.blueOffset;
        px[i + 3] = px[i + 3] * ct.alphaMultiplier + ct.alphaOffset;
    }
}

/** Composite `layer` (same size as the target) onto the target with a pixel-level blend mode. */
export function blendPixels(target: Ctx, layer: Ctx, mode: string): void {
    const w = target.canvas.width, h = target.canvas.height;
    const dst = target.getImageData(0, 0, w, h), src = layer.getImageData(0, 0, w, h);
    const d = dst.data, s = src.data;
    for (let i = 0; i < d.length; i += 4) {
        const a = s[i + 3] / 255;
        if (a === 0) continue;
        for (let c = 0; c < 3; c++) {
            const blended = mode === 'subtract' ? Math.max(0, d[i + c] - s[i + c]) : 255 - d[i + c];
            d[i + c] = d[i + c] + (blended - d[i + c]) * a;
        }
    }
    target.putImageData(dst, 0, 0);
}

/** A transparent scratch canvas the size of the target, empty; give it back with releaseLayer once composited. */
export function newLayer(w: number, h: number): Ctx {
    return acquireCanvas(Math.max(1, w), Math.max(1, h)).ctx;
}

/** A scratch layer from newLayer is no longer needed: it goes back to the pool. */
export function releaseLayer(layer: Ctx): void {
    releaseCanvas({ canvas: layer.canvas as HTMLCanvasElement, ctx: layer as CanvasRenderingContext2D });
}

/**
 * Draw `obj` (as the root of a draw() call) into `ctx` with `matrix` and colour transform `ct`.
 * `smoothing` applies to bitmaps.
 */
export function renderTree(ctx: Ctx, obj: DisplayObject, matrix: Matrix, ct: ColorTransform | null, blendMode: string | null, smoothing: boolean): void {
    renderNode(ctx, obj, matrix, ct ?? new ColorTransform(), blendMode ?? 'normal', smoothing, true);
}

function renderNode(ctx: Ctx, obj: DisplayObject, matrix: Matrix, parentCt: ColorTransform, blendMode: string, smoothing: boolean, root: boolean): void {
    if (!root && !obj.visible) return;
    let m = matrix, ct = parentCt, blend = blendMode;
    if (!root) {
        m = obj.transformMatrix();
        m.concat(matrix);
        ct = obj.transformColor();
        const combined = new ColorTransform(parentCt.redMultiplier, parentCt.greenMultiplier, parentCt.blueMultiplier, parentCt.alphaMultiplier,
            parentCt.redOffset, parentCt.greenOffset, parentCt.blueOffset, parentCt.alphaOffset);
        combined.concat(ct);
        ct = combined;
        if (obj.blendMode !== 'normal') blend = obj.blendMode;
    }
    const filters = root ? [] : obj.filters;
    const mask = root ? null : obj.mask;
    const simple = filters.length === 0 && !mask && !PIXEL_BLENDS.has(blend) && isAlphaOnly(ct);
    if (simple) {
        ctx.save();
        ctx.globalAlpha *= Math.max(0, Math.min(1, ct.alphaMultiplier));
        ctx.globalCompositeOperation = COMPOSITE[blend] ?? 'source-over';
        ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
        ctx.imageSmoothingEnabled = smoothing;
        displayState.renderContent(obj, ctx);
        ctx.restore();
        drawChildren(ctx, obj, m, alphaOnly(ct), smoothing);
        return;
    }
    // everything else goes through a layer the size of the target
    const w = ctx.canvas.width, h = ctx.canvas.height;
    const layer = newLayer(w, h);
    layer.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    layer.imageSmoothingEnabled = smoothing;
    displayState.renderContent(obj, layer);
    layer.setTransform(1, 0, 0, 1, 0, 0);
    drawChildren(layer, obj, m, new ColorTransform(), smoothing);
    if (!isIdentityColor(ct)) {
        const img = layer.getImageData(0, 0, w, h);
        applyColorTransform(img.data, ct);
        layer.putImageData(img, 0, 0);
    }
    for (const f of filters) displayState.applyFilterToLayer(f, layer);
    if (mask) {
        const maskLayer = newLayer(w, h);
        const mm = mask.concatenatedTransformMatrix();
        const inv = obj.concatenatedTransformMatrix();
        inv.invert();
        mm.concat(inv);
        mm.concat(m);
        renderNode(maskLayer, mask, mm, new ColorTransform(), 'normal', smoothing, true);
        layer.globalCompositeOperation = 'destination-in';
        layer.drawImage(maskLayer.canvas, 0, 0);
        releaseLayer(maskLayer);
    }
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (PIXEL_BLENDS.has(blend)) blendPixels(ctx, layer, blend);
    else {
        ctx.globalCompositeOperation = COMPOSITE[blend] ?? 'source-over';
        ctx.drawImage(layer.canvas, 0, 0);
    }
    ctx.restore();
    releaseLayer(layer);
}

function drawChildren(ctx: Ctx, obj: DisplayObject, m: Matrix, ct: ColorTransform, smoothing: boolean): void {
    if (!(obj instanceof DisplayObjectContainer)) return;
    for (const child of obj.childList()) {
        if (displayState.isMaskOf(child)) continue;   // masks are not drawn themselves
        renderNode(ctx, child, m, ct, 'normal', smoothing, false);
    }
}

function isAlphaOnly(ct: ColorTransform): boolean {
    return ct.redMultiplier === 1 && ct.greenMultiplier === 1 && ct.blueMultiplier === 1
        && ct.redOffset === 0 && ct.greenOffset === 0 && ct.blueOffset === 0 && ct.alphaOffset === 0;
}

function alphaOnly(ct: ColorTransform): ColorTransform {
    return new ColorTransform(1, 1, 1, ct.alphaMultiplier);
}
