import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';
import { isIBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';

export class BitmapDataRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::BitmapDataRenderer'); }

    protected static readonly _SafeStr_8425: number = 0.212671;
    protected static readonly _SafeStr_8153: number = 0.71516;
    protected static readonly B: number = 0.072169;
    protected static readonly _MATRIX: Matrix = new Matrix();
    protected static readonly _SafeStr_2947: ColorTransform = new ColorTransform();
    protected static readonly _SafeStr_3167: ColorTransform = new ColorTransform(0, 0, 0, 1, 1, 1, 1, 0);
    protected static readonly _GREYSCALE_FILTER: ColorMatrixFilter = new ColorMatrixFilter();

    constructor(param1: string) {
        super(param1);
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc8_: number = NaN;
        let _loc7_: number = NaN;
        let _loc9_: BitmapData = null;
        let _loc11_: Matrix = null;
        let _loc18_: boolean = false;
        let _loc20_: boolean = false;
        let _loc22_: number = 0;
        let _loc14_: number = 0;
        let _loc12_: number = 0;
        let _loc10_: number = 0;
        let _loc13_: number = 0;
        let _loc15_: number = 0;
        let _loc26_: number = 0;
        let _loc25_: number = 0;
        let _loc19_: number = NaN;
        let _loc17_: number = NaN;
        let _loc16_: number = NaN;
        let _loc24_: number = 0;
        let _loc23_: number = 0;
        let _loc6_: IBitmapDataContainer = isIBitmapDataContainer(param1) ? param1 : null;
        let _loc21_: BitmapData = _loc6_.bitmapData;
        if (param2 != null && _loc21_ != null) {
            if (_loc6_.rotation != 0) {
                _loc8_ = _loc21_.width / 2;
                _loc7_ = _loc21_.height / 2;
                _loc9_ = new BitmapData(_loc21_.width, _loc21_.height, true, 0);
                _loc11_ = new Matrix();
                _loc11_.translate(-_loc8_, -_loc7_);
                _loc11_.rotate(_loc6_.rotation / 180 * 3.141592653589793);
                _loc11_.translate(_loc8_, _loc7_);
                _loc9_.draw(_loc21_, _loc11_);
                _loc21_ = _loc9_;
            }
            _loc18_ = _loc6_.zoomX < 0 != _loc6_.flipX;
            _loc20_ = _loc6_.zoomY < 0 != _loc6_.flipY;
            _loc22_ = (_loc6_.stretchedX ? param1.width : _loc21_.width) * _loc6_.zoomX | 0;
            _loc14_ = (_loc6_.stretchedY ? param1.height : _loc21_.height) * _loc6_.zoomY | 0;
            _loc12_ = Math.abs(_loc22_) | 0;
            _loc10_ = Math.abs(_loc14_) | 0;
            _loc13_ = (!_loc6_.wrapX ? 1 : param1.width / _loc12_ + 2) | 0;
            _loc15_ = (!_loc6_.wrapY ? 1 : param1.height / _loc10_ + 2) | 0;
            BitmapDataRenderer._MATRIX.a = _loc12_ / _loc21_.width * (_loc18_ ? -1 : 1);
            BitmapDataRenderer._MATRIX.d = _loc10_ / _loc21_.height * (_loc20_ ? -1 : 1);
            switch (_loc6_.pivotPoint | 0) {
                case 0:
                case 3:
                case 6:
                    BitmapDataRenderer._MATRIX.tx = _loc18_ ? _loc12_ : 0;
                    break;
                case 1:
                case 4:
                case 7:
                    BitmapDataRenderer._MATRIX.tx = ((param1.width - _loc12_) / 2 | 0) + (_loc18_ ? _loc12_ : 0);
                    break;
                case 2:
                case 5:
                case 8:
                    BitmapDataRenderer._MATRIX.tx = _loc18_ ? param1.width : param1.width - _loc12_;
            }
            _loc26_ = BitmapDataRenderer._MATRIX.tx | 0;
            while (_loc6_.wrapX && _loc26_ > 0) {
                _loc26_ -= _loc12_;
            }
            switch (_loc6_.pivotPoint | 0) {
                case 0:
                case 1:
                case 2:
                    BitmapDataRenderer._MATRIX.ty = _loc20_ ? _loc10_ : 0;
                    break;
                case 3:
                case 4:
                case 5:
                    BitmapDataRenderer._MATRIX.ty = ((param1.height - _loc10_) / 2 | 0) + (_loc20_ ? _loc10_ : 0);
                    break;
                case 6:
                case 7:
                case 8:
                    BitmapDataRenderer._MATRIX.ty = _loc20_ ? param1.height : param1.height - _loc10_;
            }
            _loc25_ = BitmapDataRenderer._MATRIX.ty | 0;
            while (_loc6_.wrapY && _loc25_ > 0) {
                _loc25_ -= _loc10_;
            }
            _loc19_ = ((param1.color & 0xFF0000) >> 16) / 255;
            _loc17_ = ((param1.color & 0xFF00) >> 8) / 255;
            _loc16_ = (param1.color & 0xFF) / 255;
            BitmapDataRenderer._SafeStr_3167.alphaMultiplier = (_loc6_.etchingColor >> 24 & 0xFF) / 255;
            BitmapDataRenderer._SafeStr_3167.redOffset = _loc6_.etchingColor >> 16 & 0xFF;
            BitmapDataRenderer._SafeStr_3167.greenOffset = _loc6_.etchingColor >> 8 & 0xFF;
            BitmapDataRenderer._SafeStr_3167.blueOffset = _loc6_.etchingColor & 0xFF;
            param2.lock();
            BitmapDataRenderer._MATRIX.ty = _loc25_;
            _loc24_ = 0;
            while (_loc24_ < _loc15_) {
                BitmapDataRenderer._MATRIX.tx = _loc26_;
                _loc23_ = 0;
                while (_loc23_ < _loc13_) {
                    if (_loc6_.greyscale) {
                        BitmapDataRenderer._GREYSCALE_FILTER.matrix = [_loc19_ * 0.212671, _loc19_ * 0.71516, _loc19_ * 0.072169, 0, 0, _loc17_ * 0.212671, _loc17_ * 0.71516, _loc17_ * 0.072169, 0, 0, _loc16_ * 0.212671, _loc16_ * 0.71516, _loc16_ * 0.072169, 0, 0, 0, 0, 0, 1, 0];
                        if (BitmapDataRenderer._SafeStr_3167.alphaMultiplier >= 0.001) {
                            BitmapDataRenderer._MATRIX.tx += _loc6_.etchingPoint.x;
                            BitmapDataRenderer._MATRIX.ty += _loc6_.etchingPoint.y;
                            param2.draw(_loc21_, BitmapDataRenderer._MATRIX, BitmapDataRenderer._SafeStr_3167, null, null, false);
                            BitmapDataRenderer._MATRIX.tx -= _loc6_.etchingPoint.x;
                            BitmapDataRenderer._MATRIX.ty -= _loc6_.etchingPoint.y;
                        }
                        param2.draw(_loc21_, BitmapDataRenderer._MATRIX, null, null, null, false);
                        param2.applyFilter(param2, param2.rect, new Point(), BitmapDataRenderer._GREYSCALE_FILTER);
                    } else {
                        BitmapDataRenderer._SafeStr_2947.redMultiplier = _loc19_;
                        BitmapDataRenderer._SafeStr_2947.greenMultiplier = _loc17_;
                        BitmapDataRenderer._SafeStr_2947.blueMultiplier = _loc16_;
                        BitmapDataRenderer._SafeStr_2947.alphaMultiplier = 1;
                        BitmapDataRenderer._SafeStr_2947.redOffset = 0;
                        BitmapDataRenderer._SafeStr_2947.greenOffset = 0;
                        BitmapDataRenderer._SafeStr_2947.blueOffset = 0;
                        BitmapDataRenderer._SafeStr_2947.alphaOffset = 0;
                        if (param1.dynamicStyleColor) {
                            BitmapDataRenderer._SafeStr_2947.concat(param1.dynamicStyleColor);
                        }
                        if (BitmapDataRenderer._SafeStr_3167.alphaMultiplier >= 0.001) {
                            BitmapDataRenderer._MATRIX.tx += _loc6_.etchingPoint.x;
                            BitmapDataRenderer._MATRIX.ty += _loc6_.etchingPoint.y;
                            param2.draw(_loc21_, BitmapDataRenderer._MATRIX, BitmapDataRenderer._SafeStr_3167, null, null, false);
                            BitmapDataRenderer._MATRIX.tx -= _loc6_.etchingPoint.x;
                            BitmapDataRenderer._MATRIX.ty -= _loc6_.etchingPoint.y;
                        }
                        param2.draw(_loc21_, BitmapDataRenderer._MATRIX, BitmapDataRenderer._SafeStr_2947, null, null, false);
                    }
                    BitmapDataRenderer._MATRIX.tx += _loc12_;
                    _loc23_++;
                }
                BitmapDataRenderer._MATRIX.ty += _loc10_;
                _loc24_++;
            }
            param2.unlock();
        }
    }

    public override isStateDrawable(param1: number): boolean {
        return param1 == 0;
    }
}
