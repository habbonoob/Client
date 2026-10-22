import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export class ManualNineSliceSprite extends Sprite {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.visualization::ManualNineSliceSprite'); }

    private static readonly ZERO_POINT: Point = new Point();

    declare private _bitmap: Bitmap;

    declare private _patches: BitmapData[];

    declare private _leftWidth: number;
    static { (this.prototype as any)._leftWidth = 0; }

    declare private _centerWidth: number;
    static { (this.prototype as any)._centerWidth = 0; }

    declare private _rightWidth: number;
    static { (this.prototype as any)._rightWidth = 0; }

    declare private _SafeStr_15020: number;
    static { (this.prototype as any)._SafeStr_15020 = 0; }

    declare private _SafeStr_15021: number;
    static { (this.prototype as any)._SafeStr_15021 = 0; }

    declare private _SafeStr_15022: number;
    static { (this.prototype as any)._SafeStr_15022 = 0; }

    declare private _widthValue: number;
    static { (this.prototype as any)._widthValue = 0; }

    declare private _heightValue: number;
    static { (this.prototype as any)._heightValue = 0; }

    constructor(param1: Rectangle, param2: BitmapData) {
        super();
        this.mouseEnabled = false;
        this.mouseChildren = false;
        this._leftWidth = param1.x | 0;
        this._centerWidth = param1.width | 0;
        this._rightWidth = param2.width - (param1.right | 0);
        this._SafeStr_15020 = param1.y | 0;
        this._SafeStr_15021 = param1.height | 0;
        this._SafeStr_15022 = param2.height - (param1.bottom | 0);
        this._widthValue = param2.width;
        this._heightValue = param2.height;
        this._patches = this.createPatches(param2);
        this._bitmap = new Bitmap(null, "always", false);
        this.addChild(this._bitmap);
        this.redraw();
    }

    public override get width(): number {
        return this._widthValue;
    }

    public override set width(param1: number) {
        let _loc2_: number = Math.max(this._leftWidth + this._rightWidth, Math.round(param1)) | 0;
        if (this._widthValue == _loc2_) {
            return;
        }
        this._widthValue = _loc2_;
        this.redraw();
    }

    public override get height(): number {
        return this._heightValue;
    }

    public override set height(param1: number) {
        let _loc2_: number = Math.max(this._SafeStr_15020 + this._SafeStr_15022, Math.round(param1)) | 0;
        if (this._heightValue == _loc2_) {
            return;
        }
        this._heightValue = _loc2_;
        this.redraw();
    }

    private createPatches(param1: BitmapData): BitmapData[] {
        let _loc2_: BitmapData[] = new Array<BitmapData>(9).fill(null);
        _loc2_[0] = this.extractPatch(param1, 0, 0, this._leftWidth, this._SafeStr_15020);
        _loc2_[1] = this.extractPatch(param1, this._leftWidth, 0, this._centerWidth, this._SafeStr_15020);
        _loc2_[2] = this.extractPatch(param1, this._leftWidth + this._centerWidth, 0, this._rightWidth, this._SafeStr_15020);
        _loc2_[3] = this.extractPatch(param1, 0, this._SafeStr_15020, this._leftWidth, this._SafeStr_15021);
        _loc2_[4] = this.extractPatch(param1, this._leftWidth, this._SafeStr_15020, this._centerWidth, this._SafeStr_15021);
        _loc2_[5] = this.extractPatch(param1, this._leftWidth + this._centerWidth, this._SafeStr_15020, this._rightWidth, this._SafeStr_15021);
        _loc2_[6] = this.extractPatch(param1, 0, this._SafeStr_15020 + this._SafeStr_15021, this._leftWidth, this._SafeStr_15022);
        _loc2_[7] = this.extractPatch(param1, this._leftWidth, this._SafeStr_15020 + this._SafeStr_15021, this._centerWidth, this._SafeStr_15022);
        _loc2_[8] = this.extractPatch(param1, this._leftWidth + this._centerWidth, this._SafeStr_15020 + this._SafeStr_15021, this._rightWidth, this._SafeStr_15022);
        return _loc2_;
    }

    private extractPatch(param1: BitmapData, param2: number, param3: number, param4: number, param5: number): BitmapData {
        if (param4 <= 0 || param5 <= 0) {
            return null;
        }
        let _loc6_: BitmapData = new BitmapData(param4, param5, true, 0);
        _loc6_.copyPixels(param1, new Rectangle(param2, param3, param4, param5), ManualNineSliceSprite.ZERO_POINT);
        return _loc6_;
    }

    private redraw(): void {
        let _loc5_: number = Math.max(this._leftWidth + this._rightWidth, this._widthValue) | 0;
        let _loc1_: number = Math.max(this._SafeStr_15020 + this._SafeStr_15022, this._heightValue) | 0;
        let _loc2_: number = _loc5_ - this._leftWidth - this._rightWidth;
        let _loc3_: number = _loc1_ - this._SafeStr_15020 - this._SafeStr_15022;
        let _loc4_: BitmapData = new BitmapData(_loc5_, _loc1_, true, 0);
        this.drawPatch(_loc4_, this._patches[0], 0, 0, this._leftWidth, this._SafeStr_15020);
        this.drawPatch(_loc4_, this._patches[1], this._leftWidth, 0, _loc2_, this._SafeStr_15020);
        this.drawPatch(_loc4_, this._patches[2], this._leftWidth + _loc2_, 0, this._rightWidth, this._SafeStr_15020);
        this.drawPatch(_loc4_, this._patches[3], 0, this._SafeStr_15020, this._leftWidth, _loc3_);
        this.drawPatch(_loc4_, this._patches[4], this._leftWidth, this._SafeStr_15020, _loc2_, _loc3_);
        this.drawPatch(_loc4_, this._patches[5], this._leftWidth + _loc2_, this._SafeStr_15020, this._rightWidth, _loc3_);
        this.drawPatch(_loc4_, this._patches[6], 0, this._SafeStr_15020 + _loc3_, this._leftWidth, this._SafeStr_15022);
        this.drawPatch(_loc4_, this._patches[7], this._leftWidth, this._SafeStr_15020 + _loc3_, _loc2_, this._SafeStr_15022);
        this.drawPatch(_loc4_, this._patches[8], this._leftWidth + _loc2_, this._SafeStr_15020 + _loc3_, this._rightWidth, this._SafeStr_15022);
        if (this._bitmap.bitmapData != null) {
            this._bitmap.bitmapData.dispose();
        }
        this._bitmap.bitmapData = _loc4_;
    }

    private drawPatch(param1: BitmapData, param2: BitmapData, param3: number, param4: number, param5: number, param6: number): void {
        if (param2 == null || param5 <= 0 || param6 <= 0) {
            return;
        }
        if (param2.width == param5 && param2.height == param6) {
            param1.copyPixels(param2, param2.rect, new Point(param3, param4));
            return;
        }
        let _loc7_: Matrix = new Matrix();
        _loc7_.scale(param5 / param2.width, param6 / param2.height);
        _loc7_.translate(param3, param4);
        param1.draw(param2, _loc7_, null, null, new Rectangle(param3, param4, param5, param6), false);
    }
}
