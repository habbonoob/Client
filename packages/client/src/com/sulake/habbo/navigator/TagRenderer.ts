import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/navigator/Util';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class TagRenderer {
    static { registerClassName(this, 'com.sulake.habbo.navigator::TagRenderer'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        TagRenderer.#initStatics();
        return TagRenderer._log;
    }

    constructor(param1: IHabboTransitionalNavigator, param2: (...args: any[]) => any = null) {
        this._navigator = param1;
        this._SafeStr_4472 = param2;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _SafeStr_4472: (...args: any[]) => any;

    private _useHashTags: boolean = false;

    public set useHashTags(param1: boolean) {
        this._useHashTags = param1;
    }

    public dispose(): void {
        this._navigator = null;
        this._SafeStr_4472 = null;
    }

    public refreshTags(param1: IWindowContainer, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc3_: IWindowContainer = castGuarded(param1.findChildByName("tags"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc4_ = 0;
        while (_loc4_ < 4) {
            this.refreshTag(_loc3_, _loc4_, stringOrNull(param2[_loc4_]));
            _loc4_++;
        }
        let _loc5_: number = param1.width - _loc3_.x;
        Util.layoutChildrenInArea(_loc3_, _loc5_, 14);
        _loc3_.height = Util.getLowestPoint(_loc3_);
        _loc3_.visible = param2.length > 0;
    }

    public refreshTag(param1: IWindowContainer, param2: number, param3: string): void {
        let _loc4_: ITextWindow = null;
        let _loc5_: string = "tag." + param2;
        let _loc6_: IWindowContainer = castGuarded(param1.getChildByName(_loc5_), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (param3 == null || param3 == "") {
            if (_loc6_ != null) {
                _loc6_.visible = false;
            }
        } else {
            if (_loc6_ == null) {
                _loc6_ = castGuarded(this._navigator.getXmlWindow("iro_tag"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                _loc6_.name = _loc5_;
                param1.addChild(_loc6_);
                _loc6_.procedure = this.tagProcedure;
            }
            _loc4_ = castGuarded(_loc6_.findChildByName("txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc4_.text = (this._useHashTags ? "#" : "") + param3;
            _loc4_.width = _loc4_.textWidth + 5 | 0;
            _loc6_.width = _loc4_.width + 3;
            this.refreshTagBg(_loc6_, false);
            _loc6_.visible = true;
        }
    }

    private refreshTagBg(param1: IWindowContainer, param2: boolean): void {
        this.refreshBgPiece(param1, "l", param2);
        this.refreshBgPiece(param1, "m", param2);
        this.refreshBgPiece(param1, "r", param2);
    }

    private tagProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITextWindow = null;
        let _loc4_: string = null;
        let _loc5_: IWindowContainer = isIWindowContainer(param2) ? param2 : null;
        if (_loc5_ == null) {
            return;
        }
        if (param1.type == "WME_OVER") {
            this.refreshTagBg(_loc5_, true);
        } else if (param1.type == "WME_OUT") {
            this.refreshTagBg(_loc5_, false);
        } else if (param1.type == "WME_CLICK") {
            _loc3_ = castGuarded(_loc5_.findChildByName("txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc4_ = this._useHashTags ? _loc3_.text.substr(1, _loc3_.text.length - 1) : _loc3_.text;
            TagRenderer._log.info("TAG CLICKED: " + _loc4_);
            this._navigator.performTagSearch(_loc4_);
            if (this._SafeStr_4472 != null) {
                this._SafeStr_4472();
            }
        }
    };

    private refreshBgPiece(param1: IWindowContainer, param2: string, param3: boolean): void {
        let _loc4_: string = null;
        let _loc5_: IBitmapWrapperWindow = castGuarded(param1.findChildByName("bg_" + param2), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        if (_loc5_.tags[0] != "" + param3) {
            _loc5_.tags.splice(0, _loc5_.tags.length);
            _loc5_.tags.push("" + param3);
            _loc4_ = "tag_" + param2 + (param3 ? "_reactive" : "");
            _loc5_.bitmap = this._navigator.getButtonImage(_loc4_);
            _loc5_.disposesBitmap = false;
            _loc5_.invalidate();
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TagRenderer.#staticsReady) return;
        TagRenderer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TagRenderer, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.navigator.TagRenderer"));
    }
}
