import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class AnimationItem {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.animated::AnimationItem'); }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: BitmapData) {
        this._SafeStr_2126 = param1;
        this._y = param2;
        this._SafeStr_4408 = param3;
        this._SafeStr_4630 = param4;
        if (isNaN(this._SafeStr_2126)) {
            this._SafeStr_2126 = 0;
        }
        if (isNaN(this._y)) {
            this._y = 0;
        }
        if (isNaN(this._SafeStr_4408)) {
            this._SafeStr_4408 = 0;
        }
        if (isNaN(this._SafeStr_4630)) {
            this._SafeStr_4630 = 0;
        }
        this._bitmapData = param5;
    }

    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _SafeStr_4408: number = 0;
    private _SafeStr_4630: number = 0;
    private _bitmapData: BitmapData = null;

    public get bitmapData(): BitmapData {
        return this._bitmapData;
    }

    public dispose(): void {
        this._bitmapData = null;
    }

    public getPosition(param1: number, param2: number, param3: number, param4: number, param5: number): Point {
        let _loc6_: number = this._SafeStr_2126;
        let _loc7_: number = this._y;
        if (param3 > 0) {
            _loc6_ += this._SafeStr_4408 / param3 * param5 / 1000;
        }
        if (param4 > 0) {
            _loc7_ += this._SafeStr_4630 / param4 * param5 / 1000;
        }
        let _loc8_: number = _loc6_ % 1 * param1 | 0;
        let _loc9_: number = _loc7_ % 1 * param2 | 0;
        return new Point(_loc8_, _loc9_);
    }
}
