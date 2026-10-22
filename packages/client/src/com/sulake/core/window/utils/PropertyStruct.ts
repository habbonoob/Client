import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class PropertyStruct {
    static { registerClassName(this, 'com.sulake.core.window.utils::PropertyStruct'); }

    public static readonly _SafeStr_7502: string = "hex";
    public static readonly INT: string = "int";
    public static readonly _SafeStr_7468: string = "uint";
    public static readonly NUMBER: string = "Number";
    public static readonly BOOLEAN: string = "Boolean";
    public static readonly STRING: string = "String";
    public static readonly _SafeStr_7452: string = "Point";
    public static readonly RECTANGLE: string = "Rectangle";
    public static readonly ARRAY: string = "Array";
    public static readonly MAP: string = "Map";

    constructor(param1: string, param2: any, param3: string, param4: boolean = false, param5: any[] = null) {
        this._key = param1;
        this._value = param2;
        this._type = param3;
        this._valid = param4;
        this._SafeStr_7320 = param3 == "Map" || param3 == "Array" || param3 == "Point" || param3 == "Rectangle";
        this._range = param5;
    }

    declare private _value: any;

    declare private _type: string;

    declare private _valid: boolean;
    static { (this.prototype as any)._valid = false; }

    declare private _SafeStr_7320: boolean;
    static { (this.prototype as any)._SafeStr_7320 = false; }

    declare private _range: any[];

    declare private _key: string;

    public get key(): string {
        return this._key;
    }

    public get value(): any {
        return this._value;
    }

    public get type(): string {
        return this._type;
    }

    public get valid(): boolean {
        return this._valid;
    }

    public get range(): any[] {
        return this._range;
    }

    public withNameSpace(param1: string): PropertyStruct {
        return new PropertyStruct(param1 + ":" + this._key, this._value, this._type, this._valid, this._range);
    }

    public withoutNameSpace(): PropertyStruct {
        return new PropertyStruct(this._key.replace(/.*:/, ""), this._value, this._type, this._valid, this._range);
    }

    public withValue(param1: any): PropertyStruct {
        let _loc2_: any[] = null;
        let _loc3_: any[] = null;
        let _loc4_: number = 0;
        let _loc5_: any = true;
        switch (this._type) {
            case "uint":
            case "hex":
                _loc5_ = this._value >>> 0 != param1 >>> 0;
                break;
            case "int":
                _loc5_ = (this._value | 0) != (param1 | 0);
                break;
            case "Number":
                _loc5_ = Number(this._value) != Number(param1);
                break;
            case "Boolean":
                _loc5_ = Boolean(this._value) != Boolean(param1);
                break;
            case "String":
                _loc5_ = String(this._value) != String(param1);
                break;
            case "Array":
                _loc2_ = Array.isArray(this._value) ? this._value : null;
                _loc3_ = Array.isArray(param1) ? param1 : null;
                if (!(_loc2_ != null && _loc3_ != null && _loc2_.length == _loc3_.length)) {
                    break;
                }
                _loc5_ = false;
                _loc4_ = 0;
                while (_loc4_ < _loc3_.length) {
                    if (_loc2_[_loc4_] != _loc3_[_loc4_]) {
                        _loc5_ = true;
                        break;
                    }
                    _loc4_++;
                }
        }
        if (_loc5_) {
            return new PropertyStruct(this._key, param1, this.type, true, this._range);
        }
        return this;
    }

    public toString(): string {
        switch (this._type) {
            case "hex":
                return "0x" + (this._value >>> 0).toString(16);
            case "Boolean":
                return Boolean(this._value) == true ? "true" : "false";
            case "Point":
                return "Point(" + castTo(this._value, Point).x + ", " + castTo(this._value, Point).y + ")";
            case "Rectangle":
                return "Rectangle(" + castTo(this._value, Rectangle).x + ", " + castTo(this._value, Rectangle).y + ", " + castTo(this._value, Rectangle).width + ", " + castTo(this._value, Rectangle).height + ")";
            default:
                return String(this.value);
        }
    }

    public toXMLString(): string {
        let _loc4_: number = 0;
        let _loc3_: string = null;
        let _loc5_: UtilsMap = null;
        let _loc2_: any[] = null;
        let _loc6_: Point = null;
        let _loc1_: Rectangle = null;
        switch (this._type) {
            case "Map":
                _loc5_ = this._value instanceof UtilsMap ? this._value : null;
                _loc3_ = "<var key=\"" + this._key + "\">\r<value>\r<" + this._type + ">\r";
                _loc4_ = 0;
                while (_loc4_ < _loc5_.length) {
                    _loc3_ += "<var key=\"" + _loc5_.getKey(_loc4_) + "\" value=\"" + _loc5_.getWithIndex(_loc4_) + "\" type=\"" + getQualifiedClassName(_loc5_.getWithIndex(_loc4_)) + "\" />\r";
                    _loc4_++;
                }
                _loc3_ += "</" + this._type + ">\r</value>\r</var>";
                break;
            case "Array":
                _loc2_ = Array.isArray(this._value) ? this._value : null;
                _loc3_ = "<var key=\"" + this._key + "\">\r<value>\r<" + this._type + ">\r";
                _loc4_ = 0;
                while (_loc4_ < _loc2_.length) {
                    _loc3_ += "<var key=\"" + String(_loc4_) + "\" value=\"" + _loc2_[_loc4_] + "\" type=\"" + getQualifiedClassName(_loc2_[_loc4_]) + "\" />\r";
                    _loc4_++;
                }
                _loc3_ += "</" + this._type + ">\r</value>\r</var>";
                break;
            case "Point":
                _loc6_ = this._value instanceof Point ? this._value : null;
                _loc3_ = "<var key=\"" + this._key + "\">\r<value>\r<" + this._type + ">\r";
                _loc3_ += "<var key=\"x\" value=\"" + _loc6_.x + "\" type=\"" + "int" + "\" />\r";
                _loc3_ += "<var key=\"y\" value=\"" + _loc6_.y + "\" type=\"" + "int" + "\" />\r";
                _loc3_ += "</" + this._type + ">\r</value>\r</var>";
                break;
            case "Rectangle":
                _loc1_ = this._value instanceof Rectangle ? this._value : null;
                _loc3_ = "<var key=\"" + this._key + "\">\r<value>\r<" + this._type + ">\r";
                _loc3_ += "<var key=\"x\" value=\"" + _loc1_.x + "\" type=\"" + "int" + "\" />\r";
                _loc3_ += "<var key=\"y\" value=\"" + _loc1_.y + "\" type=\"" + "int" + "\" />\r";
                _loc3_ += "<var key=\"width\" value=\"" + _loc1_.width + "\" type=\"" + "int" + "\" />\r";
                _loc3_ += "<var key=\"height\" value=\"" + _loc1_.height + "\" type=\"" + "int" + "\" />\r";
                _loc3_ += "</" + this._type + ">\r</value>\r</var>";
                break;
            case "hex":
                _loc3_ = "<var key=\"" + this._key + "\" value=\"" + "0x" + (this._value >>> 0).toString(16) + "\" type=\"" + this._type + "\" />";
                break;
            default:
                _loc3_ = "<var key=\"" + this._key + "\" value=\"" + this._value + "\" type=\"" + this._type + "\" />";
        }
        return _loc3_;
    }
}
