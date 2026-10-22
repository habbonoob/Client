import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export class ImageData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.cache::ImageData'); }

    constructor(param1: BitmapData, param2: Rectangle, param3: Point, param4: boolean, param5: ColorTransform) {
        this._bitmap = param1;
        this._SafeStr_4345 = param2;
        this._regPoint = param3;
        this._flipH = param4;
        this._colorTransform = param5;
        if (param4) {
            this._regPoint.x = -this._regPoint.x + param2.width;
        }
    }

    declare private _SafeStr_4345: Rectangle;

    declare private _colorTransform: ColorTransform;

    declare private _bitmap: BitmapData;

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    declare private _regPoint: Point;

    public get regPoint(): Point {
        return this._regPoint;
    }

    declare private _flipH: boolean;
    static { (this.prototype as any)._flipH = false; }

    public get flipH(): boolean {
        return this._flipH;
    }

    public get rect(): Rectangle {
        return this._SafeStr_4345;
    }

    public get colorTransform(): ColorTransform {
        return this._colorTransform;
    }

    public get offsetRect(): Rectangle {
        let _loc1_: Rectangle = new Rectangle(0, 0, this._SafeStr_4345.width, this._SafeStr_4345.height);
        _loc1_.offset(-this._regPoint.x, -this._regPoint.y);
        return _loc1_;
    }

    public dispose(): void {
        this._bitmap = null;
        this._regPoint = null;
        this._colorTransform = null;
    }
}
