import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';

export class CountdownWidget implements ICountdownWidget, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::CountdownWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "countdown";
    private static readonly RUNNING_KEY: string = "countdown:running";
    private static readonly _SafeStr_7656: string = "countdown:digits";
    private static readonly _SafeStr_8177: string = "countdown:seconds";
    private static readonly COLOR_STYLE_KEY: string = "countdown:color_style";
    private static readonly UNIT_KEY_PREFIX: string = "countdown_clock_unit_";

    private static get RUNNING_DEFAULT(): PropertyStruct {
        CountdownWidget.#initStatics();
        return CountdownWidget.RUNNING_DEFAULT;
    }

    private static get DIGITS_DEFAULT(): PropertyStruct {
        CountdownWidget.#initStatics();
        return CountdownWidget.DIGITS_DEFAULT;
    }

    private static get SECONDS_DEFAULT(): PropertyStruct {
        CountdownWidget.#initStatics();
        return CountdownWidget.SECONDS_DEFAULT;
    }

    private static get COLOR_STYLE_DEFAULT(): PropertyStruct {
        CountdownWidget.#initStatics();
        return CountdownWidget.COLOR_STYLE_DEFAULT;
    }

    private static readonly _SafeStr_6829: any[] = ["weeks", "days", "hours", "minutes", "seconds"];
    private static readonly _SafeStr_5209: any[] = [604800, 86400, 3600, 60, 1];
    private static readonly UNIT_MAX_VALUES: any[] = [100, 7, 24, 60, 60];
    private static readonly COLOR_STYLES_VALUES: any[] = [0, 16777215];
    private static readonly COLOR_STYLES_ETCHING_VALUES: any[] = [3003121663, 0];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IItemListWindow;

    declare private _SafeStr_3936: IWindowContainer;

    declare private _SafeStr_4232: ITextWindow;

    private _running: boolean = Boolean(CountdownWidget.RUNNING_DEFAULT.value);
    private _startSeconds: number = CountdownWidget.SECONDS_DEFAULT.value | 0;
    private _startTime: number = getTimer();
    private _colorStyle: number = CountdownWidget.COLOR_STYLE_DEFAULT.value | 0;
    private _displayedTime: number = -1;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("clock_base_xml").content, XML)), isIItemListWindow);
        this._SafeStr_3936 = asGuarded(this._root.getListItemByName("counter"), isIWindowContainer);
        this._SafeStr_4232 = asGuarded(this._root.getListItemByName("separator"), isITextWindow);
        this.digits = CountdownWidget.DIGITS_DEFAULT.value >>> 0;
        this._windowManager.registerUpdateReceiver(this, 10);
        this._SafeStr_2293.setParamFlag(147456);
        this._SafeStr_2293.rootWindow = this._root;
    }

    private static getMaxUnitIndex(param1: number, param2: number): number {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < CountdownWidget._SafeStr_5209.length - param1) {
            if (param2 >= CountdownWidget._SafeStr_5209[_loc3_] >>> 0) {
                return _loc3_;
            }
            _loc3_++;
        }
        return _loc3_;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_3936 != null) {
                this._SafeStr_3936.dispose();
                this._SafeStr_3936 = null;
            }
            if (this._SafeStr_4232 != null) {
                this._SafeStr_4232.dispose();
                this._SafeStr_4232 = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager.removeUpdateReceiver(this);
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public update(param1: number): void {
        this.updateTime();
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(CountdownWidget.RUNNING_DEFAULT.withValue(this._running));
        _loc1_.push(CountdownWidget.DIGITS_DEFAULT.withValue(this.digits));
        _loc1_.push(CountdownWidget.SECONDS_DEFAULT.withValue(this.seconds));
        _loc1_.push(CountdownWidget.COLOR_STYLE_DEFAULT.withValue(this.colorStyle));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "countdown:running":
                    this.running = Boolean(_loc2_.value);
                    break;
                case "countdown:digits":
                    this.digits = _loc2_.value >>> 0;
                    break;
                case "countdown:seconds":
                    this.seconds = _loc2_.value | 0;
                    break;
                case "countdown:color_style":
                    this.colorStyle = _loc2_.value | 0;
            }
        }
    }

    public get colorStyle(): number {
        return this._colorStyle;
    }

    public set colorStyle(param1: number) {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc5_: ITextWindow = null;
        let _loc6_: any = 0;
        let _loc7_: any = 0;
        this._colorStyle = param1;
        let _loc4_: number = this._root.numListItems;
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            _loc2_ = asGuarded(this._root.getListItemAt(_loc3_ >>> 0), isIWindowContainer);
            if (_loc2_ != null) {
                _loc5_ = asGuarded(_loc2_.getChildByName("unit"), isITextWindow);
                if (_loc5_ != null) {
                    _loc6_ = _loc5_.textColor;
                    _loc7_ = _loc5_.etchingColor;
                    if (this.colorStyle >= 0 && this.colorStyle < CountdownWidget.COLOR_STYLES_VALUES.length) {
                        _loc6_ = CountdownWidget.COLOR_STYLES_VALUES[this.colorStyle] >>> 0;
                        _loc7_ = CountdownWidget.COLOR_STYLES_ETCHING_VALUES[this.colorStyle] >>> 0;
                    }
                    _loc5_.textColor = _loc6_ >>> 0;
                    _loc5_.etchingColor = _loc7_ >>> 0;
                }
            }
            _loc3_++;
        }
    }

    public get running(): boolean {
        return this._running;
    }

    public set running(param1: boolean) {
        if (this._running && !param1) {
            this._startSeconds = this.seconds;
        }
        if (!this._running && param1) {
            this._startTime = getTimer();
        }
        this._running = param1;
    }

    public get digits(): number {
        return (this._root.numListItems + 1) / 2 >>> 0;
    }

    public set digits(param1: number) {
        let _loc2_: number = 0;
        param1 = Math.max(2, Math.min(4, param1)) >>> 0;
        if (param1 != this.digits) {
            this._root.removeListItems();
            _loc2_ = 0;
            while (_loc2_ < param1) {
                if (_loc2_ != 0) {
                    this._root.addListItem(this._SafeStr_4232.clone());
                }
                this._root.addListItem(this._SafeStr_3936.clone());
                _loc2_++;
            }
            this.updateTime(true);
        }
    }

    public get seconds(): number {
        return (this._running ? Math.max(0, this._startSeconds - (getTimer() - this._startTime) / 1000) : this._startSeconds) | 0;
    }

    public set seconds(param1: number) {
        this._startSeconds = param1;
        this._startTime = getTimer();
        this.updateTime();
    }

    private updateTime(param1: boolean = false): void {
        let _loc5_: number = 0;
        let _loc8_: number = 0;
        let _loc3_: IWindowContainer = null;
        let _loc7_: number = 0;
        let _loc6_: number = this.seconds;
        if (_loc6_ == this._displayedTime && !param1) {
            return;
        }
        let _loc4_: number = this.digits | 0;
        let _loc2_: number = CountdownWidget.getMaxUnitIndex(_loc4_, _loc6_);
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc8_ = _loc2_ + _loc5_;
            _loc3_ = asGuarded(this._root.getListItemAt(_loc5_ * 2 >>> 0), isIWindowContainer);
            _loc7_ = _loc6_ / CountdownWidget._SafeStr_5209[_loc8_] % CountdownWidget.UNIT_MAX_VALUES[_loc8_] | 0;
            _loc3_.getChildByName("value").caption = (_loc7_ < 10 ? "0" : "") + _loc7_.toString();
            _loc3_.getChildByName("unit").caption = "${countdown_clock_unit_" + CountdownWidget._SafeStr_6829[_loc8_] + "}";
            _loc5_++;
        }
        this._displayedTime = _loc6_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CountdownWidget.#staticsReady) return;
        CountdownWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CountdownWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("RUNNING_DEFAULT", null);
        set("DIGITS_DEFAULT", null);
        set("SECONDS_DEFAULT", null);
        set("COLOR_STYLE_DEFAULT", null);
        set("RUNNING_DEFAULT", new PropertyStruct("countdown:running", false, "Boolean"));
        set("DIGITS_DEFAULT", new PropertyStruct("countdown:digits", 3, "uint"));
        set("SECONDS_DEFAULT", new PropertyStruct("countdown:seconds", 0, "int"));
        set("COLOR_STYLE_DEFAULT", new PropertyStruct("countdown:color_style", 0, "int"));
    }

    get [ICountdownWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
