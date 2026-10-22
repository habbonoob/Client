import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { XMLVariableParser } from '@/com/sulake/core/utils/XMLVariableParser';
import { BitmapSkinTemplate } from '@/com/sulake/core/window/graphics/renderer/BitmapSkinTemplate';
import { BitmapSkinTemplateEntity } from '@/com/sulake/core/window/graphics/renderer/BitmapSkinTemplateEntity';
import { SkinLayout } from '@/com/sulake/core/window/graphics/renderer/SkinLayout';
import { SkinLayoutEntity } from '@/com/sulake/core/window/graphics/renderer/SkinLayoutEntity';

export class BitmapSkinParser {
    static { registerClassName(this, 'com.sulake.core.window.graphics::BitmapSkinParser'); }

    public static readonly WINDOW_STATE_DEFAULT: string = "default";
    public static readonly WINDOW_STATE_ACTIVE: string = "active";
    public static readonly _SafeStr_7500: string = "focused";
    public static readonly WINDOW_STATE_HOVERING: string = "hovering";
    public static readonly _SafeStr_7527: string = "selected";
    public static readonly _SafeStr_7547: string = "pressed";
    public static readonly _SafeStr_7564: string = "disabled";
    public static readonly _SafeStr_7514: string = "locked";

    constructor() {
    }

    public static parseSkinDescription(param1: XML, param2: XMLList, param3: ISkinRenderer, param4: string, param5: IAssetLibrary): void {
        let _loc8_: XML = null;
        let _loc10_: XMLList = null;
        let _loc21_: XMLList = null;
        let _loc19_: any = 0;
        let _loc13_: any = 0;
        let _loc22_: XML = null;
        let _loc11_: XMLList = null;
        let _loc7_: any = 0;
        let _loc20_: any = 0;
        let _loc14_: any = 0;
        let _loc18_: XML = null;
        let _loc6_: UtilsMap = new UtilsMap();
        let _loc12_: XMLList = param1.child("variables");
        if (_loc12_.length() > 0) {
            _loc8_ = _loc12_.item(0);
            _loc10_ = _loc8_.child("variable");
            if (_loc10_.length()) {
                XMLVariableParser.parseVariableList(_loc10_, _loc6_);
            }
        }
        let _loc9_: Map<any, any> = new Dictionary();
        let _loc17_: XMLList = param1.child("templates");
        if (_loc17_.item(0)) {
            BitmapSkinParser.parseTemplateList(param3, _loc17_.item(0), _loc9_, _loc6_, param5);
        }
        let _loc15_: Map<any, any> = new Dictionary();
        let _loc16_: XMLList = param1.child("layouts");
        if (_loc16_.item(0)) {
            if (param4 == null) {
                BitmapSkinParser.parseLayoutList(param3, _loc16_.item(0), _loc15_, _loc6_);
            } else {
                _loc21_ = _loc16_.item(0).child("layout");
                _loc19_ = _loc21_.length() >>> 0;
                _loc13_ = 0;
                while (_loc13_ < _loc19_) {
                    _loc22_ = _loc21_.getProperty(_loc13_);
                    if (_loc22_.attribute("name")?.toString() == param4) {
                        BitmapSkinParser.parseLayout(param3, _loc22_, _loc15_, _loc6_);
                        break;
                    }
                    _loc13_++;
                }
            }
        }
        if (param2.length() == 0) {
            param2 = param1.child("states");
        }
        if (param2.length() > 0) {
            if (param4 == null) {
                BitmapSkinParser.parseRenderStateList(param3, param2.item(0), _loc15_, _loc6_);
            } else {
                _loc11_ = param2.item(0).child("state");
                _loc7_ = _loc11_.length() >>> 0;
                _loc20_ = 0;
                _loc14_ = 0;
                while (_loc14_ < _loc7_) {
                    _loc18_ = _loc11_.getProperty(_loc14_);
                    if (_loc18_.attribute("layout")?.toString() == param4) {
                        BitmapSkinParser.parseState(param3, _loc18_, _loc15_, _loc6_);
                        _loc20_++;
                    }
                    _loc14_++;
                }
            }
        }
    }

    protected static parseLayout(param1: ISkinRenderer, param2: XML, param3: Map<any, any>, param4: UtilsMap): void {
        let _loc7_: string = null;
        let _loc8_: XML = null;
        let _loc9_: XMLList = null;
        _loc7_ = param2.attribute("name").toString();
        let _loc10_: boolean = param2.attribute("transparent")?.toString() == "true";
        let _loc5_: string = param2.attribute("blendMode").toString();
        let _loc6_: SkinLayout = new SkinLayout(_loc7_, _loc10_, _loc5_);
        let _loc11_: XMLList = param2.child("entities");
        if (_loc11_.length() > 0) {
            _loc8_ = _loc11_.item(0);
            _loc9_ = _loc8_.child("entity");
            if (_loc9_.length()) {
                BitmapSkinParser.parseLayoutEntityList(param1, _loc6_, _loc9_, param4);
            }
        }
        param3.set(_loc7_, _loc6_);
        param1.addLayout(_loc6_);
    }

    protected static parseLayoutList(param1: ISkinRenderer, param2: XML, param3: Map<any, any>, param4: UtilsMap): void {
        let _loc6_: any = 0;
        let _loc8_: XML = null;
        let _loc7_: XMLList = param2.child("layout");
        let _loc5_: number = _loc7_.length() >>> 0;
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc8_ = _loc7_.getProperty(_loc6_);
            BitmapSkinParser.parseLayout(param1, _loc8_, param3, param4);
            _loc6_++;
        }
    }

    protected static parseLayoutEntity(param1: XML, param2: UtilsMap): SkinLayoutEntity {
        let _loc4_: string = null;
        let _loc6_: SkinLayoutEntity = null;
        let _loc5_: any = 0;
        let _loc3_: string = null;
        let _loc7_: XML = null;
        let _loc8_: XMLList = null;
        _loc3_ = param1.attribute("id").toString();
        _loc5_ = (_loc3_ == null ? 0 : Number(_loc3_) >>> 0) >>> 0;
        _loc3_ = param1.attribute("name").toString();
        _loc4_ = _loc3_ == null ? "" : _loc3_;
        _loc6_ = new SkinLayoutEntity(_loc5_ >>> 0, _loc4_);
        _loc3_ = param1.attribute("colorize").toString();
        _loc6_.colorize = _loc3_ == "" ? true : _loc3_ == "true";
        _loc3_ = param1.attribute("colorizeMethod").toString();
        if (_loc3_ != null) {
            if (_loc3_.charAt(0) == "$") {
                _loc3_ = stringOrNull(param2[_loc3_.slice(1, _loc3_.length)]);
            }
        }
        _loc6_.colorizeMethod = _loc3_ == "" ? "multiply" : _loc3_;
        _loc3_ = param1.attribute("shade").toString();
        if (_loc3_ != null) {
            if (_loc3_.charAt(0) == "$") {
                _loc3_ = stringOrNull(param2[_loc3_.slice(1, _loc3_.length)]);
            }
        }
        _loc6_.shade = _loc3_ == "" ? 0 : Number(_loc3_);
        _loc3_ = null;
        _loc8_ = param1.child("color");
        if (_loc8_.length() > 0) {
            _loc7_ = _loc8_.item(0);
            _loc3_ = String(_loc7_);
            if (_loc3_ != null) {
                if (_loc3_.charAt(0) == "$") {
                    _loc3_ = stringOrNull(param2[_loc3_.slice(1, _loc3_.length)]);
                }
            }
        }
        _loc6_.color = (_loc3_ == null ? 0 : Number(_loc3_) >>> 0) >>> 0;
        _loc3_ = null;
        _loc8_ = param1.child("blend");
        if (_loc8_.length() > 0) {
            _loc7_ = _loc8_.item(0);
            _loc3_ = String(_loc7_);
            if (_loc3_ != null) {
                if (_loc3_.charAt(0) == "$") {
                    _loc3_ = stringOrNull(param2[_loc3_.slice(1, _loc3_.length)]);
                }
            }
        }
        _loc6_.blend = _loc3_ == null ? 4294967295 : Number(_loc3_) >>> 0;
        _loc8_ = param1.child("scale");
        if (_loc8_.length() > 0) {
            _loc7_ = _loc8_.item(0);
            _loc3_ = _loc7_.attribute("horizontal").toString();
            if (_loc3_ != null) {
                if (_loc3_.charAt(0) == "$") {
                    _loc3_ = stringOrNull(param2[_loc3_.slice(1, _loc3_.length)]);
                }
            }
            switch (_loc3_.toLowerCase()) {
                case "fixed":
                    _loc6_.scaleH = 0;
                    break;
                case "move":
                    _loc6_.scaleH = 1;
                    break;
                case "strech":
                    _loc6_.scaleH = 2;
                    break;
                case "tiled":
                    _loc6_.scaleH = 4;
                    break;
                case "center":
                    _loc6_.scaleH = 8;
            }
            _loc3_ = _loc7_.attribute("vertical").toString();
            if (_loc3_ != null) {
                if (_loc3_.charAt(0) == "$") {
                    _loc3_ = stringOrNull(param2[_loc3_.slice(1, _loc3_.length)]);
                }
            }
            switch (_loc3_.toLowerCase()) {
                case "fixed":
                    _loc6_.scaleV = 0;
                    break;
                case "move":
                    _loc6_.scaleV = 1;
                    break;
                case "strech":
                    _loc6_.scaleV = 2;
                    break;
                case "tiled":
                    _loc6_.scaleV = 4;
                    break;
                case "center":
                    _loc6_.scaleV = 8;
            }
        }
        _loc8_ = param1.child("region");
        if (_loc8_.length() > 0) {
            _loc7_ = _loc8_.item(0);
            _loc8_ = _loc7_.child("Rectangle");
            _loc7_ = _loc8_.item(0);
            _loc6_.region = new Rectangle();
            _loc3_ = _loc7_.attribute("x").toString();
            _loc6_.region.x = Number(_loc3_.charAt(0) == "$" ? param2[_loc3_.slice(1, _loc3_.length)] : _loc3_);
            _loc3_ = _loc7_.attribute("y").toString();
            _loc6_.region.y = Number(_loc3_.charAt(0) == "$" ? param2[_loc3_.slice(1, _loc3_.length)] : _loc3_);
            _loc3_ = _loc7_.attribute("width").toString();
            _loc6_.region.width = Number(_loc3_.charAt(0) == "$" ? param2[_loc3_.slice(1, _loc3_.length)] : _loc3_);
            _loc3_ = _loc7_.attribute("height").toString();
            _loc6_.region.height = Number(_loc3_.charAt(0) == "$" ? param2[_loc3_.slice(1, _loc3_.length)] : _loc3_);
        }
        return _loc6_;
    }

    protected static parseLayoutEntityList(param1: ISkinRenderer, param2: SkinLayout, param3: XMLList, param4: UtilsMap): void {
        let _loc7_: SkinLayoutEntity = null;
        let _loc6_: any = 0;
        let _loc5_: number = param3.length() >>> 0;
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc7_ = BitmapSkinParser.parseLayoutEntity(param3.getProperty(_loc6_), param4);
            if (_loc7_ != null) {
                param2.addChild(_loc7_);
            }
            _loc6_++;
        }
    }

    protected static parseTemplateList(param1: ISkinRenderer, param2: XML, param3: Map<any, any>, param4: UtilsMap, param5: IAssetLibrary): void {
        let _loc9_: any = 0;
        let _loc11_: XML = null;
        let _loc12_: string = null;
        let _loc13_: string = null;
        let _loc7_: BitmapSkinTemplate = null;
        let _loc15_: XMLList = null;
        let _loc10_: XML = null;
        let _loc14_: XMLList = null;
        let _loc6_: XMLList = param2.child("template");
        let _loc8_: number = _loc6_.length() >>> 0;
        _loc9_ = 0;
        while (_loc9_ < _loc8_) {
            _loc11_ = _loc6_.getProperty(_loc9_);
            _loc12_ = _loc11_.attribute("name").toString();
            if (_loc12_ != null) {
                if (_loc12_.charAt(0) == "$") {
                    _loc12_ = stringOrNull(param4[_loc12_.slice(1, _loc12_.length)]);
                }
            }
            _loc13_ = _loc11_.attribute("asset").toString();
            if (_loc13_ != null) {
                if (_loc13_.charAt(0) == "$") {
                    _loc13_ = stringOrNull(param4[_loc13_.slice(1, _loc13_.length)]);
                }
            }
            _loc7_ = new BitmapSkinTemplate(_loc12_, param5.getAssetByName(_loc13_));
            _loc15_ = _loc11_.child("entities");
            if (_loc15_.length() > 0) {
                _loc10_ = _loc15_.item(0);
                _loc14_ = _loc10_.child("entity");
                if (_loc14_.length()) {
                    BitmapSkinParser.parseTemplateEntityList(param1, _loc7_, _loc14_, param4);
                }
            }
            param3.set(_loc12_, _loc7_);
            param1.addTemplate(_loc7_);
            _loc9_++;
        }
    }

    protected static parseTemplateEntityList(param1: ISkinRenderer, param2: BitmapSkinTemplate, param3: XMLList, param4: UtilsMap): void {
        let _loc10_: XML = null;
        let _loc15_: XMLList = null;
        let _loc16_: XML = null;
        let _loc11_: any = null;
        let _loc7_: any = null;
        let _loc6_: string = null;
        let _loc12_: string = null;
        let _loc9_: string = null;
        let _loc13_: any = 0;
        let _loc14_: Rectangle = null;
        let _loc8_: number = 0;
        let _loc5_: number = param3.length();
        _loc8_ = 0;
        while (_loc8_ < _loc5_) {
            _loc10_ = param3.item(_loc8_);
            _loc6_ = _loc10_.attribute("name").toString();
            _loc12_ = stringOrNull(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_);
            _loc6_ = _loc10_.attribute("type").toString();
            _loc9_ = stringOrNull(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_);
            _loc6_ = _loc10_.attribute("id").toString();
            _loc13_ = Number(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_) >>> 0;
            _loc15_ = _loc10_.child("region");
            if (_loc15_.length() > 0) {
                _loc16_ = _loc15_.item(0);
                _loc15_ = _loc16_.child("Rectangle");
                _loc16_ = _loc15_.item(0);
                _loc14_ = new Rectangle();
                _loc6_ = _loc16_.attribute("x").toString();
                _loc14_.x = Number(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_);
                _loc6_ = _loc16_.attribute("y").toString();
                _loc14_.y = Number(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_);
                _loc6_ = _loc16_.attribute("width").toString();
                _loc14_.width = Number(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_);
                _loc6_ = _loc16_.attribute("height").toString();
                _loc14_.height = Number(_loc6_.charAt(0) == "$" ? param4[_loc6_.slice(1, _loc6_.length)] : _loc6_);
            }
            param2.addChild(new BitmapSkinTemplateEntity(_loc12_, _loc9_, _loc13_ >>> 0, _loc14_));
            _loc8_++;
        }
    }

    protected static parseState(param1: ISkinRenderer, param2: XML, param3: Map<any, any>, param4: UtilsMap): void {
        let _loc6_: XML = null;
        let _loc7_: XMLList = null;
        let _loc10_: UtilsMap = null;
        let _loc15_: string = null;
        let _loc14_: any = null;
        let _loc12_: string = param2.attribute("name").toString();
        if (_loc12_.charAt(0) == "$") {
            _loc12_ = stringOrNull(param4[_loc12_.slice(1, _loc12_.length)]);
        }
        let _loc11_: string = param2.attribute("layout").toString();
        if (_loc11_.charAt(0) == "$") {
            _loc11_ = stringOrNull(param4[_loc11_.slice(1, _loc11_.length)]);
        }
        let _loc5_: string = param2.attribute("template").toString();
        if (_loc5_.charAt(0) == "$") {
            _loc5_ = stringOrNull(param4[_loc5_.slice(1, _loc5_.length)]);
        }
        let _loc8_: ISkinLayout = param3.get(_loc11_);
        if (_loc8_ == null) {
            throw new Error("State " + _loc12_ + " has invalid layout reference " + _loc11_ + "!");
        }
        let _loc9_: XMLList = param2.child("variables");
        if (_loc9_.length() > 0) {
            _loc6_ = _loc9_.item(0);
            _loc7_ = _loc6_.child("variable");
            if (_loc7_.length()) {
                _loc10_ = new UtilsMap();
                XMLVariableParser.parseVariableList(_loc7_, _loc10_);
                for (_loc15_ of keysOf(_loc10_)) {
                    _loc14_ = _loc10_[_loc15_];
                    if (typeof _loc14_ === "string") {
                        if (String(_loc14_).charAt(0) == "$") {
                            _loc14_ = param4[_loc14_.slice(1, _loc14_.length)];
                            _loc10_[_loc15_] = _loc14_;
                        }
                    }
                }
            }
        }
        let _loc13_: number = 0;
        switch (_loc12_) {
            case "active":
                _loc13_ = 1;
                break;
            case "default":
                _loc13_ = 0;
                break;
            case "focused":
                _loc13_ = 2;
                break;
            case "disabled":
                _loc13_ = 32;
                break;
            case "hovering":
                _loc13_ = 4;
                break;
            case "pressed":
                _loc13_ = 16;
                break;
            case "selected":
                _loc13_ = 8;
                break;
            case "locked":
                _loc13_ = 64;
                break;
            default:
                throw new Error("Unknown window state: \"" + _loc12_ + "\"!");
        }
        param1.registerLayoutForRenderState(_loc13_, _loc11_);
        param1.registerTemplateForRenderState(_loc13_, _loc5_);
    }

    protected static parseRenderStateList(param1: ISkinRenderer, param2: XML, param3: Map<any, any>, param4: UtilsMap): void {
        let _loc7_: any = 0;
        let _loc6_: XMLList = param2.child("state");
        let _loc5_: number = _loc6_.length() >>> 0;
        _loc7_ = 0;
        while (_loc7_ < _loc5_) {
            BitmapSkinParser.parseState(param1, _loc6_.getProperty(_loc7_), param3, param4);
            _loc7_++;
        }
    }
}
