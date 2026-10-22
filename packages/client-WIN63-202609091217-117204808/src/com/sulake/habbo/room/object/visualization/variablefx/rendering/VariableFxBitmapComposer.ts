import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';

export class VariableFxBitmapComposer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxBitmapComposer'); }

    declare private _bitmapData: BitmapData;

    constructor(param1: BitmapData) {
        this._bitmapData = param1;
    }

    private static clampOpacity(param1: number): number {
        if (param1 <= 0) {
            return 0;
        }
        if (param1 >= 255) {
            return 255;
        }
        return param1;
    }

    public get bitmapData(): BitmapData {
        return this._bitmapData;
    }

    public clear(param1: number): void {
        this.fillRect(0, 0, this._bitmapData.width, this._bitmapData.height, param1);
    }

    public fillRect(param1: number, param2: number, param3: number, param4: number, param5: number): void {
        let _loc6_: any = this.getTargetBounds(param1, param2, param3, param4);
        if (_loc6_.left >= _loc6_.right || _loc6_.top >= _loc6_.bottom) {
            return;
        }
        this._bitmapData.fillRect(new Rectangle(Number(_loc6_.left), Number(_loc6_.top), _loc6_.right - _loc6_.left, _loc6_.bottom - _loc6_.top), param5);
    }

    public drawLayer(param1: BitmapData, param2: number, param3: number, param4: string = "normal", param5: number = 255, param6: VariableFxClipRect = null): void {
        this.drawBitmap(param1, param2, param3, param4, param5, param6);
    }

    public drawTintedLayer(param1: BitmapData, param2: number, param3: number, param4: number, param5: string = "normal", param6: number = 255, param7: VariableFxClipRect = null): void {
        this._bitmapData.draw(param1, new Matrix(1, 0, 0, 1, param2 | 0, param3 | 0), this.createTintColorTransform(param4, param6), param5, this.createClipRectangle(param7), false);
    }

    public drawMaskedLayer(param1: BitmapData, param2: BitmapData, param3: number, param4: number, param5: number, param6: number, param7: string, param8: number, param9: VariableFxClipRect = null): void {
        let _loc11_: BitmapData = null;
        let _loc13_: BitmapData = null;
        let _loc19_: BitmapData = null;
        let _loc15_: Rectangle = null;
        let _loc12_: Point = null;
        let _loc16_: any = this.getTargetBounds(param3, param4, param1.width, param1.height, param9);
        let _loc20_: number = param3 | 0;
        let _loc21_: number = param4 | 0;
        let _loc14_: number = param5 | 0;
        let _loc18_: number = param6 | 0;
        let _loc10_: any = { "left": Math.max(Number(_loc16_.left), _loc14_), "top": Math.max(Number(_loc16_.top), _loc18_), "right": Math.min(Number(_loc16_.right), _loc14_ + param2.width), "bottom": Math.min(Number(_loc16_.bottom), _loc18_ + param2.height) };
        let _loc17_: number = _loc10_.right - _loc10_.left | 0;
        let _loc22_: number = _loc10_.bottom - _loc10_.top | 0;
        if (_loc17_ <= 0 || _loc22_ <= 0) {
            return;
        }
        _loc11_ = new BitmapData(_loc17_, _loc22_, true, 0);
        _loc13_ = new BitmapData(_loc17_, _loc22_, true, 0);
        _loc19_ = new BitmapData(_loc17_, _loc22_, true, 0);
        _loc15_ = new Rectangle(0, 0, _loc17_, _loc22_);
        _loc12_ = new Point(0, 0);
        try {
            _loc11_.draw(param1, new Matrix(1, 0, 0, 1, _loc20_ - _loc10_.left, _loc21_ - _loc10_.top), null, "normal", _loc15_, false);
            _loc13_.copyChannel(param2, new Rectangle(_loc10_.left - _loc14_, _loc10_.top - _loc18_, _loc17_, _loc22_), _loc12_, 1, 8);
            _loc19_.copyPixels(_loc11_, _loc15_, _loc12_, _loc13_, _loc12_);
            this.drawBitmap(_loc19_, Number(_loc10_.left), Number(_loc10_.top), param7, param8);
        } finally {
            _loc11_.dispose();
            _loc13_.dispose();
            _loc19_.dispose();
        }
    }

    public drawThreeSlice(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: string, param8: number, param9: VariableFxClipRect = null, param10: any = null): void {
        let _loc12_: number = 0;
        let _loc16_: number = Math.max(0, param2 | 0) | 0;
        let _loc13_: number = Math.max(0, param3 | 0) | 0;
        let _loc14_: number = Math.max(0, param4 | 0) | 0;
        let _loc15_: number = Math.max(0, param1.width - _loc16_ - _loc13_) | 0;
        let _loc11_: number = Math.max(0, _loc14_ - _loc16_ - _loc13_) | 0;
        let _loc17_: ColorTransform = param10 == null ? this.createAlphaColorTransform(param8) : this.createTintColorTransform(param10 >>> 0, param8);
        this.drawSourceRegionWithTransform(param1, 0, 0, Math.min(_loc16_, _loc14_), param1.height, param5, param6, param7, param9, _loc17_);
        if (_loc15_ > 0 && _loc11_ > 0) {
            this.drawScaledHorizontalRegion(param1, _loc16_, _loc15_, param1.height, param5 + _loc16_, param6, _loc11_, param7, param8, param9, _loc17_);
        }
        _loc12_ = Math.min(_loc13_, Math.max(0, _loc14_ - _loc16_ - _loc11_)) | 0;
        if (_loc12_ > 0) {
            this.drawSourceRegionWithTransform(param1, param1.width - _loc12_, 0, _loc12_, param1.height, param5 + _loc14_ - _loc12_, param6, param7, param9, _loc17_);
        }
    }

    public drawRepeatedThreeSlice(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: string, param8: number, param9: VariableFxClipRect = null): void {
        let _loc11_: number = 0;
        let _loc15_: number = Math.max(0, param2 | 0) | 0;
        let _loc12_: number = Math.max(0, param3 | 0) | 0;
        let _loc13_: number = Math.max(0, param4 | 0) | 0;
        let _loc14_: number = Math.max(0, param1.width - _loc15_ - _loc12_) | 0;
        let _loc10_: number = Math.max(0, _loc13_ - _loc15_ - _loc12_) | 0;
        this.drawSourceRegion(param1, 0, 0, Math.min(_loc15_, _loc13_), param1.height, param5, param6, param7, param8, param9);
        if (_loc14_ > 0 && _loc10_ > 0) {
            this.drawTiledChunk(param1, new VariableFxClipRect(_loc15_, 0, _loc14_, param1.height), param5 + _loc15_, param6, _loc10_, param1.height, param7, param8, param9);
        }
        _loc11_ = Math.min(_loc12_, Math.max(0, _loc13_ - _loc15_ - _loc10_)) | 0;
        if (_loc11_ > 0) {
            this.drawSourceRegion(param1, param1.width - _loc11_, 0, _loc11_, param1.height, param5 + _loc13_ - _loc11_, param6, param7, param8, param9);
        }
    }

    public drawTiledChunk(param1: BitmapData, param2: VariableFxClipRect, param3: number, param4: number, param5: number, param6: number, param7: string, param8: number, param9: VariableFxClipRect = null): void {
        let _loc14_: number = 0;
        let _loc15_: number = 0;
        let _loc18_: VariableFxClipRect = null;
        let _loc20_: number = 0;
        let _loc21_: number = 0;
        let _loc16_: number = param2.x;
        let _loc13_: number = param2.y;
        let _loc10_: number = Math.max(0, param2.width) | 0;
        let _loc17_: number = Math.max(0, param2.height) | 0;
        let _loc12_: number = param3 | 0;
        let _loc11_: number = param4 | 0;
        let _loc19_: any = this.getTargetBounds(_loc12_, _loc11_, Math.max(0, param5 | 0), Math.max(0, param6 | 0), param9);
        if (_loc10_ <= 0 || _loc17_ <= 0 || _loc19_.left >= _loc19_.right || _loc19_.top >= _loc19_.bottom) {
            return;
        }
        _loc14_ = _loc12_ + Math.floor((_loc19_.left - _loc12_) / _loc10_) * _loc10_ | 0;
        _loc15_ = _loc11_ + Math.floor((_loc19_.top - _loc11_) / _loc17_) * _loc17_ | 0;
        _loc18_ = this.boundsToClipRect(_loc19_);
        _loc21_ = _loc15_;
        while (_loc21_ < _loc19_.bottom) {
            _loc20_ = _loc14_;
            while (_loc20_ < _loc19_.right) {
                this.drawSourceRegion(param1, _loc16_, _loc13_, _loc10_, _loc17_, _loc20_, _loc21_, param7, param8, _loc18_);
                _loc20_ += _loc10_;
            }
            _loc21_ += _loc17_;
        }
    }

    public drawSourceRegion(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: string, param9: number, param10: VariableFxClipRect = null, param11: ColorTransform = null): void {
        this.drawSourceRegionWithTransform(param1, param2, param3, param4, param5, param6, param7, param8, param10, this.composeColorTransformWithOpacity(param11, param9));
    }

    private drawBitmap(param1: BitmapData, param2: number, param3: number, param4: string, param5: number, param6: VariableFxClipRect = null): void {
        let _loc7_: number = VariableFxBitmapComposer.clampOpacity(param5);
        let _loc8_: Rectangle = this.createClipRectangle(param6);
        if (_loc7_ <= 0 || _loc8_ != null && (_loc8_.width <= 0 || _loc8_.height <= 0)) {
            return;
        }
        this._bitmapData.draw(param1, new Matrix(1, 0, 0, 1, param2 | 0, param3 | 0), _loc7_ >= 255 ? null : new ColorTransform(1, 1, 1, _loc7_ / 255), param4, _loc8_, false);
    }

    private drawSourceRegionWithTransform(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: string, param9: VariableFxClipRect, param10: ColorTransform): void {
        let _loc15_: number = param2 | 0;
        let _loc16_: number = param3 | 0;
        let _loc12_: number = param6 | 0;
        let _loc11_: number = param7 | 0;
        let _loc13_: any = this.getTargetBounds(_loc12_, _loc11_, param4, param5, param9);
        let _loc14_: Rectangle = this.createClipRectangle(this.boundsToClipRect(_loc13_));
        if (_loc14_ == null || _loc14_.width <= 0 || _loc14_.height <= 0 || param4 <= 0 || param5 <= 0) {
            return;
        }
        this._bitmapData.draw(param1, new Matrix(1, 0, 0, 1, _loc12_ - _loc15_, _loc11_ - _loc16_), param10, param8, _loc14_, false);
    }

    private drawScaledHorizontalRegion(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: string, param9: number, param10: VariableFxClipRect, param11: ColorTransform): void {
        let _loc18_: number = param2 | 0;
        let _loc16_: number = param3 | 0;
        let _loc15_: number = param4 | 0;
        let _loc14_: number = param7 | 0;
        let _loc13_: number = param5 | 0;
        let _loc12_: number = param6 | 0;
        let _loc17_: number = _loc16_ <= 0 ? 1 : _loc14_ / _loc16_;
        let _loc19_: any = this.getTargetBounds(_loc13_, _loc12_, _loc14_, _loc15_, param10);
        let _loc20_: Rectangle = this.createClipRectangle(this.boundsToClipRect(_loc19_));
        if (_loc20_ == null || _loc20_.width <= 0 || _loc20_.height <= 0 || _loc16_ <= 0 || _loc15_ <= 0 || _loc14_ <= 0) {
            return;
        }
        this._bitmapData.draw(param1, new Matrix(_loc17_, 0, 0, 1, _loc13_ - _loc18_ * _loc17_, _loc12_), param11, param8, _loc20_, false);
    }

    private createAlphaColorTransform(param1: number): ColorTransform {
        let _loc2_: number = VariableFxBitmapComposer.clampOpacity(param1);
        return _loc2_ >= 255 ? null : new ColorTransform(1, 1, 1, _loc2_ / 255);
    }

    private composeColorTransformWithOpacity(param1: ColorTransform, param2: number): ColorTransform {
        let _loc4_: number = NaN;
        let _loc3_: number = VariableFxBitmapComposer.clampOpacity(param2);
        if (param1 == null) {
            return this.createAlphaColorTransform(_loc3_);
        }
        _loc4_ = _loc3_ / 255;
        return new ColorTransform(param1.redMultiplier, param1.greenMultiplier, param1.blueMultiplier, param1.alphaMultiplier * _loc4_, param1.redOffset, param1.greenOffset, param1.blueOffset, param1.alphaOffset * _loc4_);
    }

    private createClipRectangle(param1: VariableFxClipRect): Rectangle {
        if (param1 == null) {
            return null;
        }
        return new Rectangle(param1.x, param1.y, Math.max(0, param1.width), Math.max(0, param1.height));
    }

    private createTintColorTransform(param1: number, param2: number): ColorTransform {
        let _loc4_: number = VariableFxBitmapComposer.clampOpacity(param2);
        let _loc7_: number = param1 >>> 24 & 0xFF;
        let _loc3_: number = param1 >>> 16 & 0xFF;
        let _loc5_: number = param1 >>> 8 & 0xFF;
        let _loc6_: number = param1 & 0xFF;
        return new ColorTransform(_loc3_ / 255, _loc5_ / 255, _loc6_ / 255, _loc7_ * _loc4_ / 65025);
    }

    private boundsToClipRect(param1: any): VariableFxClipRect {
        return new VariableFxClipRect(param1.left | 0, param1.top | 0, param1.right - param1.left | 0, param1.bottom - param1.top | 0);
    }

    private getTargetBounds(param1: number, param2: number, param3: number, param4: number, param5: VariableFxClipRect = null): any {
        let _loc9_: number = 0;
        let _loc13_: number = 0;
        let _loc6_: number = param1 | 0;
        let _loc8_: number = param2 | 0;
        let _loc12_: number = Math.max(0, _loc6_) | 0;
        let _loc11_: number = Math.max(0, _loc8_) | 0;
        let _loc10_: number = Math.min(this._bitmapData.width, _loc6_ + Math.max(0, param3 | 0)) | 0;
        let _loc7_: number = Math.min(this._bitmapData.height, _loc8_ + Math.max(0, param4 | 0)) | 0;
        if (param5 != null) {
            _loc9_ = param5.x;
            _loc13_ = param5.y;
            _loc12_ = Math.max(_loc12_, _loc9_) | 0;
            _loc11_ = Math.max(_loc11_, _loc13_) | 0;
            _loc10_ = Math.min(_loc10_, _loc9_ + Math.max(0, param5.width)) | 0;
            _loc7_ = Math.min(_loc7_, _loc13_ + Math.max(0, param5.height)) | 0;
        }
        return { "left": _loc12_, "top": _loc11_, "right": Math.max(_loc12_, _loc10_), "bottom": Math.max(_loc11_, _loc7_) };
    }
}
