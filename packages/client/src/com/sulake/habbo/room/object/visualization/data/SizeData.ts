import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ColorData } from '@/com/sulake/habbo/room/object/visualization/data/ColorData';
import { DirectionData } from '@/com/sulake/habbo/room/object/visualization/data/DirectionData';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class SizeData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::SizeData'); }

    public static readonly LAYER_LIMIT: number = 1000;
    public static readonly DEFAULT_DIRECTION: number = 0;

    constructor(param1: number, param2: number) {
        if (param1 < 0) {
            param1 = 0;
        }
        if (param1 > 1000) {
            param1 = 1000;
        }
        this._layerCount = param1;
        if (param2 < 1) {
            param2 = 1;
        }
        if (param2 > 360) {
            param2 = 360;
        }
        this._SafeStr_4879 = param2;
        this._SafeStr_3400 = new DirectionData(param1);
        this._directions = new UtilsMap();
        this._colors = new UtilsMap();
    }

    private _layerCount: number = 0;
    private _SafeStr_4879: number = 360;
    private _SafeStr_3400: DirectionData = null;

    declare private _directions: UtilsMap;

    declare private _colors: UtilsMap;

    private _SafeStr_3492: DirectionData = null;
    private _SafeStr_5382: number = -1;

    public get layerCount(): number {
        return this._layerCount;
    }

    public dispose(): void {
        let _loc3_: DirectionData = null;
        let _loc1_: ColorData = null;
        if (this._SafeStr_3400 != null) {
            this._SafeStr_3400.dispose();
            this._SafeStr_3400 = null;
        }
        let _loc2_: number = 0;
        if (this._directions != null) {
            _loc3_ = null;
            _loc2_ = 0;
            while (_loc2_ < this._directions.length) {
                _loc3_ = asInstanceOf(this._directions.getWithIndex(_loc2_), DirectionData);
                if (_loc3_ != null) {
                    _loc3_.dispose();
                }
                _loc2_++;
            }
            this._directions.dispose();
            this._directions = null;
        }
        this._SafeStr_3492 = null;
        if (this._colors != null) {
            _loc1_ = null;
            _loc2_ = 0;
            while (_loc2_ < this._colors.length) {
                _loc1_ = asInstanceOf(this._colors.getWithIndex(_loc2_), ColorData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._colors.dispose();
            this._colors = null;
        }
    }

    public defineLayers(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: XMLList = param1.child("layer");
        return this.defineDirection(this._SafeStr_3400, _loc2_);
    }

    public defineDirections(param1: XML): boolean {
        let _loc3_: number = 0;
        let _loc8_: XML = null;
        let _loc7_: number = 0;
        let _loc4_: XMLList = null;
        if (param1 == null) {
            return false;
        }
        let _loc2_: any[] = ["id"];
        let _loc5_: DirectionData = null;
        let _loc6_: XMLList = param1.child("direction");
        _loc3_ = 0;
        while (_loc3_ < _loc6_.length()) {
            _loc8_ = _loc6_.item(_loc3_);
            if (!XMLValidator.checkRequiredAttributes(_loc8_, _loc2_)) {
                return false;
            }
            _loc7_ = Number(_loc8_.attribute("id")) | 0;
            _loc4_ = _loc8_.child("layer");
            if (this._directions.getValue(String(_loc7_)) != null) {
                return false;
            }
            _loc5_ = new DirectionData(this.layerCount);
            _loc5_.copyValues(this._SafeStr_3400);
            this.defineDirection(_loc5_, _loc4_);
            this._directions.add(String(_loc7_), _loc5_);
            this._SafeStr_5382 = -1;
            this._SafeStr_3492 = null;
            _loc3_++;
        }
        return true;
    }

    public defineColors(param1: XML): boolean {
        let _loc6_: number = 0;
        let _loc3_: XML = null;
        let _loc13_: string = null;
        let _loc10_: XMLList = null;
        let _loc7_: number = 0;
        let _loc4_: XML = null;
        let _loc9_: number = 0;
        let _loc12_: number = 0;
        if (param1 == null) {
            return true;
        }
        let _loc5_: ColorData = null;
        let _loc11_: any[] = ["id"];
        let _loc2_: any[] = ["id", "color"];
        let _loc8_: XMLList = param1.child("color");
        _loc6_ = 0;
        while (_loc6_ < _loc8_.length()) {
            _loc3_ = _loc8_.item(_loc6_);
            if (!XMLValidator.checkRequiredAttributes(_loc3_, _loc11_)) {
                return false;
            }
            _loc13_ = _loc3_.attribute("id").toString();
            if (this._colors.getValue(_loc13_) != null) {
                return false;
            }
            _loc5_ = new ColorData(this.layerCount);
            _loc10_ = _loc3_.child("colorLayer");
            _loc7_ = 0;
            while (_loc7_ < _loc10_.length()) {
                _loc4_ = _loc10_.item(_loc7_);
                if (!XMLValidator.checkRequiredAttributes(_loc4_, _loc2_)) {
                    _loc5_.dispose();
                    return false;
                }
                _loc9_ = Number(_loc4_.attribute("id")) | 0;
                _loc12_ = parseInt(_loc4_.attribute("color").toString(), 16) | 0;
                _loc5_.setColor(_loc12_ >>> 0, _loc9_);
                _loc7_++;
            }
            if (_loc5_ != null) {
                this._colors.add(_loc13_, _loc5_);
            }
            _loc6_++;
        }
        return true;
    }

    public getDirectionValue(param1: number): number {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = (param1 % 360 + 360 + this._SafeStr_4879 / 2) % 360 / this._SafeStr_4879 | 0;
        if (this._directions.getValue(String(_loc6_)) != null) {
            return _loc6_;
        }
        _loc6_ = (param1 % 360 + 360) % 360;
        let _loc7_: any = -1;
        let _loc3_: any = -1;
        _loc4_ = 0;
        while (_loc4_ < this._directions.length) {
            _loc5_ = this._directions.getKey(_loc4_) * this._SafeStr_4879 | 0;
            _loc2_ = (_loc5_ - _loc6_ + 360) % 360;
            if (_loc2_ > 180) {
                _loc2_ = 360 - _loc2_;
            }
            if (_loc2_ < _loc7_ || _loc7_ < 0) {
                _loc7_ = _loc2_;
                _loc3_ = _loc4_;
            }
            _loc4_++;
        }
        if (_loc3_ >= 0) {
            return this._directions.getKey(_loc3_ | 0) | 0;
        }
        return 0;
    }

    public getTag(param1: number, param2: number): string {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getTag(param2);
        }
        return "";
    }

    public getInk(param1: number, param2: number): number {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getInk(param2);
        }
        return 0;
    }

    public getAlpha(param1: number, param2: number): number {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getAlpha(param2);
        }
        return 255;
    }

    public getColor(param1: number, param2: number): number {
        let _loc3_: ColorData = asInstanceOf(this._colors.getValue(String(param2)), ColorData);
        if (_loc3_ != null) {
            return _loc3_.getColor(param1);
        }
        return 16777215;
    }

    public getIgnoreMouse(param1: number, param2: number): boolean {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getIgnoreMouse(param2);
        }
        return false;
    }

    public getXOffset(param1: number, param2: number): number {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getXOffset(param2);
        }
        return 0;
    }

    public getYOffset(param1: number, param2: number): number {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getYOffset(param2);
        }
        return 0;
    }

    public getZOffset(param1: number, param2: number): number {
        let _loc3_: DirectionData = null;
        _loc3_ = this.getDirectionData(param1);
        if (_loc3_ != null) {
            return _loc3_.getZOffset(param2);
        }
        return 0;
    }

    private defineDirection(param1: DirectionData, param2: XMLList): boolean {
        let _loc5_: number = 0;
        let _loc10_: XML = null;
        let _loc7_: number = 0;
        let _loc8_: string = null;
        let _loc4_: string = null;
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        if (param1 == null || param2 == null) {
            return false;
        }
        let _loc9_: any[] = ["id"];
        _loc5_ = 0;
        while (_loc5_ < param2.length()) {
            _loc10_ = param2.item(_loc5_);
            if (!XMLValidator.checkRequiredAttributes(_loc10_, _loc9_)) {
                return false;
            }
            _loc7_ = Number(_loc10_.attribute("id")) | 0;
            if (_loc7_ < 0 || _loc7_ >= this.layerCount) {
                return false;
            }
            _loc8_ = _loc10_.attribute("tag").toString();
            if (_loc8_.length > 0) {
                param1.setTag(_loc7_, _loc8_);
            }
            switch (_loc4_ = _loc10_.attribute("ink").toString()) {
                case "ADD":
                    param1.setInk(_loc7_, 1);
                    break;
                case "SUBTRACT":
                    param1.setInk(_loc7_, 2);
                    break;
                case "DARKEN":
                    param1.setInk(_loc7_, 3);
                    break;
                case "DIFFERENCE":
                    param1.setInk(_loc7_, 4);
                    break;
                case "MULTIPLY":
                    param1.setInk(_loc7_, 5);
                    break;
                case "INVERT":
                    param1.setInk(_loc7_, 6);
                    break;
                case "SCREEN":
                    param1.setInk(_loc7_, 7);
            }
            _loc8_ = _loc10_.attribute("alpha").toString();
            if (_loc8_.length > 0) {
                param1.setAlpha(_loc7_, Number(_loc8_) | 0);
            }
            _loc8_ = _loc10_.attribute("ignoreMouse").toString();
            if (_loc8_.length > 0) {
                _loc3_ = Number(_loc8_) | 0;
                param1.setIgnoreMouse(_loc7_, _loc3_ != 0);
            }
            _loc8_ = _loc10_.attribute("x").toString();
            if (_loc8_.length > 0) {
                param1.setXOffset(_loc7_, Number(_loc8_) | 0);
            }
            _loc8_ = _loc10_.attribute("y").toString();
            if (_loc8_.length > 0) {
                param1.setYOffset(_loc7_, Number(_loc8_) | 0);
            }
            _loc8_ = _loc10_.attribute("z").toString();
            if (_loc8_.length > 0) {
                _loc6_ = Number(_loc8_) | 0;
                param1.setZOffset(_loc7_, _loc6_ / -1000);
            }
            _loc5_++;
        }
        return true;
    }

    private getDirectionData(param1: number): DirectionData {
        if (param1 == this._SafeStr_5382 && this._SafeStr_3492 != null) {
            return this._SafeStr_3492;
        }
        let _loc2_: DirectionData = null;
        _loc2_ = asInstanceOf(this._directions.getValue(String(param1)), DirectionData);
        if (_loc2_ == null) {
            _loc2_ = this._SafeStr_3400;
        }
        this._SafeStr_5382 = param1;
        this._SafeStr_3492 = _loc2_;
        return this._SafeStr_3492;
    }
}
