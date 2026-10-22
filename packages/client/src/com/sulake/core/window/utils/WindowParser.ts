import { asGuarded, asInstanceOf, castGuarded, castTo, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IRectLimiter } from '@/com/sulake/core/window/utils/IRectLimiter';
import type { IWindowParser } from '@/com/sulake/core/window/utils/IWindowParser';
import { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import { DropShadowFilter } from '@habbo-pixi/runtime/filters/DropShadowFilter';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { XMLVariableParser } from '@/com/sulake/core/utils/XMLVariableParser';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { isIBoxSizerWindow } from '@/com/sulake/core/window/components/IBoxSizerWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { WindowParamTable } from '@/com/sulake/core/window/utils/WindowParamTable';
import { WindowTypeTable } from '@/com/sulake/core/window/utils/WindowTypeTable';
import { XMLPropertyArrayParser } from '@/com/sulake/core/window/utils/XMLPropertyArrayParser';

export class WindowParser implements IWindowParser {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowParser'); }

    public static readonly ELEMENT_TAG_EXCLUDE: string = "_EXCLUDE";
    public static readonly ELEMENT_TAG_INCLUDE: string = "_INCLUDE";
    public static readonly _SafeStr_8663: string = "_TEMP";
    private static readonly LAYOUT: string = "layout";
    private static readonly _SafeStr_4237: string = "window";
    private static readonly VARIABLES: string = "variables";
    private static readonly FILTERS: string = "filters";
    private static readonly NAME: string = "name";
    private static readonly STYLE: string = "style";
    private static readonly _SafeStr_8095: string = "dynamic_style";
    private static readonly PARAMS: string = "params";
    private static readonly TAGS: string = "tags";
    private static readonly X: string = "x";
    private static readonly _SafeStr_7669: string = "y";
    private static readonly WIDTH: string = "width";
    private static readonly HEIGHT: string = "height";
    private static readonly VISIBLE: string = "visible";
    private static readonly CAPTION: string = "caption";
    private static readonly ID: string = "id";
    private static readonly BACKGROUND: string = "background";
    private static readonly BLEND: string = "blend";
    private static readonly CLIPPING: string = "clipping";
    private static readonly COLOR: string = "color";
    private static readonly THRESHOLD: string = "treshold";
    private static readonly CHILDREN: string = "children";
    private static readonly WIDTH_MIN: string = "width_min";
    private static readonly _SafeStr_8695: string = "width_max";
    private static readonly HEIGHT_MIN: string = "height_min";
    private static readonly _SafeStr_8363: string = "height_max";
    private static readonly TRUE: string = "true";
    private static readonly ZERO: string = "0";
    private static readonly VAR: string = "$";
    private static readonly COMMA: string = ",";
    private static readonly _SafeStr_4649: string = "";
    private static readonly _SafeStr_7034: RegExp = /^(\s|\n|\r|\t|\v)*/m;
    private static readonly _SafeStr_7112: RegExp = /(\s|\n|\r|\t|\v)*$/;

    private static trimWhiteSpace(param1: string): string {
        param1 = param1.replace(WindowParser._SafeStr_7112, "");
        return param1.replace(WindowParser._SafeStr_7034, "");
    }

    constructor(param1: IWindowContext) {
        this._context = param1;
        this._SafeStr_4410 = new Dictionary();
        this._SafeStr_4709 = new Dictionary();
        WindowTypeTable.fillTables(this._SafeStr_4410, this._SafeStr_4709);
        this._SafeStr_3883 = new Dictionary();
        this._SafeStr_5195 = new Dictionary();
        WindowParamTable.fillTables(this._SafeStr_3883, this._SafeStr_5195);
        this._parsedLayoutCache = new UtilsMap();
    }

    declare protected _SafeStr_4410: Map<any, any>;

    declare protected _SafeStr_4709: Map<any, any>;

    declare protected _SafeStr_3883: Map<any, any>;

    declare protected _SafeStr_5195: Map<any, any>;

    declare protected _parsedLayoutCache: UtilsMap;

    declare protected _context: IWindowContext;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (!this._disposed) {
            for (_loc1_ of this._SafeStr_4410?.keys() ?? []) {
                this._SafeStr_4410.delete(_loc1_);
            }
            for (_loc1_ of this._SafeStr_4709?.keys() ?? []) {
                this._SafeStr_4709.delete(_loc1_);
            }
            for (_loc1_ of this._SafeStr_3883?.keys() ?? []) {
                this._SafeStr_3883.delete(_loc1_);
            }
            for (_loc1_ of this._SafeStr_5195?.keys() ?? []) {
                this._SafeStr_5195.delete(_loc1_);
            }
            this._parsedLayoutCache.dispose();
            this._parsedLayoutCache = null;
            this._context = null;
            this._disposed = true;
        }
    }

    public parseAndConstruct(param1: XML, param2: IWindow, param3: UtilsMap): IWindow {
        let _loc6_: any = 0;
        let _loc13_: IWindow = null;
        let _loc8_: any = 0;
        let _loc12_: XMLList = null;
        let _loc9_: XMLList = null;
        let _loc5_: XML = null;
        let _loc4_: XMLList = null;
        let _loc11_: any[] = null;
        let _loc10_: any = 0;
        if (param1.localName() == "layout") {
            _loc9_ = param1.child("variables");
            if (_loc9_.length() > 0) {
                _loc5_ = _loc9_.item(0);
                let _loc7_: XMLList = XML.from(_loc5_.item(0)).children();
                if (_loc7_.length() > 0) {
                    if (param3 == null) {
                        param3 = new UtilsMap();
                    }
                    XMLVariableParser.parseVariableList(_loc7_, param3);
                }
            }
            _loc4_ = param1.child("filters").children();
            if (_loc4_.length() > 0) {
                _loc11_ = [];
                _loc10_ = 0;
                while (_loc10_ < _loc4_.length()) {
                    _loc11_.push(this.buildBitmapFilter(_loc4_.getProperty(_loc10_)));
                    _loc10_++;
                }
                param2.filters = _loc11_;
            }
            switch ((_loc6_ = (_loc12_ = param1.child("window")).length() >>> 0) | 0) {
                case 0:
                    return null;
                case 1:
                    param1 = _loc12_.item(0);
                    break;
                default:
                    _loc8_ = 0;
                    while (_loc8_ < _loc6_) {
                        _loc13_ = this.parseSingleWindowEntity(_loc12_.getProperty(_loc8_), castTo(param2, WindowController), param3);
                        _loc8_++;
                    }
                    return _loc13_;
            }
        }
        if (param1.localName() == "window") {
            _loc12_ = param1.children();
            _loc6_ = _loc12_.length() >>> 0;
            if (_loc6_ > 1) {
                _loc8_ = 0;
                while (_loc8_ < _loc6_) {
                    _loc13_ = this.parseSingleWindowEntity(_loc12_.getProperty(_loc8_), castTo(param2, WindowController), param3);
                    _loc8_++;
                }
                return _loc13_;
            }
            param1 = param1.children().item(0);
        }
        return param1 != null ? this.parseSingleWindowEntity(param1, castTo(param2, WindowController), param3) : null;
    }

    public windowToXMLString(param1: IWindow): string {
        let _loc17_: IWindow = null;
        let _loc6_: any = 0;
        let _loc10_: IIterator = null;
        let _loc12_: PropertyStruct = null;
        let _loc4_: string = null;
        if (param1.dynamicStyle.length < 3) {
            param1.dynamicStyle = "";
        }
        if (param1.dynamicStyle != "") {
            param1.setParamFlag(16, false);
        }
        let _loc11_: string = "";
        let _loc7_: string = stringOrNull(this._SafeStr_4709.get(param1.type));
        let _loc8_: number = param1.param;
        let _loc13_: number = param1.style;
        let _loc14_: IRectLimiter = param1.limits;
        let _loc16_: WindowController = param1 instanceof WindowController ? param1 : null;
        _loc11_ += "<" + _loc7_ + " x=\"" + param1.x + "\"" + " y=\"" + param1.y + "\"" + " width=\"" + param1.width + "\"" + " height=\"" + param1.height + "\"" + " params=\"" + param1.param + "\"" + " style=\"" + param1.style + "\"" + (param1.dynamicStyle != "" ? " dynamic_style=\"" + param1.dynamicStyle + "\"" : "") + (param1.name != "" ? " name=\"" + escape(param1.name) + "\"" : "") + (param1.caption != "" ? " caption=\"" + escape(param1.caption) + "\"" : "") + (param1.id != 0 ? " id=\"" + param1.id.toString() + "\"" : "") + (param1.color != 16777215 ? " color=\"0x" + param1.alpha.toString(16) + param1.color.toString(16) + "\"" : "") + (param1.blend != 1 ? " blend=\"" + param1.blend.toString() + "\"" : "") + (param1.visible != true ? " visible=\"" + param1.visible.toString() + "\"" : "") + (param1.clipping != true ? " clipping=\"" + param1.clipping.toString() + "\"" : "") + (param1.background != false ? " background=\"" + param1.background.toString() + "\"" : "") + (param1.mouseThreshold != 10 ? " treshold=\"" + param1.mouseThreshold.toString() + "\"" : "") + (param1.tags.length > 0 ? " tags=\"" + escape(stringOrNull(param1.tags.toString())) + "\"" : "") + (_loc14_.minWidth > -2147483648 ? " width_min=\"" + _loc14_.minWidth + "\"" : "") + (_loc14_.maxWidth < 2147483647 ? " width_max=\"" + _loc14_.maxWidth + "\"" : "") + (_loc14_.minHeight > -2147483648 ? " height_min=\"" + _loc14_.minHeight + "\"" : "") + (_loc14_.maxHeight < 2147483647 ? " height_max=\"" + _loc14_.maxHeight + "\"" : "") + ">\r";
        if (param1.filters && param1.filters.length > 0) {
            _loc11_ += "\t<filters>\r";
            for (const _loc9_ of param1.filters ?? []) {
                _loc11_ += "\t\t" + this.filterToXmlString(_loc9_) + "\r";
            }
            _loc11_ += "\t</filters>\r";
        }
        let _loc5_: number = _loc16_.numChildren >>> 0;
        let _loc2_: string = "";
        if (isIIterable(_loc16_)) {
            _loc10_ = castGuarded(_loc16_, isIIterable, "com.sulake.core.window.utils.IIterable").iterator;
            _loc5_ = _loc10_.length;
            if (_loc5_ > 0) {
                _loc6_ = 0;
                while (_loc6_ < _loc5_) {
                    _loc17_ = asGuarded(_loc10_[_loc6_], isIWindow);
                    if (_loc17_.tags.indexOf("_EXCLUDE") == -1) {
                        _loc2_ += this.windowToXMLString(_loc17_);
                    }
                    _loc6_++;
                }
            }
        } else {
            _loc5_ = _loc16_.numChildren >>> 0;
            if (_loc5_ > 0) {
                _loc6_ = 0;
                while (_loc6_ < _loc5_) {
                    _loc17_ = _loc16_.getChildAt(_loc6_ | 0);
                    if (_loc17_.tags.indexOf("_EXCLUDE") == -1) {
                        _loc2_ += this.windowToXMLString(_loc17_);
                    }
                    _loc6_++;
                }
            }
        }
        if (_loc2_.length > 0) {
            _loc11_ += "\t<children>\r" + _loc2_ + "\t</children>\r";
        }
        let _loc15_: any[] = param1.properties;
        if (_loc15_ != null && _loc15_.length > 0) {
            _loc4_ = "\t<variables>\r";
            let _loc3_: boolean = false;
            _loc6_ = 0;
            while (_loc6_ < _loc15_.length) {
                _loc12_ = asInstanceOf(_loc15_[_loc6_], PropertyStruct);
                if (_loc12_.valid) {
                    _loc4_ += "\t\t" + _loc12_.toXMLString() + "\r";
                    _loc3_ = true;
                }
                _loc6_++;
            }
            _loc4_ += "\t</variables>\r";
            if (_loc3_) {
                _loc11_ += _loc4_;
            }
        }
        return _loc11_ + ("</" + _loc7_ + ">\r");
    }

    private parseSingleWindowEntity(param1: XML, param2: WindowController, param3: UtilsMap): IWindow {
        let _loc9_: any = 0;
        let _loc27_: string = null;
        let _loc10_: Rectangle = null;
        let _loc24_: XML = null;
        let _loc21_: XMLList = null;
        let _loc17_: any = 0;
        let _loc18_: any = 0;
        let _loc29_: WindowController = null;
        let _loc12_: string = null;
        let _loc22_: any[] = null;
        let _loc19_: any[] = null;
        let _loc23_: BitmapFilter = null;
        let _loc11_: IIterator = null;
        let _loc7_: string = "";
        let _loc16_: any = true;
        let _loc4_: any = true;
        let _loc5_: string = "0x00ffffff";
        let _loc6_: number = 1;
        let _loc26_: any = false;
        let _loc8_: number = 10;
        let _loc28_: number = (param2 != null ? param2.style : 0) >>> 0;
        let _loc25_: string = "";
        let _loc20_: number = 0;
        let _loc13_: string = "";
        let _loc14_: number = 0;
        _loc9_ = this._SafeStr_4410.get(param1.localName()) >>> 0;
        _loc27_ = unescape(String(this.parseAttribute(param1, "name", param3, "")));
        _loc28_ = this.parseAttribute(param1, "style", param3, _loc28_) >>> 0;
        _loc25_ = String(this.parseAttribute(param1, "dynamic_style", param3, ""));
        _loc20_ = this.parseAttribute(param1, "params", param3, _loc20_) >>> 0;
        _loc13_ = unescape(String(this.parseAttribute(param1, "tags", param3, _loc13_)));
        _loc10_ = new Rectangle();
        _loc10_.x = Number(this.parseAttribute(param1, "x", param3, "0"));
        _loc10_.y = Number(this.parseAttribute(param1, "y", param3, "0"));
        _loc10_.width = Number(this.parseAttribute(param1, "width", param3, "0"));
        _loc10_.height = Number(this.parseAttribute(param1, "height", param3, "0"));
        _loc16_ = this.parseAttribute(param1, "visible", param3, _loc16_.toString()) == "true";
        _loc14_ = this.parseAttribute(param1, "id", param3, _loc14_.toString()) | 0;
        if (param1.child("params").length() > 0) {
            _loc21_ = param1.child("params").children();
            _loc17_ = _loc21_.length() >>> 0;
            _loc18_ = 0;
            while (_loc18_ < _loc17_) {
                _loc24_ = _loc21_.getProperty(_loc18_);
                _loc12_ = asGuarded(this.parseAttribute(_loc24_, "name", param3, ""), isString);
                if (this._SafeStr_3883.get(_loc12_) == null) {
                    throw new Error("Unknown window parameter \"" + String(_loc24_.attribute("name")) + "\"!");
                }
                _loc20_ |= this._SafeStr_3883.get(_loc12_);
                _loc18_++;
            }
        }
        _loc7_ = _loc20_ & 0x80000000 ? (param2 ? param2.caption : "") : "";
        _loc7_ = unescape(String(this.parseAttribute(param1, "caption", param3, _loc7_)));
        if (_loc13_ != "") {
            _loc22_ = _loc13_.split(",");
            _loc17_ = _loc22_.length;
            _loc18_ = 0;
            while (_loc18_ < _loc17_) {
                _loc22_[_loc18_] = WindowParser.trimWhiteSpace(stringOrNull(_loc22_[_loc18_]));
                _loc18_++;
            }
        }
        _loc29_ = asInstanceOf(this._context.create(_loc27_, null, _loc9_ >>> 0, _loc28_, _loc20_, _loc10_, null, isIIterable(param2) ? null : param2, _loc14_ >>> 0, this.parseProperties(param1.child("variables").item(0)), _loc25_, _loc22_), WindowController);
        if (this.hasAttribute(param1, "width_min")) {
            _loc29_.limits.minWidth = this.parseAttribute(param1, "width_min", param3, _loc29_.limits.minWidth) | 0;
        }
        if (this.hasAttribute(param1, "width_max")) {
            _loc29_.limits.maxWidth = this.parseAttribute(param1, "width_max", param3, _loc29_.limits.maxWidth) | 0;
        }
        if (this.hasAttribute(param1, "height_min")) {
            _loc29_.limits.minHeight = this.parseAttribute(param1, "height_min", param3, _loc29_.limits.minHeight) | 0;
        }
        if (this.hasAttribute(param1, "height_max")) {
            _loc29_.limits.maxHeight = this.parseAttribute(param1, "height_max", param3, _loc29_.limits.maxHeight) | 0;
        }
        _loc29_.limits.limit();
        _loc26_ = this.parseAttribute(param1, "background", param3, _loc29_.background.toString()) == "true";
        _loc6_ = Number(this.parseAttribute(param1, "blend", param3, _loc29_.blend.toString()));
        _loc4_ = this.parseAttribute(param1, "clipping", param3, _loc29_.clipping.toString()) == "true";
        _loc5_ = String(this.parseAttribute(param1, "color", param3, _loc29_.color.toString()));
        _loc8_ = this.parseAttribute(param1, "treshold", param3, _loc29_.mouseThreshold.toString()) >>> 0;
        if (_loc29_.caption != _loc7_) {
            _loc29_.caption = _loc7_;
        }
        if (_loc29_.blend != _loc6_) {
            _loc29_.blend = _loc6_;
        }
        if (_loc29_.visible != _loc16_) {
            _loc29_.visible = _loc16_;
        }
        if (_loc29_.clipping != _loc4_) {
            _loc29_.clipping = _loc4_;
        }
        if (_loc29_.background != _loc26_) {
            _loc29_.background = _loc26_;
        }
        if (_loc29_.mouseThreshold != _loc8_) {
            _loc29_.mouseThreshold = _loc8_;
        }
        let _loc15_: number = (_loc5_.charAt(1) == "x" ? parseInt(_loc5_, 16) : Number(_loc5_) >>> 0) >>> 0;
        if (_loc29_.color != _loc15_) {
            _loc29_.color = _loc15_;
        }
        _loc21_ = param1.child("filters").children();
        _loc17_ = _loc21_.length() >>> 0;
        if (_loc17_ > 0) {
            _loc19_ = [];
            _loc18_ = 0;
            while (_loc18_ < _loc17_) {
                _loc23_ = asInstanceOf(this.buildBitmapFilter(_loc21_.getProperty(_loc18_)), BitmapFilter);
                if (_loc23_ != null) {
                    _loc19_.push(_loc23_);
                }
                _loc18_++;
            }
            _loc29_.filters = _loc19_;
        }
        if (_loc29_ != null) {
            if (param2 != null) {
                if (isIIterable(param2)) {
                    if (_loc29_.x != _loc10_.x || _loc29_.y != _loc10_.y || _loc29_.width != _loc10_.width || _loc29_.height != _loc10_.height) {
                        if ((_loc20_ & 0xC0) == 192) {
                            _loc29_.x = _loc10_.x | 0;
                        }
                        if ((_loc20_ & 0x0C00) == 3072) {
                            _loc29_.y = _loc10_.y | 0;
                        }
                    }
                    try {
                        _loc11_ = castGuarded(param2, isIIterable, "com.sulake.core.window.utils.IIterable").iterator;
                    } catch (e) {
                    }
                    if (_loc11_ != null) {
                        _loc11_[_loc11_.length] = _loc29_;
                    } else {
                        param2.addChild(_loc29_);
                    }
                }
            }
        }
        _loc21_ = param1.child("children");
        if (_loc21_.length() > 0) {
            _loc24_ = _loc21_.item(0);
            _loc21_ = _loc24_.children();
            _loc17_ = _loc21_.length() >>> 0;
            if (isIBoxSizerWindow(_loc29_)) {
                castGuarded(_loc29_, isIBoxSizerWindow, "com.sulake.core.window.components.IBoxSizerWindow").setAutoRearrange(false);
            }
            _loc18_ = 0;
            while (_loc18_ < _loc17_) {
                this.parseAndConstruct(_loc21_.getProperty(_loc18_), _loc29_, param3);
                _loc18_++;
            }
        }
        if (isIBoxSizerWindow(_loc29_)) {
            castGuarded(_loc29_, isIBoxSizerWindow, "com.sulake.core.window.components.IBoxSizerWindow").setAutoRearrange(true);
        }
        return _loc29_;
    }

    private hasAttribute(param1: XML, param2: string): boolean {
        return param1.attribute(param2).length() > 0;
    }

    private parseAttribute(param1: XML, param2: string, param3: UtilsMap, param4: any): any {
        let _loc5_: XMLList = param1.attribute(param2);
        if (_loc5_.length() == 0) {
            return param4;
        }
        let _loc6_: string = String(_loc5_);
        if (param3 != null) {
            if (_loc6_.charAt(0) == "$") {
                _loc6_ = stringOrNull(param3[_loc6_.slice(1, _loc6_.length)]);
                if (_loc6_ == null) {
                    throw new Error("Shared variable not defined: \"" + param1.attribute(param2) + "\"!");
                }
            }
        }
        return _loc6_;
    }

    private parseProperties(param1: XML): any[] {
        return param1 != null ? XMLPropertyArrayParser.parse(param1.children()) : [];
    }

    private buildBitmapFilter(param1: XML): BitmapFilter {
        let _loc2_: BitmapFilter = null;
        let _loc3_: string = asGuarded(param1.localName(), isString);
        let _loc4_: any = _loc3_;
        if ("DropShadowFilter" === _loc4_) {
            _loc2_ = new DropShadowFilter(Number(this.parseAttribute(param1, "distance", null, "0")), Number(this.parseAttribute(param1, "angle", null, "45")), this.parseAttribute(param1, "color", null, "0") >>> 0, Number(this.parseAttribute(param1, "alpha", null, "1")), Number(this.parseAttribute(param1, "blurX", null, "0")), Number(this.parseAttribute(param1, "blurY", null, "0")), Number(this.parseAttribute(param1, "strength", null, "1")), this.parseAttribute(param1, "quality", null, "1") | 0, this.parseAttribute(param1, "inner", null, "false") == "true", this.parseAttribute(param1, "knockout", null, "false") == "true", this.parseAttribute(param1, "hideObject", null, "false") == "true");
        }
        return _loc2_;
    }

    private filterToXmlString(param1: BitmapFilter): string {
        let _loc2_: string = null;
        if (param1 instanceof DropShadowFilter) {
            _loc2_ = "<DropShadowFilter";
            _loc2_ += castTo(param1, DropShadowFilter).distance != 0 ? " distance=\"" + castTo(param1, DropShadowFilter).distance + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).angle != 45 ? " angle=\"" + castTo(param1, DropShadowFilter).angle + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).color != 0 ? " color=\"" + castTo(param1, DropShadowFilter).color + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).alpha != 1 ? " alpha=\"" + castTo(param1, DropShadowFilter).alpha + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).blurX != 0 ? " blurX=\"" + castTo(param1, DropShadowFilter).blurX + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).blurY != 0 ? " blurY=\"" + castTo(param1, DropShadowFilter).blurY + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).strength != 1 ? " strength=\"" + castTo(param1, DropShadowFilter).strength + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).quality != 1 ? " quality=\"" + castTo(param1, DropShadowFilter).quality + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).inner != false ? " inner=\"" + castTo(param1, DropShadowFilter).inner + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).knockout != false ? " knockout=\"" + castTo(param1, DropShadowFilter).knockout + "\"" : "";
            _loc2_ += castTo(param1, DropShadowFilter).hideObject != false ? " hideObject=\"" + castTo(param1, DropShadowFilter).hideObject + "\"" : "";
            _loc2_ += " />";
        }
        return _loc2_;
    }

    get [IDisposable](): true {
        return true;
    }
}
