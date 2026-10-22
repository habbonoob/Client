import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export class ExperienceData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.pet::ExperienceData'); }

    declare private _canvas: BitmapData;

    declare private _SafeStr_7193: boolean;
    static { (this.prototype as any)._SafeStr_7193 = false; }

    declare private _SafeStr_3758: BitmapData;

    private _amount: number = -1;

    declare private _alpha: number;
    static { (this.prototype as any)._alpha = 0; }

    constructor(param1: BitmapData, param2: boolean = true) {
        this._canvas = param1;
        this._SafeStr_7193 = param2;
        if (this._canvas != null) {
            this._SafeStr_3758 = this._canvas.clone();
        }
        this.setExperience(0);
    }

    public dispose(): void {
        if (this._SafeStr_3758) {
            this._SafeStr_3758.dispose();
            this._SafeStr_3758 = null;
        }
        if (this._canvas != null) {
            if (this._SafeStr_7193) {
                this._canvas.dispose();
            }
            this._canvas = null;
        }
    }

    public get alpha(): number {
        return this._alpha;
    }

    public set alpha(param1: number) {
        this._alpha = param1;
    }

    public get image(): BitmapData {
        return this._canvas;
    }

    public setExperience(param1: number): void {
        if (this._amount == param1 || this._canvas == null) {
            return;
        }
        this._canvas.copyPixels(this._SafeStr_3758, this._SafeStr_3758.rect, new Point(0, 0));
        let _loc2_: TextFormat = new TextFormat();
        _loc2_.font = "Volter";
        _loc2_.color = 16777215;
        _loc2_.size = 9;
        let _loc3_: TextField = new TextField();
        _loc3_.embedFonts = true;
        _loc3_.width = 30;
        _loc3_.height = 12;
        _loc3_.background = true;
        _loc3_.backgroundColor = 3871388928;
        _loc3_.defaultTextFormat = _loc2_;
        _loc3_.text = "+" + param1;
        let _loc4_: Matrix = new Matrix();
        _loc4_.translate(15, 19);
        this._canvas.draw(_loc3_, _loc4_);
    }
}
