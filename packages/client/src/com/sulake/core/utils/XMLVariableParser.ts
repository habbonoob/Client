import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class XMLVariableParser {
    static { registerClassName(this, 'com.sulake.core.utils::XMLVariableParser'); }

    public static readonly _SafeStr_7502: string = "hex";
    public static readonly INT: string = "int";
    public static readonly _SafeStr_7468: string = "uint";
    public static readonly NUMBER: string = "Number";
    public static readonly FLOAT: string = "float";
    public static readonly BOOLEAN: string = "Boolean";
    public static readonly BOOL: string = "bool";
    public static readonly STRING: string = "String";
    public static readonly _SafeStr_7452: string = "Point";
    public static readonly RECTANGLE: string = "Rectangle";
    public static readonly ARRAY: string = "Array";
    public static readonly MAP: string = "Map";
    private static readonly KEY: string = "key";
    private static readonly TYPE: string = "type";
    private static readonly VALUE: string = "value";
    private static readonly TRUE: string = "true";
    private static readonly _SafeStr_7962: string = "false";
    private static readonly X: string = "x";
    private static readonly _SafeStr_7669: string = "y";
    private static readonly WIDTH: string = "width";
    private static readonly HEIGHT: string = "height";
    private static readonly COMMA: string = ",";

    public static parseVariableList(param1: XMLList, param2: UtilsMap, param3: any[] = null): number {
        let _loc5_: any = 0;
        let _loc4_: number = param1.length() >>> 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            XMLVariableParser.parseVariableToken(param1.getProperty(_loc5_), param2, param3);
            _loc5_++;
        }
        return _loc4_;
    }

    public static castStringToType(param1: string, param2: string): any {
        switch (param2) {
            case "uint":
                return Number(param1) >>> 0;
            case "int":
                return Number(param1) | 0;
            case "Number":
                return Number(param1);
            case "float":
                return Number(param1);
            case "Boolean":
                return param1 == "true" || (Number(param1) | 0) > 0;
            case "bool":
                return param1 == "true" || (Number(param1) | 0) > 0;
            case "hex":
                return Number(param1) >>> 0;
            case "Array":
                return param1.split(",");
            default:
                return param1;
        }
    }

    public static parseValueType(param1: XML, param2: string): any {
        let _loc5_: UtilsMap = null;
        let _loc6_: Point = null;
        let _loc3_: Rectangle = null;
        let _loc7_: string = null;
        let _loc4_: any[] = null;
        switch (param2) {
            case "String":
                return String(param1);
            case "Point":
                _loc6_ = new Point();
                _loc6_.x = Number(param1.attribute("x"));
                _loc6_.y = Number(param1.attribute("y"));
                return _loc6_;
            case "Rectangle":
                _loc3_ = new Rectangle();
                _loc3_.x = Number(param1.attribute("x"));
                _loc3_.y = Number(param1.attribute("y"));
                _loc3_.width = Number(param1.attribute("width"));
                _loc3_.height = Number(param1.attribute("height"));
                return _loc3_;
            case "Array":
                _loc5_ = new UtilsMap();
                XMLVariableParser.parseVariableList(param1.children(), _loc5_);
                _loc4_ = [];
                for (_loc7_ of keysOf(_loc5_)) {
                    _loc4_.push(_loc5_[_loc7_]);
                }
                return _loc4_;
            case "Map":
                _loc5_ = new UtilsMap();
                XMLVariableParser.parseVariableList(param1.children(), _loc5_);
                return _loc5_;
            default:
                throw new Error("Unable to parse data type \"" + param2 + "\", unknown type!");
        }
    }

    private static parseVariableToken(param1: XML, param2: UtilsMap, param3: any[] = null): void {
        let _loc9_: string = null;
        let _loc7_: string = null;
        let _loc8_: XMLList = null;
        let _loc4_: XML = null;
        let _loc5_: XML = null;
        let _loc6_: string = "String";
        _loc8_ = param1.attribute("key");
        if (_loc8_.length() > 0) {
            _loc9_ = String(param1.attribute("key"));
        } else {
            _loc9_ = param1.child("key").item(0)?.toString() ?? null;
        }
        _loc8_ = param1.attribute("type");
        if (_loc8_.length() > 0) {
            _loc6_ = String(param1.attribute("type"));
        }
        _loc8_ = param1.attribute("value");
        if (_loc8_.length() > 0) {
            _loc7_ = String(param1.attribute("value"));
        }
        if (_loc7_ != null) {
            param2[_loc9_] = XMLVariableParser.castStringToType(_loc7_, _loc6_);
        } else {
            _loc4_ = param1.child("value").item(0);
            if (_loc4_ != null) {
                _loc5_ = _loc4_.child(0).item(0);
                _loc7_ = _loc5_.children().item(0)?.toString() ?? null;
                _loc6_ = stringOrNull(_loc5_.localName());
                param2[_loc9_] = XMLVariableParser.parseValueType(_loc5_, _loc6_);
            } else if (_loc6_ == "Map" || _loc6_ == "Array") {
                param2[_loc9_] = XMLVariableParser.parseValueType(param1, _loc6_);
            }
        }
        if (param3) {
            param3.push(_loc6_);
        }
    }

    constructor() {
    }
}
