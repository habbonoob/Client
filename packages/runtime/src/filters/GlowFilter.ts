import type { Filter } from 'pixi.js';
import { FlashFilter } from './gpu/FlashFilter';
import { BitmapFilter } from './BitmapFilter';
import { shadowPass } from './pixelOps';

/** A coloured glow around (or, with `inner`, inside) the object's shape. */
export class GlowFilter extends BitmapFilter {
    color: number;
    alpha: number;
    blurX: number;
    blurY: number;
    strength: number;
    quality: number;
    inner: boolean;
    knockout: boolean;

    constructor(color: number = 0xff0000, alpha: number = 1, blurX: number = 6, blurY: number = 6, strength: number = 2,
        quality: number = 1, inner: boolean = false, knockout: boolean = false) {
        super();
        this.color = color >>> 0;
        this.alpha = alpha;
        this.blurX = blurX;
        this.blurY = blurY;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
    }

    override sameAs(other: unknown): boolean {
        return this.sameFieldsAs(other);
    }

    clone(): GlowFilter {
        return new GlowFilter(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout);
    }

    createRenderFilter(): Filter {
        return new FlashFilter({
            blurX: this.blurX, blurY: this.blurY, quality: this.quality,
            shadow: { dx: 0, dy: 0, color: this.color, alpha: this.alpha, strength: this.strength, inner: this.inner, knockout: this.knockout, hideObject: false },
        });
    }

    protected filterPixels(source: ImageData): ImageData {
        return shadowPass(source, {
            dx: 0, dy: 0, color: this.color, alpha: this.alpha, blurX: this.blurX, blurY: this.blurY, strength: this.strength,
            quality: this.quality, inner: this.inner, knockout: this.knockout, hideObject: false,
        });
    }
}
