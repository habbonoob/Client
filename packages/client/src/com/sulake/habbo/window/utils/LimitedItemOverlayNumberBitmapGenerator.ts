import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';

export class LimitedItemOverlayNumberBitmapGenerator {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::LimitedItemOverlayNumberBitmapGenerator'); }

    private static readonly GLYPH_ASSET_PREFIX: string = "unique_item_number_glyph_";

    public static createBitmap(param1: IAssetLibrary, param2: number, param3: number, param4: number): BitmapData {
        let _loc16_: BitmapDataAsset = null;
        let _loc7_: number = 0;
        let _loc10_: BitmapData = new BitmapData(param3, param4, true, 0);
        if (param2 < 0 || param2 > 999999) {
            return _loc10_;
        }
        let _loc13_: number = param2 % 10;
        let _loc5_: number = param2 / 10 % 10 | 0;
        let _loc15_: number = param2 / 100 % 10 | 0;
        let _loc8_: number = param2 / 1000 % 10 | 0;
        let _loc14_: number = param2 / 10000 % 10 | 0;
        let _loc6_: number = param2 / 100000 % 10 | 0;
        let _loc11_: any[] = [];
        let _loc12_: number = 0;
        if (_loc6_ > 0) {
            _loc16_ = castTo(param1.getAssetByName("unique_item_number_glyph_" + _loc6_), BitmapDataAsset);
            _loc11_.push(_loc16_);
            _loc12_ = _loc12_ + _loc16_.rectangle.width | 0;
        }
        if (_loc6_ > 0 || _loc14_ > 0) {
            _loc16_ = castTo(param1.getAssetByName("unique_item_number_glyph_" + _loc14_), BitmapDataAsset);
            _loc11_.push(_loc16_);
            _loc12_ = _loc12_ + _loc16_.rectangle.width | 0;
        }
        if (_loc6_ > 0 || _loc14_ > 0 || _loc8_ > 0) {
            _loc16_ = castTo(param1.getAssetByName("unique_item_number_glyph_" + _loc8_), BitmapDataAsset);
            _loc11_.push(_loc16_);
            _loc12_ = _loc12_ + _loc16_.rectangle.width | 0;
        }
        if (_loc6_ > 0 || _loc14_ > 0 || _loc8_ > 0 || _loc15_ > 0) {
            _loc16_ = castTo(param1.getAssetByName("unique_item_number_glyph_" + _loc15_), BitmapDataAsset);
            _loc11_.push(_loc16_);
            _loc12_ = _loc12_ + _loc16_.rectangle.width | 0;
        }
        if (_loc6_ > 0 || _loc14_ > 0 || _loc8_ > 0 || _loc15_ > 0 || _loc5_ > 0) {
            _loc16_ = castTo(param1.getAssetByName("unique_item_number_glyph_" + _loc5_), BitmapDataAsset);
            _loc11_.push(_loc16_);
            _loc12_ = _loc12_ + _loc16_.rectangle.width | 0;
        }
        _loc16_ = castTo(param1.getAssetByName("unique_item_number_glyph_" + _loc13_), BitmapDataAsset);
        _loc11_.push(_loc16_);
        _loc12_ = _loc12_ + _loc16_.rectangle.width | 0;
        _loc12_ = _loc12_ - 1;
        let _loc9_: Point = new Point((param3 - _loc12_) / 2, 0);
        while (_loc7_ < _loc11_.length) {
            _loc16_ = _loc11_[_loc7_];
            _loc10_.copyPixels(castTo(_loc16_.content, BitmapData), _loc16_.rectangle, _loc9_);
            _loc9_.x += _loc16_.rectangle.width;
            _loc7_++;
        }
        return _loc10_;
    }

    constructor() {
    }
}
