import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxColorUtils {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxColorUtils'); }

    constructor() {
    }

    public static scaleRgbValueInHsv(param1: number, param2: number): number {
        let _loc9_: number = VariableFxColorUtils.channelFromRgb(param1, 16) / 255;
        let _loc3_: number = VariableFxColorUtils.channelFromRgb(param1, 8) / 255;
        let _loc13_: number = VariableFxColorUtils.channelFromRgb(param1, 0) / 255;
        let _loc4_: number = Number(Math.max(_loc9_, _loc3_, _loc13_));
        let _loc12_: number = Number(Math.min(_loc9_, _loc3_, _loc13_));
        let _loc5_: number = _loc4_ - _loc12_;
        let _loc15_: number = (VariableFxColorUtils.resolveHue(_loc9_, _loc3_, _loc13_, _loc4_, _loc5_) % 360 + 360) % 360;
        let _loc10_: number = _loc4_ == 0 ? 0 : _loc5_ / _loc4_;
        let _loc16_: number = Number(Math.max(0, Math.min(1, _loc4_ * param2)));
        let _loc6_: number = _loc16_ * _loc10_;
        let _loc14_: number = _loc15_ / 60;
        let _loc8_: number = _loc6_ * (1 - Math.abs(_loc14_ % 2 - 1));
        let _loc7_: number = _loc16_ - _loc6_;
        let _loc11_: any[] = VariableFxColorUtils.resolveRgbFromHueSection(_loc14_, _loc6_, _loc8_);
        return VariableFxColorUtils.rgbFromChannels(Math.floor((_loc11_[0] + _loc7_) * 255) | 0, Math.floor((_loc11_[1] + _loc7_) * 255) | 0, Math.floor((_loc11_[2] + _loc7_) * 255) | 0);
    }

    public static blendVariableFxPixel(param1: number, param2: number, param3: string, param4: number): number {
        let _loc17_: number = NaN;
        let _loc13_: number = NaN;
        let _loc18_: number = NaN;
        let _loc16_: number = NaN;
        let _loc20_: number = param1 >>> 24 & 0xFF;
        let _loc8_: number = param1 >>> 16 & 0xFF;
        let _loc12_: number = param1 >>> 8 & 0xFF;
        let _loc6_: number = param1 & 0xFF;
        let _loc9_: number = param2 >>> 24 & 0xFF;
        let _loc14_: number = param2 >>> 16 & 0xFF;
        let _loc10_: number = param2 >>> 8 & 0xFF;
        let _loc11_: number = param2 & 0xFF;
        let _loc5_: number = _loc9_ * VariableFxColorUtils.clampByte(param4) / 255;
        let _loc19_: number = _loc14_;
        let _loc7_: number = _loc10_;
        let _loc15_: number = _loc11_;
        if (_loc5_ <= 0) {
            return param1;
        }
        _loc17_ = _loc5_ / 255;
        _loc13_ = _loc20_ / 255;
        _loc18_ = _loc17_ + _loc13_ * (1 - _loc17_);
        if (_loc18_ <= 0) {
            return 0;
        }
        if (param3 == "multiply") {
            _loc19_ = VariableFxColorUtils.multiplyRgb(_loc14_, _loc8_);
            _loc7_ = VariableFxColorUtils.multiplyRgb(_loc10_, _loc12_);
            _loc15_ = VariableFxColorUtils.multiplyRgb(_loc11_, _loc6_);
        } else if (param3 == "add") {
            _loc19_ = Math.min(255, _loc14_ + _loc8_) | 0;
            _loc7_ = Math.min(255, _loc10_ + _loc12_) | 0;
            _loc15_ = Math.min(255, _loc11_ + _loc6_) | 0;
        }
        _loc16_ = _loc13_ * (1 - _loc17_);
        return (VariableFxColorUtils.clampByte(Math.round(_loc18_ * 255)) << 24 | VariableFxColorUtils.clampByte(Math.round((_loc19_ * _loc17_ + _loc8_ * _loc16_) / _loc18_)) << 16 | VariableFxColorUtils.clampByte(Math.round((_loc7_ * _loc17_ + _loc12_ * _loc16_) / _loc18_)) << 8 | VariableFxColorUtils.clampByte(Math.round((_loc15_ * _loc17_ + _loc6_ * _loc16_) / _loc18_))) >>> 0;
    }

    private static multiplyRgb(param1: number, param2: number): number {
        return VariableFxColorUtils.clampByte(Math.round(VariableFxColorUtils.clampByte(param1) * VariableFxColorUtils.clampByte(param2) / 255));
    }

    private static clampByte(param1: number): number {
        if (param1 <= 0) {
            return 0;
        }
        if (param1 >= 255) {
            return 255;
        }
        return param1 | 0;
    }

    private static channelFromRgb(param1: number, param2: number): number {
        return param1 >>> param2 & 0xFF;
    }

    private static rgbFromChannels(param1: number, param2: number, param3: number): number {
        return (VariableFxColorUtils.clampByte(param1) << 16 | VariableFxColorUtils.clampByte(param2) << 8 | VariableFxColorUtils.clampByte(param3)) >>> 0;
    }

    private static resolveHue(param1: number, param2: number, param3: number, param4: number, param5: number): number {
        if (param5 == 0) {
            return 0;
        }
        if (param4 == param1) {
            return 60 * ((param2 - param3) / param5 % 6);
        }
        if (param4 == param2) {
            return 60 * ((param3 - param1) / param5 + 2);
        }
        return 60 * ((param1 - param2) / param5 + 4);
    }

    private static resolveRgbFromHueSection(param1: number, param2: number, param3: number): any[] {
        if (param1 < 1) {
            return [param2, param3, 0];
        }
        if (param1 < 2) {
            return [param3, param2, 0];
        }
        if (param1 < 3) {
            return [0, param2, param3];
        }
        if (param1 < 4) {
            return [0, param3, param2];
        }
        if (param1 < 5) {
            return [param3, 0, param2];
        }
        return [param2, 0, param3];
    }
}
