import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export class BitmapDataUtil {
    static { registerClassName(this, 'com.sulake.room.utils::BitmapDataUtil'); }

    constructor() {
    }

    public static line(param1: BitmapData, param2: Point, param3: Point, param4: number): void {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        let _loc12_: number = 0;
        let _loc11_: number = 0;
        let _loc10_: number = 0;
        let _loc7_: number = param2.x | 0;
        let _loc9_: number = param2.y | 0;
        _loc5_ = param3.x - param2.x | 0;
        _loc6_ = param3.y - param2.y | 0;
        _loc12_ = _loc5_ > 0 ? 1 : -1;
        _loc11_ = _loc6_ > 0 ? 1 : -1;
        _loc5_ = Math.abs(_loc5_) | 0;
        _loc6_ = Math.abs(_loc6_) | 0;
        param1.lock();
        param1.setPixel32(_loc7_, _loc9_, param4 >>> 0);
        if (_loc5_ == 0 && _loc6_ == 0) {
            return;
        }
        if (_loc5_ > _loc6_) {
            _loc8_ = _loc5_ - 1;
            while (_loc8_ >= 0) {
                _loc10_ += _loc6_;
                _loc7_ += _loc12_;
                if (_loc10_ >= _loc5_ / 2) {
                    _loc10_ -= _loc5_;
                    _loc9_ += _loc11_;
                }
                param1.setPixel32(_loc7_, _loc9_, param4 >>> 0);
                _loc8_--;
            }
        } else {
            _loc8_ = _loc6_ - 1;
            while (_loc8_ >= 0) {
                _loc10_ += _loc5_;
                _loc9_ += _loc11_;
                if (_loc10_ >= _loc6_ / 2) {
                    _loc10_ -= _loc6_;
                    _loc7_ += _loc12_;
                }
                param1.setPixel32(_loc7_, _loc9_, param4 >>> 0);
                _loc8_--;
            }
        }
        param1.setPixel32(param3.x | 0, param3.y | 0, param4 >>> 0);
        param1.unlock();
    }

    public static getFlipHBitmapData(param1: BitmapData): BitmapData {
        if (param1 == null) {
            return null;
        }
        let _loc2_: BitmapData = null;
        _loc2_ = new BitmapData(param1.width, param1.height, true, 16777215);
        let _loc3_: Matrix = new Matrix();
        _loc3_.scale(-1, 1);
        _loc3_.translate(param1.width, 0);
        _loc2_.draw(param1, _loc3_);
        return _loc2_;
    }

    public static getFlipVBitmapData(param1: BitmapData): BitmapData {
        if (param1 == null) {
            return null;
        }
        let _loc2_: BitmapData = null;
        _loc2_ = new BitmapData(param1.width, param1.height, true, 16777215);
        let _loc3_: Matrix = new Matrix();
        _loc3_.scale(1, -1);
        _loc3_.translate(0, param1.height);
        _loc2_.draw(param1, _loc3_);
        return _loc2_;
    }

    public static getFlipHVBitmapData(param1: BitmapData): BitmapData {
        if (param1 == null) {
            return null;
        }
        let _loc2_: BitmapData = null;
        _loc2_ = new BitmapData(param1.width, param1.height, true, 16777215);
        let _loc3_: Matrix = new Matrix();
        _loc3_.scale(-1, -1);
        _loc3_.translate(param1.width, param1.height);
        _loc2_.draw(param1, _loc3_);
        return _loc2_;
    }
}
