import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TextStyle } from '@/com/sulake/core/window/utils/TextStyle';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FontEnum } from '@/com/sulake/core/utils/FontEnum';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { TextStyleManager } from '@/com/sulake/core/window/utils/TextStyleManager';

export class TextFieldCache implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.utils::TextFieldCache'); }

    static #staticsReady = false;

    private static get _textFieldCache(): UtilsMap {
        TextFieldCache.#initStatics();
        return TextFieldCache._textFieldCache;
    }
    private static set _textFieldCache(value: UtilsMap) {
        TextFieldCache.#initStatics();
        TextFieldCache._textFieldCache = value;
    }

    private static get _instance(): TextFieldCache {
        TextFieldCache.#initStatics();
        return TextFieldCache._instance;
    }
    private static set _instance(value: TextFieldCache) {
        TextFieldCache.#initStatics();
        TextFieldCache._instance = value;
    }

    private _disposed: boolean = false;

    constructor() {
        if (TextFieldCache._instance == null) {
            TextStyleManager.events.addEventListener("change", this.onTextStyleChanged);
        }
    }

    public static getTextFieldByStyle(param1: TextStyle): TextField {
        let _loc2_: TextField = TextFieldCache._textFieldCache[param1.name];
        if (_loc2_) {
            return _loc2_;
        }
        _loc2_ = new TextField();
        let _loc3_: TextFormat = _loc2_.defaultTextFormat;
        if (!param1) {
            param1 = TextStyleManager.getStyle("regular");
        }
        _loc3_.font = param1.fontFamily;
        _loc3_.size = param1.fontSize;
        _loc3_.color = param1.color;
        _loc3_.bold = param1.fontWeight == "bold" ? true : null;
        _loc3_.italic = param1.fontStyle == "italic" ? true : null;
        _loc3_.underline = param1.textDecoration == "underline" ? true : null;
        _loc3_.indent = param1.textIndent;
        _loc3_.leading = param1.leading;
        _loc3_.kerning = param1.kerning;
        _loc3_.letterSpacing = param1.letterSpacing;
        _loc2_.antiAliasType = param1.antiAliasType == "normal" ? "normal" : "advanced";
        _loc2_.gridFitType = "pixel";
        _loc2_.sharpness = param1.sharpness ? typeof param1.sharpness === "number" && (param1.sharpness | 0) === param1.sharpness ? param1.sharpness : null : 0;
        _loc2_.thickness = param1.thickness ? typeof param1.thickness === "number" && (param1.thickness | 0) === param1.thickness ? param1.thickness : null : 0;
        if (!param1.fontWeight) {
            _loc3_.bold = false;
        }
        if (!param1.fontStyle) {
            _loc3_.italic = false;
        }
        if (!param1.textDecoration) {
            _loc3_.underline = false;
        }
        if (!param1.textIndent) {
            _loc3_.indent = 0;
        }
        if (!param1.leading) {
            _loc3_.leading = 0;
        }
        if (!param1.kerning) {
            _loc3_.kerning = false;
        }
        if (!param1.letterSpacing) {
            _loc3_.letterSpacing = 0;
        }
        if (!param1.antiAliasType) {
            _loc2_.antiAliasType = "advanced";
        }
        _loc2_.autoSize = "left";
        _loc2_.setTextFormat(_loc3_);
        _loc2_.embedFonts = FontEnum.isEmbeddedFont(_loc3_.font);
        _loc2_.defaultTextFormat = _loc3_;
        TextFieldCache._textFieldCache[param1.name] = _loc2_;
        return _loc2_;
    }

    public static getTextFieldByStyleName(param1: string): TextField {
        let _loc2_: TextStyle = TextStyleManager.getStyle(param1);
        if (!_loc2_) {
            return null;
        }
        return TextFieldCache.getTextFieldByStyle(_loc2_);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        TextStyleManager.events.removeEventListener("change", this.onTextStyleChanged);
        TextFieldCache._textFieldCache.reset();
        TextFieldCache._instance = null;
        this._disposed = true;
    }

    private onTextStyleChanged = (param1: Event): void => {
        TextFieldCache._textFieldCache.reset();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TextFieldCache.#staticsReady) return;
        TextFieldCache.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TextFieldCache, name, { value, writable: true, configurable: true, enumerable: true });
        set("_textFieldCache", null);
        set("_instance", null);
        set("_textFieldCache", new UtilsMap());
        set("_instance", new TextFieldCache());
    }

    get [IDisposable](): true {
        return true;
    }
}
