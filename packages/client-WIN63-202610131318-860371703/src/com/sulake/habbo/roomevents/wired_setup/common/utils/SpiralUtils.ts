import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class SpiralUtils {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.utils::SpiralUtils'); }

    constructor() {
    }

    public static parseSpiralVector(param1: any[], param2: number): any[] {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: any = null;
        let _loc4_: any[] = SpiralUtils.intParamsToBoolMask(param1);
        let _loc9_: number = param2 * 2 + 1;
        let _loc3_: any[] = [];
        _loc6_ = 0;
        while (_loc6_ < _loc9_) {
            _loc3_[_loc6_] = [];
            _loc7_ = 0;
            while (_loc7_ < _loc9_) {
                _loc3_[_loc6_][_loc7_] = false;
                _loc7_++;
            }
            _loc6_++;
        }
        let _loc5_: any[] = SpiralUtils.walkSpiral(param2);
        _loc6_ = 0;
        while (_loc6_ < _loc5_.length) {
            _loc8_ = _loc5_[_loc6_];
            if (_loc8_.rank < _loc4_.length && _loc4_[_loc8_.rank]) {
                _loc3_[_loc8_.x + param2][_loc8_.y + param2] = true;
            }
            _loc6_++;
        }
        return _loc3_;
    }

    public static createSpiralVector(param1: any[], param2: number): any[] {
        let _loc6_: number = 0;
        let _loc7_: any = null;
        let _loc8_: number = param2 * 2 + 1;
        let _loc3_: number = _loc8_ * _loc8_;
        let _loc4_: any[] = [];
        _loc6_ = 0;
        while (_loc6_ < _loc3_) {
            _loc4_.push(false);
            _loc6_++;
        }
        let _loc5_: any[] = SpiralUtils.walkSpiral(param2);
        _loc6_ = 0;
        while (_loc6_ < _loc5_.length) {
            _loc7_ = _loc5_[_loc6_];
            if (param1[_loc7_.x + param2][_loc7_.y + param2]) {
                _loc4_[_loc7_.rank] = true;
            }
            _loc6_++;
        }
        return SpiralUtils.boolMaskToIntParams(_loc4_);
    }

    private static walkSpiral(param1: number): any[] {
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        let _loc11_: number = param1 * 2 + 1;
        let _loc3_: number = _loc11_ * _loc11_;
        let _loc2_: any[] = [];
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc10_: any[] = [1, 0];
        _loc4_ = 1;
        while (_loc4_ <= _loc11_) {
            _loc8_ = 0;
            while (_loc8_ < 2) {
                _loc9_ = 0;
                while (_loc9_ < _loc4_) {
                    _loc2_.push({ "rank": _loc6_, "x": _loc5_, "y": _loc7_ });
                    _loc5_ = _loc5_ + _loc10_[0] | 0;
                    _loc7_ = _loc7_ + _loc10_[1] | 0;
                    _loc6_ += 1;
                    if (_loc6_ == _loc3_) {
                        return _loc2_;
                    }
                    _loc9_++;
                }
                _loc10_ = SpiralUtils.nextDirection(_loc10_);
                _loc8_++;
            }
            _loc4_++;
        }
        return _loc2_;
    }

    private static nextDirection(param1: any[]): any[] {
        if (param1[0] == 0 && param1[1] == -1) {
            return [-1, 0];
        }
        if (param1[0] == 1 && param1[1] == 0) {
            return [0, -1];
        }
        if (param1[0] == 0 && param1[1] == 1) {
            return [1, 0];
        }
        return [0, 1];
    }

    private static intParamsToBoolMask(param1: any[]): any[] {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: ByteArray = new ByteArray();
        _loc4_.endian = "littleEndian";
        _loc5_ = 0;
        while (_loc5_ < param1.length) {
            _loc4_.writeInt(param1[_loc5_] | 0);
            _loc5_++;
        }
        _loc4_.position = 0;
        let _loc2_: any[] = [];
        while (_loc4_.bytesAvailable) {
            _loc3_ = _loc4_.readByte();
            _loc5_ = 0;
            while (_loc5_ < 8) {
                _loc2_.push((_loc3_ & 1 << _loc5_) > 0);
                _loc5_++;
            }
        }
        return _loc2_;
    }

    private static boolMaskToIntParams(param1: any[]): any[] {
        let _loc6_: number = 0;
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: ByteArray = new ByteArray();
        _loc4_.endian = "littleEndian";
        let _loc5_: number = 0;
        while (_loc5_ < param1.length) {
            _loc6_ = 0;
            while (_loc6_ < 4) {
                _loc3_ = 0;
                _loc7_ = 0;
                while (_loc7_ < 8) {
                    if (_loc5_ < param1.length && param1[_loc5_]) {
                        _loc3_ |= 1 << _loc7_;
                    }
                    _loc5_ += 1;
                    _loc7_++;
                }
                _loc4_.writeByte(_loc3_);
                _loc6_++;
            }
        }
        _loc4_.position = 0;
        let _loc2_: any[] = [];
        while (_loc4_.bytesAvailable >= 4) {
            _loc2_.push(_loc4_.readInt());
        }
        return _loc2_;
    }
}
