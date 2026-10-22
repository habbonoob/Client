import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GridLineInterpolation {
    static { registerClassName(this, 'com.sulake.room.utils::GridLineInterpolation'); }

    constructor() {
    }

    private static interpolationPointsLow(param1: number, param2: number, param3: number, param4: number): any[] {
        let _loc10_: number = 0;
        let _loc5_: any[] = [];
        let _loc7_: number = param3 - param1;
        let _loc9_: number = param4 - param2;
        let _loc6_: number = 1;
        if (_loc9_ < 0) {
            _loc6_ = -1;
            _loc9_ = -_loc9_;
        }
        let _loc8_: number = 2 * _loc9_ - _loc7_;
        let _loc11_: number = param2;
        _loc10_ = param1;
        while (_loc10_ <= param3) {
            _loc5_.push({ "x": _loc10_, "y": _loc11_ });
            if (_loc8_ > 0) {
                _loc11_ += _loc6_;
                _loc8_ += 2 * (_loc9_ - _loc7_);
            } else {
                _loc8_ += 2 * _loc9_;
            }
            _loc10_++;
        }
        return _loc5_;
    }

    private static interpolationPointsHigh(param1: number, param2: number, param3: number, param4: number): any[] {
        let _loc11_: number = 0;
        let _loc5_: any[] = [];
        let _loc7_: number = param3 - param1;
        let _loc9_: number = param4 - param2;
        let _loc6_: number = 1;
        if (_loc7_ < 0) {
            _loc6_ = -1;
            _loc7_ = -_loc7_;
        }
        let _loc8_: number = 2 * _loc7_ - _loc9_;
        let _loc10_: number = param1;
        _loc11_ = param2;
        while (_loc11_ <= param4) {
            _loc5_.push({ "x": _loc10_, "y": _loc11_ });
            if (_loc8_ > 0) {
                _loc10_ += _loc6_;
                _loc8_ += 2 * (_loc7_ - _loc9_);
            } else {
                _loc8_ += 2 * _loc7_;
            }
            _loc11_++;
        }
        return _loc5_;
    }

    public static interpolationPoints(param1: number, param2: number, param3: number, param4: number): any[] {
        if (Math.abs(param4 - param2) < Math.abs(param3 - param1)) {
            if (param1 > param3) {
                return GridLineInterpolation.interpolationPointsLow(param3, param4, param1, param2);
            }
            return GridLineInterpolation.interpolationPointsLow(param1, param2, param3, param4);
        }
        if (param2 > param4) {
            return GridLineInterpolation.interpolationPointsHigh(param3, param4, param1, param2);
        }
        return GridLineInterpolation.interpolationPointsHigh(param1, param2, param3, param4);
    }
}
