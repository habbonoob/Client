import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';

export class BitmapHelper {
    static { registerClassName(this, 'com.sulake.habbo.utils::BitmapHelper'); }

    constructor() {
    }

    private static resizeBitmapData(param1: BitmapData, param2: number): BitmapData {
        let _loc3_: BitmapData = new BitmapData(Math.round(param1.width * param2) | 0, Math.round(param1.height * param2) | 0, true, 16777215);
        let _loc4_: Matrix = new Matrix(_loc3_.width / param1.width, 0, 0, _loc3_.height / param1.height, 0, 0);
        _loc3_.draw(param1, _loc4_, null, null, null, true);
        return _loc3_;
    }

    public static resampleBitmapData(param1: BitmapData, param2: number): BitmapData {
        let _loc3_: BitmapData = null;
        let _loc4_: number = NaN;
        if (param2 >= 1) {
            return BitmapHelper.resizeBitmapData(param1, param2);
        }
        _loc3_ = param1.clone();
        _loc4_ = 1;
        do {
            if (param2 < 0.5 * _loc4_) {
                _loc3_ = BitmapHelper.resizeBitmapData(_loc3_, 0.5);
                _loc4_ = 0.5 * _loc4_;
            } else {
                _loc3_ = BitmapHelper.resizeBitmapData(_loc3_, param2 / _loc4_);
                _loc4_ = param2;
            }
        } while (_loc4_ != param2);
        return _loc3_;
    }
}
