import type { Filter } from 'pixi.js';
import { FlashFilter } from './gpu/FlashFilter';
import { BitmapFilter } from './BitmapFilter';
import { shadowPass } from './pixelOps';

/** A shadow of the object's shape, `distance` pixels away at `angle` degrees (or inside, with `inner`). */
export class DropShadowFilter extends BitmapFilter {
    distance: number;
    angle: number;
    color: number;
    alpha: number;
    blurX: number;
    blurY: number;
    strength: number;
    quality: number;
    inner: boolean;
    knockout: boolean;
    hideObject: boolean;

    constructor(distance: number = 4, angle: number = 45, color: number = 0, alpha: number = 1, blurX: number = 4, blurY: number = 4,
        strength: number = 1, quality: number = 1, inner: boolean = false, knockout: boolean = false, hideObject: boolean = false) {
        super();
        this.distance = distance;
        this.angle = angle;
        this.color = color >>> 0;
        this.alpha = alpha;
        this.blurX = blurX;
        this.blurY = blurY;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
        this.hideObject = hideObject;
    }

    override sameAs(other: unknown): boolean {
        return this.sameFieldsAs(other);
    }

    clone(): DropShadowFilter {
        return new DropShadowFilter(this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength,
            this.quality, this.inner, this.knockout, this.hideObject);
    }

    #offset(): { x: number; y: number } {
        const a = this.angle * Math.PI / 180;
        return { x: Math.cos(a) * this.distance, y: Math.sin(a) * this.distance };
    }

    createRenderFilter(): Filter {
        const o = this.#offset();
        return new FlashFilter({
            blurX: this.blurX, blurY: this.blurY, quality: this.quality,
            shadow: { dx: o.x, dy: o.y, color: this.color, alpha: this.alpha, strength: this.strength, inner: this.inner, knockout: this.knockout, hideObject: this.hideObject },
        });
    }

    protected filterPixels(source: ImageData): ImageData {
        const o = this.#offset();
        return shadowPass(source, {
            dx: o.x, dy: o.y, color: this.color, alpha: this.alpha, blurX: this.blurX, blurY: this.blurY, strength: this.strength,
            quality: this.quality, inner: this.inner, knockout: this.knockout, hideObject: this.hideObject,
        });
    }
}
