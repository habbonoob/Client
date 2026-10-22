import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';

export class HsvLayerColor {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::HsvLayerColor'); }

    constructor() {
    }

    public static configureTransform(param1: ColorTransform, param2: number, param3: number): void {
        let _loc4_: number = HsvLayerColor.deriveColor(param2, param3);
        param1.redMultiplier = ((_loc4_ & 0xFF0000) >> 16) / 255;
        param1.greenMultiplier = ((_loc4_ & 0xFF00) >> 8) / 255;
        param1.blueMultiplier = (_loc4_ & 0xFF) / 255;
        param1.alphaMultiplier = 1;
        param1.redOffset = 0;
        param1.greenOffset = 0;
        param1.blueOffset = 0;
        param1.alphaOffset = 0;
    }

    public static deriveColor(param1: number, param2: number): number {
        if (isNaN(param2)) {
            param2 = 0;
        }
        let _loc3_: number = ((param1 & 0xFF0000) >> 16) / 255;
        let _loc5_: number = ((param1 & 0xFF00) >> 8) / 255;
        let _loc4_: number = (param1 & 0xFF) / 255;
        let _loc6_: any = HsvLayerColor.rgbToHsv(_loc3_, _loc5_, _loc4_);
        let _loc7_: boolean = _loc6_.s == 0;
        if (_loc7_) {
            _loc6_.s = 0;
            _loc6_.v -= param2;
        } else {
            _loc6_.s = HsvLayerColor.clamp01(Number(_loc6_.s + param2));
            _loc6_.v = HsvLayerColor.clamp01(_loc6_.v - param2 / 2);
        }
        return HsvLayerColor.hsvToRgb(Number(_loc6_.h), Number(_loc6_.s), Number(_loc6_.v));
    }

    private static rgbToHsv(param1: number, param2: number, param3: number): any {
        let _loc6_: number = Math.max(param1, Math.max(param2, param3));
        let _loc4_: number = Math.min(param1, Math.min(param2, param3));
        let _loc7_: number = _loc6_ - _loc4_;
        let _loc8_: number = 0;
        let _loc5_: number = _loc6_ == 0 ? 0 : _loc7_ / _loc6_;
        if (_loc7_ != 0) {
            if (_loc6_ == param1) {
                _loc8_ = (param2 - param3) / _loc7_;
                if (param2 < param3) {
                    _loc8_ += 6;
                }
            } else if (_loc6_ == param2) {
                _loc8_ = (param3 - param1) / _loc7_ + 2;
            } else {
                _loc8_ = (param1 - param2) / _loc7_ + 4;
            }
            _loc8_ /= 6;
        }
        return { "h": _loc8_, "s": _loc5_, "v": _loc6_ };
    }

    private static hsvToRgb(param1: number, param2: number, param3: number): number {
        param1 -= Math.floor(param1);
        if (param2 == 0) {
            return HsvLayerColor.toColor(param3, param3, param3);
        }
        let _loc9_: number = param1 * 6;
        let _loc8_: number = Math.floor(_loc9_) | 0;
        let _loc7_: number = _loc9_ - _loc8_;
        let _loc4_: number = param3 * (1 - param2);
        let _loc5_: number = param3 * (1 - param2 * _loc7_);
        let _loc6_: number = param3 * (1 - param2 * (1 - _loc7_));
        switch (_loc8_ % 6) {
            case 0:
                return HsvLayerColor.toColor(param3, _loc6_, _loc4_);
            case 1:
                return HsvLayerColor.toColor(_loc5_, param3, _loc4_);
            case 2:
                return HsvLayerColor.toColor(_loc4_, param3, _loc6_);
            case 3:
                return HsvLayerColor.toColor(_loc4_, _loc5_, param3);
            case 4:
                return HsvLayerColor.toColor(_loc6_, _loc4_, param3);
            default:
                return HsvLayerColor.toColor(param3, _loc4_, _loc5_);
        }
    }

    private static toColor(param1: number, param2: number, param3: number): number {
        return (HsvLayerColor.toByte(param1) << 16 | HsvLayerColor.toByte(param2) << 8 | HsvLayerColor.toByte(param3)) >>> 0;
    }

    private static toByte(param1: number): number {
        return Math.round(HsvLayerColor.clamp01(param1) * 255) >>> 0;
    }

    private static clamp01(param1: number): number {
        if (isNaN(param1) || param1 < 0) {
            return 0;
        }
        if (param1 > 1) {
            return 1;
        }
        return param1;
    }
}
