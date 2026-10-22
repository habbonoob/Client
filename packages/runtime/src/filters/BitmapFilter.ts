import type { Filter } from 'pixi.js';
import type { Ctx } from '@habbo-pixi/runtime/display/canvasRender';
import { FILTER_LAYER, FILTER_PIXELS } from '@habbo-pixi/runtime/display/filterHooks';

/**
 * Base of the image filters. Each filter works in two places: on screen, as a PIXI filter on the
 * display object (createRenderFilter), and on pixels, for BitmapData.applyFilter and for drawing
 * filtered objects into bitmaps (the FILTER_PIXELS / FILTER_LAYER hooks).
 */
export abstract class BitmapFilter {
    abstract clone(): BitmapFilter;

    /**
     * Whether `other` is this same effect (same class, same values), so that assigning it in this one's place
     * changes nothing on screen. False when a filter cannot tell.
     */
    sameAs(other: unknown): boolean {
        void other;
        return false;
    }

    /** sameAs for a filter whose every setting is a public field. */
    protected sameFieldsAs(other: unknown): boolean {
        if (other == null || (other as object).constructor !== this.constructor) return false;
        const a = this as unknown as Record<string, unknown>, b = other as Record<string, unknown>;
        return Object.keys(a).every(k => a[k] === b[k]);
    }

    /** The PIXI filter showing this effect on screen. */
    abstract createRenderFilter(): Filter | null;

    /** The effect on straight RGBA pixels (same size in and out). */
    protected abstract filterPixels(source: ImageData): ImageData;

    [FILTER_PIXELS](source: ImageData): ImageData {
        return this.filterPixels(source);
    }

    [FILTER_LAYER](layer: Ctx): void {
        const w = layer.canvas.width, h = layer.canvas.height;
        layer.putImageData(this.filterPixels(layer.getImageData(0, 0, w, h)), 0, 0);
    }
}
