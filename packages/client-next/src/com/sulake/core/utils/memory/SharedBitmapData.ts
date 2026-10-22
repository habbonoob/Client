import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IBitmapDrawable } from '@habbo-pixi/runtime/display/IBitmapDrawable';
import type { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import type { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class SharedBitmapData extends BitmapData {
    static { registerClassName(this, 'com.sulake.core.utils.memory::SharedBitmapData'); }

    private _SafeStr_2331: number = 1;

    declare private _SafeStr_2519: boolean;
    static { (this.prototype as any)._SafeStr_2519 = false; }

    constructor(param1: number, param2: number, param3: boolean, param4: number, param5: boolean) {
        super(param1, param2, param3, param4);
        this._SafeStr_2519 = param5;
    }

    public override clone(): BitmapData {
        this._SafeStr_2331 += 1;
        return this;
    }

    public override dispose(): void {
        this._SafeStr_2331 -= 1;
        if (this._SafeStr_2331 == 0) {
            super.dispose();
        }
    }

    public override setPixel(param1: number, param2: number, param3: number): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.setPixel(param1, param2, param3);
    }

    public override setPixel32(param1: number, param2: number, param3: number): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.setPixel32(param1, param2, param3);
    }

    public override applyFilter(param1: BitmapData, param2: Rectangle, param3: Point, param4: BitmapFilter): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.applyFilter(param1, param2, param3, param4);
    }

    public override colorTransform(param1: Rectangle, param2: ColorTransform): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.colorTransform(param1, param2);
    }

    public override draw(param1: IBitmapDrawable, param2: Matrix = null, param3: ColorTransform = null, param4: string = null, param5: Rectangle = null, param6: boolean = false): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.draw(param1, param2, param3, param4, param5, param6);
    }

    public override drawWithQuality(param1: IBitmapDrawable, param2: Matrix = null, param3: ColorTransform = null, param4: string = null, param5: Rectangle = null, param6: boolean = false, param7: string = null): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.drawWithQuality(param1, param2, param3, param4, param5, param6, param7);
    }

    public override fillRect(param1: Rectangle, param2: number): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.fillRect(param1, param2);
    }

    public override floodFill(param1: number, param2: number, param3: number): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.floodFill(param1, param2, param3);
    }

    public override merge(param1: BitmapData, param2: Rectangle, param3: Point, param4: number, param5: number, param6: number, param7: number): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.merge(param1, param2, param3, param4, param5, param6, param7);
    }

    public override paletteMap(param1: BitmapData, param2: Rectangle, param3: Point, param4: any[] = null, param5: any[] = null, param6: any[] = null, param7: any[] = null): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.paletteMap(param1, param2, param3, param4, param5, param6, param7);
    }

    public override perlinNoise(param1: number, param2: number, param3: number, param4: number, param5: boolean, param6: boolean, param7: number = 7, param8: boolean = false, param9: any[] = null): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.perlinNoise(param1, param2, param3, param4, param5, param6, param7, param8, param9);
    }

    public override pixelDissolve(param1: BitmapData, param2: Rectangle, param3: Point, param4: number = 0, param5: number = 0, param6: number = 0): number {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        return super.pixelDissolve(param1, param2, param3, param4, param5, param6);
    }

    public override setPixels(param1: Rectangle, param2: ByteArray): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.setPixels(param1, param2);
    }

    public override setVector(param1: Rectangle, param2: number[]): void {
        if (this._SafeStr_2519 && this._SafeStr_2331 > 1) {
            throw new Error("Bitmap is immutable if it is owned by multiple objects.");
        }
        super.setVector(param1, param2);
    }
}
