import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { TextStyle } from '@/com/sulake/core/window/utils/TextStyle';

export class TextStyleManager {
    static { registerClassName(this, 'com.sulake.core.window.utils::TextStyleManager'); }

    static #staticsReady = false;

    public static get REGULAR(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.REGULAR;
    }

    public static get ITALIC(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.ITALIC;
    }

    public static get BOLD(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.BOLD;
    }

    private static get _SafeStr_2309(): UtilsMap {
        TextStyleManager.#initStatics();
        return TextStyleManager._SafeStr_2309;
    }
    private static set _SafeStr_2309(value: UtilsMap) {
        TextStyleManager.#initStatics();
        TextStyleManager._SafeStr_2309 = value;
    }

    private static get _styleSheetNames(): any[] {
        TextStyleManager.#initStatics();
        return TextStyleManager._styleSheetNames;
    }
    private static set _styleSheetNames(value: any[]) {
        TextStyleManager.#initStatics();
        TextStyleManager._styleSheetNames = value;
    }

    private static get _SafeStr_2546(): IEventDispatcher {
        TextStyleManager.#initStatics();
        return TextStyleManager._SafeStr_2546;
    }
    private static set _SafeStr_2546(value: IEventDispatcher) {
        TextStyleManager.#initStatics();
        TextStyleManager._SafeStr_2546 = value;
    }

    private static get TAG_OPEN(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.TAG_OPEN;
    }

    private static get TAG_CLOSE(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.TAG_CLOSE;
    }

    private static get CMT_OPEN(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.CMT_OPEN;
    }

    private static get CMT_CLOSE(): string {
        TextStyleManager.#initStatics();
        return TextStyleManager.CMT_CLOSE;
    }

    constructor() {
    }

    public static get events(): IEventDispatcher {
        return TextStyleManager._SafeStr_2546;
    }

    private static init(): void {
        let _loc1_: TextStyle = null;
        TextStyleManager._SafeStr_2309 = new UtilsMap();
        TextStyleManager._styleSheetNames = [];
        TextStyleManager._SafeStr_2546 = new EventDispatcherWrapper();
        _loc1_ = new TextStyle();
        _loc1_.name = "regular";
        _loc1_.color = 0;
        _loc1_.fontSize = "9";
        _loc1_.fontFamily = "Courier";
        _loc1_.fontStyle = "normal";
        _loc1_.fontWeight = "normal";
        TextStyleManager._SafeStr_2309[_loc1_.name] = _loc1_;
        TextStyleManager._styleSheetNames.push(_loc1_.name);
        _loc1_ = new TextStyle();
        _loc1_.name = "italic";
        _loc1_.color = 0;
        _loc1_.fontSize = "9";
        _loc1_.fontFamily = "Courier";
        _loc1_.fontStyle = "italic";
        _loc1_.fontWeight = "normal";
        TextStyleManager._SafeStr_2309[_loc1_.name] = _loc1_;
        TextStyleManager._styleSheetNames.push(_loc1_.name);
        _loc1_ = new TextStyle();
        _loc1_.name = "bold";
        _loc1_.color = 0;
        _loc1_.fontSize = "9";
        _loc1_.fontFamily = "Courier";
        _loc1_.fontStyle = "normal";
        _loc1_.fontWeight = "bold";
        TextStyleManager._SafeStr_2309[_loc1_.name] = _loc1_;
        TextStyleManager._styleSheetNames.push(_loc1_.name);
    }

    public static getStyle(param1: string): TextStyle {
        return TextStyleManager._SafeStr_2309[param1];
    }

    public static getStyleWithIndex(param1: number): TextStyle {
        return TextStyleManager._SafeStr_2309.getWithIndex(param1);
    }

    public static setStyle(param1: string, param2: TextStyle): void {
        let _loc3_: boolean = !TextStyleManager._SafeStr_2309.hasKey(param1);
        param2.name = param1;
        TextStyleManager._SafeStr_2309[param1] = param2;
        if (_loc3_) {
            TextStyleManager._styleSheetNames.push(param1);
            TextStyleManager._SafeStr_2546.dispatchEvent(new Event("added"));
        } else {
            TextStyleManager._SafeStr_2546.dispatchEvent(new Event("change"));
        }
    }

    public static setStyles(param1: any[], param2: boolean = false): void {
        let _loc3_: any[] = null;
        if (param2) {
            _loc3_ = [TextStyleManager._SafeStr_2309["regular"], TextStyleManager._SafeStr_2309["italic"], TextStyleManager._SafeStr_2309["bold"]];
            TextStyleManager._SafeStr_2309.reset();
            TextStyleManager._SafeStr_2309["regular"] = _loc3_[0];
            TextStyleManager._SafeStr_2309["italic"] = _loc3_[1];
            TextStyleManager._SafeStr_2309["bold"] = _loc3_[2];
        }
        let _loc4_: number = TextStyleManager._SafeStr_2309.length | 0;
        for (const _loc5_ of param1 ?? []) {
            TextStyleManager._SafeStr_2309[_loc5_.name] = _loc5_;
            if (TextStyleManager._styleSheetNames.indexOf(_loc5_.name) == -1) {
                TextStyleManager._styleSheetNames.push(_loc5_.name);
            }
        }
        TextStyleManager._SafeStr_2546.dispatchEvent(new Event("change"));
        if (TextStyleManager._SafeStr_2309.length != _loc4_) {
            TextStyleManager._SafeStr_2546.dispatchEvent(new Event("added"));
        }
    }

    public static findMatchingTextStyle(param1: string): TextStyle {
        let _loc2_: TextStyle = null;
        let _loc3_: TextStyle = asInstanceOf(TextStyleManager.parseCSS(param1)[0], TextStyle);
        if (_loc3_) {
            _loc2_ = TextStyleManager._SafeStr_2309[_loc3_.name];
            if (_loc2_ && _loc2_.equals(_loc3_)) {
                return _loc2_;
            }
        }
        return null;
    }

    public static enumerateStyles(): any[] {
        let _loc3_: number = 0;
        let _loc1_: any[] = [];
        let _loc2_: number = TextStyleManager._SafeStr_2309.length | 0;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc1_.push(TextStyleManager._SafeStr_2309.getWithIndex(_loc3_));
            _loc3_++;
        }
        return _loc1_;
    }

    public static enumerateStyleNames(): any[] {
        return TextStyleManager._SafeStr_2309.getKeys();
    }

    public static getStyleNameArrayRef(): any[] {
        return TextStyleManager._styleSheetNames;
    }

    public static parseCSS(param1: string): any[] {
        let _loc7_: any = null;
        let _loc6_: TextStyle = null;
        let _loc5_: StyleSheet = new StyleSheet();
        _loc5_.parseCSS(param1);
        let _loc3_: any[] = TextStyleManager.parseStyleNamesFromCSS(param1);
        let _loc2_: any[] = [];
        for (const _loc4_ of _loc3_ ?? []) {
            _loc7_ = _loc5_.getStyle(stringOrNull(_loc4_));
            _loc6_ = new TextStyle();
            _loc6_.name = stringOrNull(_loc4_);
            _loc6_.color = _loc7_.color ? Number(String(_loc7_.color).replace("#", "0x")) >>> 0 : null;
            _loc6_.fontFamily = stringOrNull(_loc7_.fontFamily ? _loc7_.fontFamily : null);
            _loc6_.fontSize = _loc7_.fontSize ? parseInt(String(_loc7_.fontSize)) : null;
            _loc6_.fontStyle = stringOrNull(_loc7_.fontStyle ? _loc7_.fontStyle : null);
            _loc6_.fontWeight = stringOrNull(_loc7_.fontWeight ? _loc7_.fontWeight : null);
            _loc6_.kerning = _loc7_.kerning ? _loc7_.kerning == "true" : null;
            _loc6_.leading = _loc7_.leading ? parseInt(String(_loc7_.leading)) : null;
            _loc6_.letterSpacing = _loc7_.letterSpacing ? parseInt(stringOrNull(_loc7_.letterSpacing.toString())) : null;
            _loc6_.textDecoration = stringOrNull(_loc7_.textDecoration ? _loc7_.textDecoration : null);
            _loc6_.textIndent = _loc7_.textIndent ? parseInt(stringOrNull(_loc7_.textIndent.toString())) : null;
            _loc6_.antiAliasType = stringOrNull(_loc7_.antiAliasType ? _loc7_.antiAliasType : null);
            _loc6_.sharpness = _loc7_.sharpness ? parseInt(stringOrNull(_loc7_.sharpness)) : null;
            _loc6_.thickness = _loc7_.thickness ? parseInt(stringOrNull(_loc7_.thickness)) : null;
            _loc6_.etchingColor = _loc7_.etchingColor ? Number(String(_loc7_.etchingColor).replace("#", "0x")) >>> 0 : null;
            _loc6_.etchingPosition = _loc7_.etchingPosition ? String(_loc7_.etchingPosition) : null;
            _loc2_.push(_loc6_);
        }
        return _loc2_;
    }

    private static parseStyleNamesFromCSS(param1: string): any[] {
        let _loc2_: any[] = [];
        let _loc3_: string = param1;
        _loc3_ = _loc3_.split("\t").join("");
        _loc3_ = _loc3_.split("\n").join("");
        _loc3_ = _loc3_.split("\r").join("");
        let _loc4_: any[] = _loc3_.split("}");
        if (TextStyleManager.countSubStrings(param1, "{") != TextStyleManager.countSubStrings(param1, "}")) {
            throw new Error("Mismatching amount of \"{\" versus \"}\", please check the CSS!");
        }
        for (let _loc5_ of _loc4_ ?? []) {
            while (_loc5_.indexOf("/*") == 0) {
                _loc5_ = _loc5_.substring(_loc5_.indexOf("*/") + 2, _loc5_.length);
            }
            _loc5_ = _loc5_.slice(0, _loc5_.indexOf("{")).split(" ").join("");
            if (_loc5_.length) {
                _loc2_.push(_loc5_);
            }
        }
        return _loc2_;
    }

    private static countSubStrings(param1: string, param2: string): number {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        while (true) {
            _loc4_ = param1.indexOf(param2, _loc4_);
            if (_loc4_ == -1) {
                break;
            }
            _loc4_++;
            _loc3_++;
        }
        return _loc3_;
    }

    public static toString(): string {
        let _loc2_: any[] = TextStyleManager.enumerateStyles();
        let _loc1_: string = "";
        for (const _loc3_ of _loc2_ ?? []) {
            _loc1_ += _loc3_.toString() + "\n\n";
        }
        return _loc1_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TextStyleManager.#staticsReady) return;
        TextStyleManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TextStyleManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("REGULAR", null);
        set("ITALIC", null);
        set("BOLD", null);
        set("_SafeStr_2309", null);
        set("_styleSheetNames", null);
        set("_SafeStr_2546", null);
        set("TAG_OPEN", null);
        set("TAG_CLOSE", null);
        set("CMT_OPEN", null);
        set("CMT_CLOSE", null);
        set("REGULAR", "regular");
        set("ITALIC", "italic");
        set("BOLD", "bold");
        set("_SafeStr_2309", null);
        set("_styleSheetNames", null);
        set("_SafeStr_2546", null);
        set("TAG_OPEN", "{");
        set("TAG_CLOSE", "}");
        set("CMT_OPEN", "/*");
        set("CMT_CLOSE", "*/");
        TextStyleManager.init();
    }
}
