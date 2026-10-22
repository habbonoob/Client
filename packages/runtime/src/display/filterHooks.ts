// How filter objects plug into bitmap operations: BitmapData.applyFilter and BitmapData.draw of
// filtered display objects call these on the filter (the filters package implements them).

import type { Ctx } from './canvasRender';

/** Filter an image region: `source` pixels in, pixels of the same size out. */
export const FILTER_PIXELS = Symbol('filters.pixels');

/** Filter a whole canvas layer in place. */
export const FILTER_LAYER = Symbol('filters.layer');

export interface PixelFilter {
    [FILTER_PIXELS](source: ImageData): ImageData;
    [FILTER_LAYER](layer: Ctx): void;
}

export function isPixelFilter(f: unknown): f is PixelFilter {
    return typeof (f as PixelFilter | null)?.[FILTER_PIXELS] === 'function';
}
