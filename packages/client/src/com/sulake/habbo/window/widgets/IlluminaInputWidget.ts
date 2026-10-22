import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import type { IIlluminaInputHandler } from '@/com/sulake/habbo/window/widgets/IIlluminaInputHandler';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';
import { IIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';

export class IlluminaInputWidget implements IIlluminaInputWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::IlluminaInputWidget'); }

    static #staticsReady = false;

    public static readonly TYPE: string = "illumina_input";
    private static readonly _SafeStr_7712: string = "illumina_input:button_caption";
    private static readonly _SafeStr_8457: string = "illumina_input:empty_message";
    private static readonly MULTILINE_KEY: string = "illumina_input:multiline";
    private static readonly MAX_CHARS_KEY: string = "illumina_input:max_chars";
    private static readonly SINGLE_LINE_HEIGHT: number = 28;

    private static get BUTTON_CAPTION_DEFAULT(): PropertyStruct {
        IlluminaInputWidget.#initStatics();
        return IlluminaInputWidget.BUTTON_CAPTION_DEFAULT;
    }

    private static get EMPTY_MESSAGE_DEFAULT(): PropertyStruct {
        IlluminaInputWidget.#initStatics();
        return IlluminaInputWidget.EMPTY_MESSAGE_DEFAULT;
    }

    private static get MULTILINE_DEFAULT(): PropertyStruct {
        IlluminaInputWidget.#initStatics();
        return IlluminaInputWidget.MULTILINE_DEFAULT;
    }

    private static get MAX_CHARS_DEFAULT(): PropertyStruct {
        IlluminaInputWidget.#initStatics();
        return IlluminaInputWidget.MAX_CHARS_DEFAULT;
    }

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._windowManager.assets.getAssetByName("illumina_input_xml").content, XML)), isIWindowContainer);
        this._root.width = this._SafeStr_2293.width;
        this._submitButton = asGuarded(this._root.findChildByName("submit"), isIButtonWindow);
        this._SafeStr_2135 = asGuarded(this._root.findChildByName("input"), isITextFieldWindow);
        this._emptyMessageLabel = asGuarded(this._root.findChildByName("empty_message"), isILabelWindow);
        this.buttonCaption = String(IlluminaInputWidget.BUTTON_CAPTION_DEFAULT.value);
        this.emptyMessage = String(IlluminaInputWidget.EMPTY_MESSAGE_DEFAULT.value);
        this.multiline = Boolean(IlluminaInputWidget.MULTILINE_DEFAULT.value);
        this.maxChars = IlluminaInputWidget.MAX_CHARS_DEFAULT.value | 0;
        this.refresh();
        this._root.procedure = this.widgetProcedure;
        this._SafeStr_2293.rootWindow = this._root;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _submitButton: IButtonWindow;

    declare private _SafeStr_2135: ITextFieldWindow;

    declare private _emptyMessageLabel: ILabelWindow;

    declare private _submitHandler: IIlluminaInputHandler;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get properties(): any[] {
        let _loc1_: any[] = [];
        if (this._disposed) {
            return _loc1_;
        }
        _loc1_.push(IlluminaInputWidget.BUTTON_CAPTION_DEFAULT.withValue(this.buttonCaption));
        _loc1_.push(IlluminaInputWidget.EMPTY_MESSAGE_DEFAULT.withValue(this.emptyMessage));
        _loc1_.push(IlluminaInputWidget.MULTILINE_DEFAULT.withValue(this.multiline));
        _loc1_.push(IlluminaInputWidget.MAX_CHARS_DEFAULT.withValue(this.maxChars));
        return _loc1_;
    }

    public set properties(param1: any[]) {
        if (this._disposed) {
            return;
        }
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "illumina_input:button_caption":
                    this.buttonCaption = String(_loc2_.value);
                    break;
                case "illumina_input:empty_message":
                    this.emptyMessage = String(_loc2_.value);
                    break;
                case "illumina_input:multiline":
                    this.multiline = Boolean(_loc2_.value);
                    break;
                case "illumina_input:max_chars":
                    this.maxChars = _loc2_.value | 0;
            }
        }
    }

    public get buttonCaption(): string {
        return this._submitButton.caption;
    }

    public set buttonCaption(param1: string) {
        this._submitButton.caption = param1;
        this._submitButton.visible = param1 != null && param1.length > 0;
        this.refresh();
    }

    public get emptyMessage(): string {
        return this._emptyMessageLabel.caption;
    }

    public set emptyMessage(param1: string) {
        this._emptyMessageLabel.caption = param1;
    }

    public get multiline(): boolean {
        return this._SafeStr_2135.multiline;
    }

    public set multiline(param1: boolean) {
        this._SafeStr_2135.multiline = param1;
        this._root.setParamFlag(2048, param1);
        this._root.height = param1 ? this._SafeStr_2293.height : 28;
    }

    public get maxChars(): number {
        return this._SafeStr_2135.maxChars;
    }

    public set maxChars(param1: number) {
        this._SafeStr_2135.maxChars = param1;
    }

    public get message(): string {
        return this._SafeStr_2135.caption;
    }

    public set message(param1: string) {
        this._SafeStr_2135.caption = param1;
        this.refresh();
    }

    public get submitHandler(): IIlluminaInputHandler {
        return this._submitHandler;
    }

    public set submitHandler(param1: IIlluminaInputHandler) {
        this._submitHandler = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2135 != null) {
                this._SafeStr_2135 = null;
            }
            this._submitButton = null;
            this._emptyMessageLabel = null;
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    private widgetProcedure = (param1: WindowEvent, param2: IWindow): void => {
        switch (param1.type) {
            case "WE_CHANGE":
                if (param2 == this._SafeStr_2135) {
                    this.refresh();
                }
                break;
            case "WKE_KEY_DOWN":
                if (param2 == this._SafeStr_2135 && castTo(param1, WindowKeyboardEvent).charCode == 13 && Boolean(this._submitButton.visible)) {
                    this.submitMessage();
                }
                break;
            case "WME_CLICK":
                if (param2 == this._submitButton) {
                    this.submitMessage();
                }
        }
    };

    private submitMessage(): void {
        if (this._submitHandler != null) {
            this._submitHandler.onInput(this._SafeStr_2293, this.message);
        }
    }

    private refresh(): void {
        this._emptyMessageLabel.visible = this._SafeStr_2135.length == 0;
        this._SafeStr_2135.width = (this._submitButton.visible ? this._submitButton.x : this._root.width) - this._SafeStr_2135.x * 2;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (IlluminaInputWidget.#staticsReady) return;
        IlluminaInputWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(IlluminaInputWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("BUTTON_CAPTION_DEFAULT", null);
        set("EMPTY_MESSAGE_DEFAULT", null);
        set("MULTILINE_DEFAULT", null);
        set("MAX_CHARS_DEFAULT", null);
        set("BUTTON_CAPTION_DEFAULT", new PropertyStruct("illumina_input:button_caption", "${widgets.chatinput.say}", "String"));
        set("EMPTY_MESSAGE_DEFAULT", new PropertyStruct("illumina_input:empty_message", "", "String"));
        set("MULTILINE_DEFAULT", new PropertyStruct("illumina_input:multiline", false, "Boolean"));
        set("MAX_CHARS_DEFAULT", new PropertyStruct("illumina_input:max_chars", 0, "int"));
    }

    get [IIlluminaInputWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
