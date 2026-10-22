import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Graphics } from '@habbo-pixi/runtime/display/Graphics';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ShapeController } from '@/com/sulake/core/window/Classes.group';
import { HsvLayerColor } from '@/com/sulake/core/window/graphics/renderer/HsvLayerColor';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class ShapeSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::ShapeSkinRenderer'); }

    private static readonly SHAPE: Shape = new Shape();

    constructor(param1: string) {
        super(param1);
    }

    public static alphaFromColor(param1: number): number {
        let _loc2_: number = (param1 >>> 24 & 0xFF) >>> 0;
        return _loc2_ == 0 ? 1 : _loc2_ / 255;
    }

    private static cornerRadius(param1: number, param2: number, param3: number): number {
        if (isNaN(param1) || Boolean(isNaN(param2)) || Boolean(isNaN(param3)) || param1 <= 0 || param2 <= 0 || param3 <= 0) {
            return 0;
        }
        return Math.min(Math.round(param1), Math.floor(param2 / 2), Math.floor(param3 / 2)) | 0;
    }

    private static snap(param1: number): number {
        return isNaN(param1) ? 0 : Math.round(param1) | 0;
    }

    private static snappedThickness(param1: number): number {
        return isNaN(param1) || param1 <= 0 ? 0 : Math.max(1, Math.round(param1)) | 0;
    }

    private static roundRectInset(param1: number, param2: number, param3: number, param4: number): number {
        let _loc5_: number = param1 < param2 + param4 ? param2 + param4 - param1 - 0.5 : (param1 >= param3 - param4 ? param1 + 0.5 - (param3 - param4) : 0);
        if (_loc5_ <= 0) {
            return 0;
        }
        return Math.ceil(param4 - Math.sqrt(param4 * param4 - _loc5_ * _loc5_) - 0.5) | 0;
    }

    private static argbFromColor(param1: number): number {
        let _loc2_: number = (param1 >>> 24 & 0xFF) >>> 0;
        return ((_loc2_ == 0 ? 255 : _loc2_) << 24 | param1 & 0xFFFFFF) >>> 0;
    }

    private static blendPixel(param1: BitmapData, param2: number, param3: number, param4: number, param5: number): void {
        if (param5 <= 0) {
            return;
        }
        if (param5 > 1) {
            param5 = 1;
        }
        let _loc6_: number = (param4 >>> 24 & 0xFF) >>> 0;
        let _loc8_: number = (_loc6_ == 0 ? 255 : _loc6_) / 255 * param5;
        if (_loc8_ >= 1) {
            param1.setPixel32(param2, param3, (0xFF000000 | param4 & 0xFFFFFF) >>> 0);
            return;
        }
        let _loc13_: number = param1.getPixel32(param2, param3);
        let _loc18_: number = (_loc13_ >>> 24 & 0xFF) / 255;
        let _loc14_: number = _loc8_ + _loc18_ * (1 - _loc8_);
        if (_loc14_ <= 0) {
            param1.setPixel32(param2, param3, 0);
            return;
        }
        let _loc16_: number = param4 >>> 16 & 0xFF;
        let _loc9_: number = param4 >>> 8 & 0xFF;
        let _loc12_: number = param4 & 0xFF;
        let _loc7_: number = _loc13_ >>> 16 & 0xFF;
        let _loc20_: number = _loc13_ >>> 8 & 0xFF;
        let _loc17_: number = _loc13_ & 0xFF;
        let _loc19_: number = Math.min(255, Math.round((_loc16_ * _loc8_ + _loc7_ * _loc18_ * (1 - _loc8_)) / _loc14_)) >>> 0;
        let _loc11_: number = Math.min(255, Math.round((_loc9_ * _loc8_ + _loc20_ * _loc18_ * (1 - _loc8_)) / _loc14_)) >>> 0;
        let _loc15_: number = Math.min(255, Math.round((_loc12_ * _loc8_ + _loc17_ * _loc18_ * (1 - _loc8_)) / _loc14_)) >>> 0;
        let _loc10_: number = Math.min(255, Math.round(_loc14_ * 255)) >>> 0;
        param1.setPixel32(param2, param3, (_loc10_ << 24 | _loc19_ << 16 | _loc11_ << 8 | _loc15_) >>> 0);
    }

    private static fillPixelRect(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number): void {
        param2 = Math.max(0, param2) | 0;
        param3 = Math.max(0, param3) | 0;
        param4 = Math.min(param1.width, param4) | 0;
        param5 = Math.min(param1.height, param5) | 0;
        if (param4 <= param2 || param5 <= param3) {
            return;
        }
        param1.fillRect(new Rectangle(param2, param3, param4 - param2, param5 - param3), ShapeSkinRenderer.argbFromColor(param6));
    }

    private static drawRectFill(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number): void {
        ShapeSkinRenderer.fillPixelRect(param1, ShapeSkinRenderer.snap(param2), ShapeSkinRenderer.snap(param3), ShapeSkinRenderer.snap(param2 + param4), ShapeSkinRenderer.snap(param3 + param5), param6);
    }

    private static blendPixelRect(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number): void {
        let _loc9_: number = 0;
        let _loc8_: number = 0;
        let _loc7_: number = (param6 >>> 24 & 0xFF) >>> 0;
        if (_loc7_ == 0 || _loc7_ == 255) {
            ShapeSkinRenderer.fillPixelRect(param1, param2, param3, param4, param5, param6);
            return;
        }
        param2 = Math.max(0, param2) | 0;
        param3 = Math.max(0, param3) | 0;
        param4 = Math.min(param1.width, param4) | 0;
        param5 = Math.min(param1.height, param5) | 0;
        _loc9_ = param3;
        while (_loc9_ < param5) {
            _loc8_ = param2;
            while (_loc8_ < param4) {
                ShapeSkinRenderer.blendPixel(param1, _loc8_, _loc9_, param6, 1);
                _loc8_++;
            }
            _loc9_++;
        }
    }

    private static drawRectStroke(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number): void {
        let _loc13_: number = ShapeSkinRenderer.snap(param2);
        let _loc11_: number = ShapeSkinRenderer.snap(param3);
        let _loc9_: number = ShapeSkinRenderer.snap(param2 + param4);
        let _loc8_: number = ShapeSkinRenderer.snap(param3 + param5);
        let _loc12_: number = ShapeSkinRenderer.snappedThickness(param6);
        if (_loc12_ <= 0 || _loc9_ <= _loc13_ || _loc8_ <= _loc11_) {
            return;
        }
        let _loc14_: number = Math.min(_loc13_ + _loc12_, _loc9_) | 0;
        let _loc15_: number = Math.max(_loc14_, _loc9_ - _loc12_) | 0;
        let _loc16_: number = Math.min(_loc11_ + _loc12_, _loc8_) | 0;
        let _loc10_: number = Math.max(_loc16_, _loc8_ - _loc12_) | 0;
        ShapeSkinRenderer.blendPixelRect(param1, _loc13_, _loc11_, _loc9_, _loc16_, param7);
        ShapeSkinRenderer.blendPixelRect(param1, _loc13_, _loc10_, _loc9_, _loc8_, param7);
        ShapeSkinRenderer.blendPixelRect(param1, _loc13_, _loc16_, _loc14_, _loc10_, param7);
        ShapeSkinRenderer.blendPixelRect(param1, _loc15_, _loc16_, _loc9_, _loc10_, param7);
    }

    public static drawRectStrokeSides(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: boolean, param9: boolean, param10: boolean, param11: boolean): void {
        let _loc16_: number = ShapeSkinRenderer.snap(param2);
        let _loc14_: number = ShapeSkinRenderer.snap(param3);
        let _loc13_: number = ShapeSkinRenderer.snap(param2 + param4);
        let _loc12_: number = ShapeSkinRenderer.snap(param3 + param5);
        let _loc15_: number = ShapeSkinRenderer.snappedThickness(param6);
        if (param1 == null || _loc15_ <= 0 || _loc13_ <= _loc16_ || _loc12_ <= _loc14_) {
            return;
        }
        if (param8) {
            ShapeSkinRenderer.fillPixelRect(param1, _loc16_, _loc14_, _loc13_, _loc14_ + _loc15_, param7);
        }
        if (param9) {
            ShapeSkinRenderer.fillPixelRect(param1, _loc13_ - _loc15_, _loc14_, _loc13_, _loc12_, param7);
        }
        if (param10) {
            ShapeSkinRenderer.fillPixelRect(param1, _loc16_, _loc12_ - _loc15_, _loc13_, _loc12_, param7);
        }
        if (param11) {
            ShapeSkinRenderer.fillPixelRect(param1, _loc16_, _loc14_, _loc16_ + _loc15_, _loc12_, param7);
        }
    }

    private static drawRoundRectFill(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number): void {
        let _loc10_: number = 0;
        let _loc17_: number = 0;
        let _loc9_: number = 0;
        let _loc14_: number = ShapeSkinRenderer.snap(param2);
        let _loc13_: number = ShapeSkinRenderer.snap(param3);
        let _loc11_: number = ShapeSkinRenderer.snap(param2 + param4);
        let _loc8_: number = ShapeSkinRenderer.snap(param3 + param5);
        let _loc12_: number = ShapeSkinRenderer.cornerRadius(param6, _loc11_ - _loc14_, _loc8_ - _loc13_);
        let _loc15_: number = Math.max(0, _loc13_) | 0;
        let _loc16_: number = Math.min(param1.height, _loc8_) | 0;
        if (_loc11_ <= _loc14_ || _loc8_ <= _loc13_) {
            return;
        }
        _loc10_ = _loc15_;
        while (_loc10_ < _loc16_) {
            _loc9_ = ShapeSkinRenderer.roundRectInset(_loc10_, _loc13_, _loc8_, _loc12_);
            _loc17_ = _loc10_ >= _loc13_ + _loc12_ && _loc10_ < _loc8_ - _loc12_ ? Math.min(_loc16_, _loc8_ - _loc12_) | 0 : _loc10_ + 1;
            ShapeSkinRenderer.fillPixelRect(param1, _loc14_ + _loc9_, _loc10_, _loc11_ - _loc9_, _loc17_, param7);
            _loc10_ = _loc17_;
        }
    }

    public static drawRoundRectStroke(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number): void {
        let _loc25_: number = 0;
        let _loc13_: number = 0;
        let _loc10_: number = 0;
        let _loc28_: number = 0;
        let _loc16_: number = 0;
        let _loc27_: number = 0;
        let _loc19_: number = 0;
        let _loc12_: number = 0;
        let _loc24_: number = ShapeSkinRenderer.snap(param2);
        let _loc11_: number = ShapeSkinRenderer.snap(param3);
        let _loc20_: number = ShapeSkinRenderer.snap(param2 + param4);
        let _loc18_: number = ShapeSkinRenderer.snap(param3 + param5);
        let _loc23_: number = ShapeSkinRenderer.snappedThickness(param7);
        let _loc17_: number = ShapeSkinRenderer.cornerRadius(param6, _loc20_ - _loc24_, _loc18_ - _loc11_);
        let _loc26_: number = _loc24_ + _loc23_;
        let _loc15_: number = _loc11_ + _loc23_;
        let _loc29_: number = _loc20_ - _loc23_;
        let _loc21_: number = _loc18_ - _loc23_;
        let _loc14_: number = ShapeSkinRenderer.cornerRadius(Math.max(0, param6 - _loc23_), _loc29_ - _loc26_, _loc21_ - _loc15_);
        if (param1 == null || _loc23_ <= 0 || _loc20_ <= _loc24_ || _loc18_ <= _loc11_) {
            return;
        }
        if (_loc17_ == 0) {
            ShapeSkinRenderer.drawRectStroke(param1, param2, param3, param4, param5, _loc23_, param8);
            return;
        }
        _loc25_ = Math.max(0, _loc11_) | 0;
        _loc13_ = Math.min(param1.height, _loc18_) | 0;
        let _loc22_: number = Math.max(_loc11_ + _loc17_, _loc15_ + _loc14_) | 0;
        let _loc9_: number = Math.min(_loc18_ - _loc17_, _loc21_ - _loc14_) | 0;
        _loc10_ = _loc25_;
        while (_loc10_ < _loc13_) {
            _loc16_ = ShapeSkinRenderer.roundRectInset(_loc10_, _loc11_, _loc18_, _loc17_);
            _loc19_ = _loc24_ + _loc16_;
            _loc12_ = _loc20_ - _loc16_;
            _loc28_ = _loc10_ >= _loc22_ && _loc10_ < _loc9_ ? Math.min(_loc13_, _loc9_) | 0 : _loc10_ + 1;
            if (_loc26_ < _loc29_ && _loc10_ >= _loc15_ && _loc10_ < _loc21_) {
                _loc27_ = ShapeSkinRenderer.roundRectInset(_loc10_, _loc15_, _loc21_, _loc14_);
                ShapeSkinRenderer.blendPixelRect(param1, _loc19_, _loc10_, Math.min(_loc12_, _loc26_ + _loc27_) | 0, _loc28_, param8);
                ShapeSkinRenderer.blendPixelRect(param1, Math.max(_loc19_, _loc29_ - _loc27_) | 0, _loc10_, _loc12_, _loc28_, param8);
            } else {
                ShapeSkinRenderer.blendPixelRect(param1, _loc19_, _loc10_, _loc12_, _loc28_, param8);
            }
            _loc10_ = _loc28_;
        }
    }

    private static rhombusContainsPixel(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number): boolean {
        let _loc11_: number = param5 - param3;
        let _loc14_: number = param6 - param4;
        if (param1 < param3 || param2 < param4 || param1 >= param5 || param2 >= param6 || _loc11_ <= 0 || _loc14_ <= 0) {
            return false;
        }
        let _loc9_: number = _loc11_ / 2;
        let _loc7_: number = _loc14_ / 2;
        let _loc13_: number = _loc11_ / 2;
        let _loc12_: number = _loc14_ / 2;
        let _loc8_: number = param1 - param3 + 0.5;
        let _loc10_: number = param2 - param4 + 0.5;
        return Math.abs(_loc8_ - _loc9_) / _loc13_ + Math.abs(_loc10_ - _loc7_) / _loc12_ <= 1;
    }

    private static drawRhombusFill(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number): void {
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        let _loc13_: number = ShapeSkinRenderer.snap(param2);
        let _loc12_: number = ShapeSkinRenderer.snap(param3);
        let _loc11_: number = ShapeSkinRenderer.snap(param2 + param4);
        let _loc7_: number = ShapeSkinRenderer.snap(param3 + param5);
        let _loc8_: number = Math.max(0, _loc13_) | 0;
        let _loc14_: number = Math.max(0, _loc12_) | 0;
        let _loc16_: number = Math.min(param1.width, _loc11_) | 0;
        let _loc15_: number = Math.min(param1.height, _loc7_) | 0;
        if (_loc11_ <= _loc13_ || _loc7_ <= _loc12_) {
            return;
        }
        _loc10_ = _loc14_;
        while (_loc10_ < _loc15_) {
            _loc9_ = _loc8_;
            while (_loc9_ < _loc16_) {
                if (ShapeSkinRenderer.rhombusContainsPixel(_loc9_, _loc10_, _loc13_, _loc12_, _loc11_, _loc7_)) {
                    ShapeSkinRenderer.blendPixel(param1, _loc9_, _loc10_, param6, 1);
                }
                _loc9_++;
            }
            _loc10_++;
        }
    }

    private static drawRhombusStroke(param1: BitmapData, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number): void {
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc16_: number = ShapeSkinRenderer.snap(param2);
        let _loc14_: number = ShapeSkinRenderer.snap(param3);
        let _loc12_: number = ShapeSkinRenderer.snap(param2 + param4);
        let _loc8_: number = ShapeSkinRenderer.snap(param3 + param5);
        let _loc15_: number = ShapeSkinRenderer.snappedThickness(param6);
        let _loc19_: number = _loc16_ + _loc15_;
        let _loc21_: number = _loc14_ + _loc15_;
        let _loc22_: number = _loc12_ - _loc15_;
        let _loc13_: number = _loc8_ - _loc15_;
        let _loc9_: number = Math.max(0, _loc16_) | 0;
        let _loc17_: number = Math.max(0, _loc14_) | 0;
        let _loc20_: number = Math.min(param1.width, _loc12_) | 0;
        let _loc18_: number = Math.min(param1.height, _loc8_) | 0;
        if (_loc15_ <= 0 || _loc12_ <= _loc16_ || _loc8_ <= _loc14_) {
            return;
        }
        _loc11_ = _loc17_;
        while (_loc11_ < _loc18_) {
            _loc10_ = _loc9_;
            while (_loc10_ < _loc20_) {
                if (ShapeSkinRenderer.rhombusContainsPixel(_loc10_, _loc11_, _loc16_, _loc14_, _loc12_, _loc8_) && !ShapeSkinRenderer.rhombusContainsPixel(_loc10_, _loc11_, _loc19_, _loc21_, _loc22_, _loc13_)) {
                    ShapeSkinRenderer.blendPixel(param1, _loc10_, _loc11_, param7, 1);
                }
                _loc10_++;
            }
            _loc11_++;
        }
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc9_: ShapeController = param1 instanceof ShapeController ? param1 : null;
        if (_loc9_ == null || param2 == null || param3 == null || param3.width <= 0 || param3.height <= 0) {
            return;
        }
        let _loc6_: number = ShapeSkinRenderer.snappedThickness(_loc9_.strokeThickness);
        let _loc8_: number = _loc9_.strokeHsvShade != 0 ? HsvLayerColor.deriveColor(param1.color, _loc9_.strokeHsvShade) : _loc9_.strokeColor;
        let _loc7_: Graphics = ShapeSkinRenderer.SHAPE.graphics;
        param2.fillRect(param3, 0);
        if (_loc9_.shape == "round_rectangle") {
            ShapeSkinRenderer.drawRoundRectFill(param2, param3.x, param3.y, param3.width, param3.height, _loc9_.radius, param1.color);
            if (_loc6_ > 0) {
                ShapeSkinRenderer.drawRoundRectStroke(param2, param3.x, param3.y, param3.width, param3.height, _loc9_.radius, _loc6_, _loc8_);
            }
            return;
        }
        if (_loc9_.shape == "rectangle") {
            ShapeSkinRenderer.drawRectFill(param2, param3.x, param3.y, param3.width, param3.height, param1.color);
            if (_loc6_ > 0) {
                ShapeSkinRenderer.drawRectStroke(param2, param3.x, param3.y, param3.width, param3.height, _loc6_, _loc8_);
            }
            return;
        }
        if (_loc9_.shape == "rhombus") {
            ShapeSkinRenderer.drawRhombusFill(param2, param3.x, param3.y, param3.width, param3.height, param1.color);
            if (_loc6_ > 0) {
                ShapeSkinRenderer.drawRhombusStroke(param2, param3.x, param3.y, param3.width, param3.height, _loc6_, _loc8_);
            }
            return;
        }
        _loc7_.clear();
        _loc7_.beginFill((param1.color & 0xFFFFFF) >>> 0, ShapeSkinRenderer.alphaFromColor(param1.color));
        if (_loc6_ > 0) {
            _loc7_.lineStyle(_loc6_, (_loc8_ & 0xFFFFFF) >>> 0, ShapeSkinRenderer.alphaFromColor(_loc8_));
        }
        let _loc10_: string = _loc9_.shape;
        if ("ellipse" !== _loc10_) {
            _loc7_.drawRect(param3.x, param3.y, param3.width, param3.height);
        } else {
            _loc7_.drawEllipse(param3.x + _loc6_ / 2, param3.y + _loc6_ / 2, Math.max(0, param3.width - _loc6_), Math.max(0, param3.height - _loc6_));
        }
        _loc7_.endFill();
        param2.draw(ShapeSkinRenderer.SHAPE, null, null, null, param3);
        _loc7_.clear();
    }

    public override isStateDrawable(param1: number): boolean {
        return true;
    }
}
