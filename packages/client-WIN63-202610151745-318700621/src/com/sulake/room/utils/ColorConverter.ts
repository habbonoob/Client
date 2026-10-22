import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ColorConverter {
    static { registerClassName(this, 'com.sulake.room.utils::ColorConverter'); }

    constructor() {
    }

    public static rgbToHSL(param1: number): number {
        let _loc10_: number = (param1 >> 16 & 0xFF) / 255;
        let _loc6_: number = (param1 >> 8 & 0xFF) / 255;
        let _loc4_: number = (param1 & 0xFF) / 255;
        let _loc5_: number = Number(Math.max(_loc10_, _loc6_, _loc4_));
        let _loc11_: number = Number(Math.min(_loc10_, _loc6_, _loc4_));
        let _loc2_: number = _loc5_ - _loc11_;
        let _loc14_: number = 0;
        let _loc13_: number = 0;
        let _loc9_: number = 0;
        if (_loc2_ == 0) {
            _loc14_ = 0;
        } else if (_loc5_ == _loc10_) {
            if (_loc6_ > _loc4_) {
                _loc14_ = 60 * (_loc6_ - _loc4_) / _loc2_;
            } else {
                _loc14_ = 60 * (_loc6_ - _loc4_) / _loc2_ + 360;
            }
        } else if (_loc5_ == _loc6_) {
            _loc14_ = 60 * (_loc4_ - _loc10_) / _loc2_ + 120;
        } else if (_loc5_ == _loc4_) {
            _loc14_ = 60 * (_loc10_ - _loc6_) / _loc2_ + 240;
        }
        _loc13_ = 0.5 * (_loc5_ + _loc11_);
        if (_loc2_ == 0) {
            _loc9_ = 0;
        } else if (_loc13_ <= 0.5) {
            _loc9_ = _loc2_ / _loc13_ * 0.5;
        } else {
            _loc9_ = _loc2_ / (1 - _loc13_) * 0.5;
        }
        let _loc7_: number = Math.round(_loc14_ / 360 * 255) | 0;
        let _loc12_: number = Math.round(_loc9_ * 255) | 0;
        let _loc8_: number = Math.round(_loc13_ * 255) | 0;
        return (_loc7_ << 16) + (_loc12_ << 8) + _loc8_ >>> 0;
    }

    public static hslToRGB(param1: number): number {
        let _loc12_: number = NaN;
        let _loc11_: number = NaN;
        let _loc6_: number = NaN;
        let _loc16_: number = NaN;
        let _loc8_: number = NaN;
        let _loc5_: number = (param1 >> 16 & 0xFF) / 255;
        let _loc14_: number = (param1 >> 8 & 0xFF) / 255;
        let _loc7_: number = (param1 & 0xFF) / 255;
        let _loc10_: number = 0;
        let _loc3_: number = 0;
        let _loc15_: number = 0;
        if (_loc14_ > 0) {
            _loc12_ = 0;
            _loc11_ = 0;
            if (_loc7_ < 0.5) {
                _loc12_ = _loc7_ * (1 + _loc14_);
            } else {
                _loc12_ = _loc7_ + _loc14_ - _loc7_ * _loc14_;
            }
            _loc11_ = 2 * _loc7_ - _loc12_;
            _loc6_ = _loc5_ + 0.3333333333333333;
            _loc16_ = _loc5_;
            _loc8_ = _loc5_ - 0.3333333333333333;
            if (_loc6_ < 0) {
                _loc6_ += 1;
            } else if (_loc6_ > 1) {
                _loc6_ -= 1;
            }
            if (_loc16_ < 0) {
                _loc16_ += 1;
            } else if (_loc16_ > 1) {
                _loc16_ -= 1;
            }
            if (_loc8_ < 0) {
                _loc8_ += 1;
            } else if (_loc8_ > 1) {
                _loc8_ -= 1;
            }
            if (_loc6_ * 6 < 1) {
                _loc10_ = _loc11_ + (_loc12_ - _loc11_) * 6 * _loc6_;
            } else if (_loc6_ * 2 < 1) {
                _loc10_ = _loc12_;
            } else if (_loc6_ * 3 < 2) {
                _loc10_ = _loc11_ + (_loc12_ - _loc11_) * 6 * (0.6666666666666666 - _loc6_);
            } else {
                _loc10_ = _loc11_;
            }
            if (_loc16_ * 6 < 1) {
                _loc3_ = _loc11_ + (_loc12_ - _loc11_) * 6 * _loc16_;
            } else if (_loc16_ * 2 < 1) {
                _loc3_ = _loc12_;
            } else if (_loc16_ * 3 < 2) {
                _loc3_ = _loc11_ + (_loc12_ - _loc11_) * 6 * (0.6666666666666666 - _loc16_);
            } else {
                _loc3_ = _loc11_;
            }
            if (_loc8_ * 6 < 1) {
                _loc15_ = _loc11_ + (_loc12_ - _loc11_) * 6 * _loc8_;
            } else if (_loc8_ * 2 < 1) {
                _loc15_ = _loc12_;
            } else if (_loc8_ * 3 < 2) {
                _loc15_ = _loc11_ + (_loc12_ - _loc11_) * 6 * (0.6666666666666666 - _loc8_);
            } else {
                _loc15_ = _loc11_;
            }
        } else {
            _loc10_ = _loc7_;
            _loc3_ = _loc7_;
            _loc15_ = _loc7_;
        }
        let _loc13_: number = Math.round(_loc10_ * 255) | 0;
        let _loc4_: number = Math.round(_loc3_ * 255) | 0;
        let _loc2_: number = Math.round(_loc15_ * 255) | 0;
        return (_loc13_ << 16) + (_loc4_ << 8) + _loc2_ >>> 0;
    }

    public static rgb2xyz(param1: number): IVector3d {
        let _loc2_: number = (param1 >> 16 & 0xFF) / 255;
        let _loc4_: number = (param1 >> 8 & 0xFF) / 255;
        let _loc3_: number = (param1 >> 0 & 0xFF) / 255;
        if (_loc2_ > 0.04045) {
            _loc2_ = Number(Math.pow((_loc2_ + 0.055) / 1.055, 2.4));
        } else {
            _loc2_ /= 12.92;
        }
        if (_loc4_ > 0.04045) {
            _loc4_ = Number(Math.pow((_loc4_ + 0.055) / 1.055, 2.4));
        } else {
            _loc4_ /= 12.92;
        }
        if (_loc3_ > 0.04045) {
            _loc3_ = Number(Math.pow((_loc3_ + 0.055) / 1.055, 2.4));
        } else {
            _loc3_ /= 12.92;
        }
        _loc2_ *= 100;
        _loc4_ *= 100;
        _loc3_ *= 100;
        return new Vector3d(_loc2_ * 0.4124 + _loc4_ * 0.3576 + _loc3_ * 0.1805, _loc2_ * 0.2126 + _loc4_ * 0.7152 + _loc3_ * 0.0722, _loc2_ * 0.0193 + _loc4_ * 0.1192 + _loc3_ * 0.9505);
    }

    public static xyz2CieLab(param1: IVector3d): IVector3d {
        let _loc2_: number = param1.x / 95.047;
        let _loc3_: number = param1.y / 100;
        let _loc4_: number = param1.z / 108.883;
        if (_loc2_ > 0.008856) {
            _loc2_ = Number(Math.pow(_loc2_, 0.3333333333333333));
        } else {
            _loc2_ = 7.787 * _loc2_ + 0.13793103448275862;
        }
        if (_loc3_ > 0.008856) {
            _loc3_ = Number(Math.pow(_loc3_, 0.3333333333333333));
        } else {
            _loc3_ = 7.787 * _loc3_ + 0.13793103448275862;
        }
        if (_loc4_ > 0.008856) {
            _loc4_ = Number(Math.pow(_loc4_, 0.3333333333333333));
        } else {
            _loc4_ = 7.787 * _loc4_ + 0.13793103448275862;
        }
        return new Vector3d(116 * _loc3_ - 16, 500 * (_loc2_ - _loc3_), 200 * (_loc3_ - _loc4_));
    }

    public static rgb2CieLab(param1: number): IVector3d {
        return ColorConverter.xyz2CieLab(ColorConverter.rgb2xyz(param1));
    }

    public static hexToUint(param1: string): number {
        param1 = param1.replace(/^#/, "");
        return Number("0x" + param1) >>> 0;
    }
}
