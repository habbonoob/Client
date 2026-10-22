import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Font } from '@habbo-pixi/runtime/text/Font';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FontEnum {
    static { registerClassName(this, 'com.sulake.core.utils::FontEnum'); }

    static #staticsReady = false;

    private static get _systemFonts(): UtilsMap {
        FontEnum.#initStatics();
        return FontEnum._systemFonts;
    }

    private static get _embeddedFonts(): UtilsMap {
        FontEnum.#initStatics();
        return FontEnum._embeddedFonts;
    }

    private static get _init_FontEnum(): boolean {
        FontEnum.#initStatics();
        return FontEnum._init_FontEnum;
    }
    private static set _init_FontEnum(value: boolean) {
        FontEnum.#initStatics();
        FontEnum._init_FontEnum = value;
    }

    public static get systemFonts(): UtilsMap {
        return FontEnum._systemFonts;
    }

    public static get embeddedFonts(): UtilsMap {
        return FontEnum._embeddedFonts;
    }

    public static isSystemFont(param1: string): boolean {
        return FontEnum._systemFonts.getValue(param1) != null;
    }

    public static isEmbeddedFont(param1: string): boolean {
        return FontEnum._embeddedFonts.getValue(param1) != null;
    }

    public static registerFont(param1: any): Font {
        let _loc2_: Font = null;
        let _loc5_: any = 0;
        Font.registerFont(typeof param1 === "function" ? param1 : null);
        let _loc3_: string = getQualifiedClassName(param1);
        let _loc6_: any[] = Font.enumerateFonts(false);
        let _loc4_: number = 0;
        _loc5_ = _loc4_ = _loc6_.length | 0;
        while (_loc5_ > 0) {
            _loc2_ = _loc6_[_loc5_ - 1];
            if (getQualifiedClassName(_loc2_) == _loc3_) {
                break;
            }
            _loc5_--;
        }
        FontEnum._embeddedFonts.add(_loc2_.fontName, _loc2_);
        return _loc2_;
    }

    public static refresh(): void {
        let _loc1_: Font = null;
        let _loc5_: Font = null;
        let _loc3_: number = 0;
        let _loc4_: any[] = Font.enumerateFonts(false);
        let _loc2_: number = _loc4_.length | 0;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc1_ = _loc4_[_loc3_];
            _loc5_ = FontEnum._embeddedFonts.getValue(_loc1_.fontName);
            if (!_loc5_ || _loc5_.fontType != _loc1_.fontType || _loc5_.fontStyle != _loc1_.fontStyle) {
                FontEnum._embeddedFonts.add(_loc1_.fontName, _loc1_);
            }
            _loc3_++;
        }
    }

    private static init(): void {
        let _loc2_: any[] = null;
        let _loc1_: any[] = null;
        if (!FontEnum._init_FontEnum) {
            _loc2_ = Font.enumerateFonts(true);
            _loc1_ = Font.enumerateFonts(false);
            for (const _loc3_ of _loc2_ ?? []) {
                if (_loc1_.indexOf(_loc3_) == -1) {
                    FontEnum._systemFonts.add(_loc3_.fontName, _loc3_);
                }
            }
            FontEnum._init_FontEnum = true;
        }
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FontEnum.#staticsReady) return;
        FontEnum.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FontEnum, name, { value, writable: true, configurable: true, enumerable: true });
        set("_systemFonts", null);
        set("_embeddedFonts", null);
        set("_init_FontEnum", false);
        set("_systemFonts", new UtilsMap());
        set("_embeddedFonts", new UtilsMap());
        set("_init_FontEnum", false);
        FontEnum.init();
    }
}
