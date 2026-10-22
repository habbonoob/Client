import type { Filter } from 'pixi.js';
import { FlashFilter } from './gpu/FlashFilter';
import { BitmapFilter } from './BitmapFilter';
import { boxBlur, premultiply, unpremultiply } from './pixelOps';

/**
 * Blur: a box filter blurX × blurY pixels wide, applied `quality` times (1 low, 2 medium, 3 high;
 * more passes approach a Gaussian).
 */
export class BlurFilter extends BitmapFilter {
    blurX: number;
    blurY: number;
    quality: number;

    constructor(blurX: number = 4, blurY: number = 4, quality: number = 1) {
        super();
        this.blurX = blurX;
        this.blurY = blurY;
        this.quality = quality;
    }

    override sameAs(other: unknown): boolean {
        return this.sameFieldsAs(other);
    }

    clone(): BlurFilter {
        return new BlurFilter(this.blurX, this.blurY, this.quality);
    }

    createRenderFilter(): Filter {
        return new FlashFilter({ blurX: this.blurX, blurY: this.blurY, quality: this.quality });
    }

    protected filterPixels(source: ImageData): ImageData {
        const data = premultiply(source.data);
        boxBlur(data, source.width, source.height, this.blurX, this.blurY, Math.max(1, this.quality));
        return unpremultiply(data, source.width, source.height);
    }
}
