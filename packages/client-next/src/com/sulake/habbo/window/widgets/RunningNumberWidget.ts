import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { IRunningNumberWidget } from '@/com/sulake/habbo/window/widgets/IRunningNumberWidget';

export class RunningNumberWidget implements IRunningNumberWidget, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::RunningNumberWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "running_number";
    private static readonly NUMBER_KEY: string = "running_number:number";
    private static readonly _SafeStr_7656: string = "running_number:digits";
    private static readonly COLOR_STYLE_KEY: string = "running_number:color_style";
    private static readonly _SafeStr_8510: string = "running_number:update_frequency";

    private static get NUMBER_DEFAULT(): PropertyStruct {
        RunningNumberWidget.#initStatics();
        return RunningNumberWidget.NUMBER_DEFAULT;
    }

    private static get DIGITS_DEFAULT(): PropertyStruct {
        RunningNumberWidget.#initStatics();
        return RunningNumberWidget.DIGITS_DEFAULT;
    }

    private static get COLOR_STYLE_DEFAULT(): PropertyStruct {
        RunningNumberWidget.#initStatics();
        return RunningNumberWidget.COLOR_STYLE_DEFAULT;
    }

    private static get UPDATE_FREQUENCY_DEFAULT(): PropertyStruct {
        RunningNumberWidget.#initStatics();
        return RunningNumberWidget.UPDATE_FREQUENCY_DEFAULT;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    private _colorStyle: number = RunningNumberWidget.COLOR_STYLE_DEFAULT.value | 0;
    private _SafeStr_4479: number = RunningNumberWidget.DIGITS_DEFAULT.value >>> 0;
    private _updateFrequency: number = RunningNumberWidget.UPDATE_FREQUENCY_DEFAULT.value | 0;
    private _newNumber: number = RunningNumberWidget.NUMBER_DEFAULT.value | 0;
    private _displayedNumber: number = 0;
    private _millisSinceLastUpdate: number = 0;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("running_number_xml").content, XML)), isIWindowContainer);
        this._windowManager.registerUpdateReceiver(this, this._updateFrequency >>> 0);
        this._SafeStr_2293.setParamFlag(147456);
        this._SafeStr_2293.rootWindow = this._root;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
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

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(RunningNumberWidget.NUMBER_DEFAULT.withValue(this.colorStyle));
        _loc1_.push(RunningNumberWidget.COLOR_STYLE_DEFAULT.withValue(this.colorStyle));
        _loc1_.push(RunningNumberWidget.DIGITS_DEFAULT.withValue(this.digits));
        _loc1_.push(RunningNumberWidget.UPDATE_FREQUENCY_DEFAULT.withValue(this.updateFrequency));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "running_number:number":
                    this.number = _loc2_.value | 0;
                    break;
                case "running_number:digits":
                    this.digits = _loc2_.value >>> 0;
                    break;
                case "running_number:color_style":
                    this.colorStyle = _loc2_.value | 0;
                    break;
                case "running_number:update_frequency":
                    this.updateFrequency = _loc2_.value | 0;
            }
        }
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public update(param1: number): void {
        if (this._displayedNumber < this.number) {
            this._millisSinceLastUpdate += param1;
            if (this._millisSinceLastUpdate > this._updateFrequency) {
                this._displayedNumber = Math.min(this._newNumber, this._displayedNumber + this._millisSinceLastUpdate / this._updateFrequency);
                this._millisSinceLastUpdate -= this._updateFrequency;
            }
            this.fieldValue = this._displayedNumber >>> 0;
        }
    }

    private set fieldValue(param1: number) {
        let _loc3_: string = param1.toString();
        while (_loc3_.length < this._SafeStr_4479) {
            _loc3_ = "0" + _loc3_;
        }
        let _loc2_: ITextWindow = castGuarded(this._root.findChildByName("number_field"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc2_.text = _loc3_;
        _loc2_.invalidate();
    }

    public get digits(): number {
        return this._SafeStr_4479;
    }

    public set digits(param1: number) {
        this._SafeStr_4479 = param1;
    }

    public get colorStyle(): number {
        return this._colorStyle;
    }

    public set colorStyle(param1: number) {
        this._colorStyle = param1;
    }

    public get updateFrequency(): number {
        return this._updateFrequency;
    }

    public set updateFrequency(param1: number) {
        this._updateFrequency = param1;
    }

    public get number(): number {
        return this._newNumber;
    }

    public set number(param1: number) {
        this._newNumber = param1;
    }

    public set initialNumber(param1: number) {
        this._displayedNumber = param1;
        this._newNumber = param1;
        this.fieldValue = this._displayedNumber >>> 0;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RunningNumberWidget.#staticsReady) return;
        RunningNumberWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RunningNumberWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("NUMBER_DEFAULT", null);
        set("DIGITS_DEFAULT", null);
        set("COLOR_STYLE_DEFAULT", null);
        set("UPDATE_FREQUENCY_DEFAULT", null);
        set("NUMBER_DEFAULT", new PropertyStruct("running_number:number", 0, "int"));
        set("DIGITS_DEFAULT", new PropertyStruct("running_number:digits", 8, "uint"));
        set("COLOR_STYLE_DEFAULT", new PropertyStruct("running_number:color_style", 0, "int"));
        set("UPDATE_FREQUENCY_DEFAULT", new PropertyStruct("running_number:update_frequency", 50, "int"));
    }

    get [IRunningNumberWidget](): true {
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
