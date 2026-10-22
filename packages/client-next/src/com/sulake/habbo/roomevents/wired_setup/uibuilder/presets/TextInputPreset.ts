import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class TextInputPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::TextInputPreset'); }

    declare private _container: IWindowContainer;

    declare private _SafeStr_3190: IWindow;

    declare private _SafeStr_2179: ITextFieldWindow;

    declare private _placeholder: TextPreset;

    declare private _SafeStr_2147: TextInputParam;

    declare private _SafeStr_4943: string;

    private _SafeStr_4407: any[] = null;

    declare private _SafeStr_4751: number;
    static { (this.prototype as any)._SafeStr_4751 = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: TextInputParam) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._SafeStr_3190 = param3.createTextInputView();
        this._SafeStr_2179 = asGuarded(this._SafeStr_3190.findChildByName("field"), isITextFieldWindow);
        this._SafeStr_4751 = this._SafeStr_3190.width - this._SafeStr_2179.width;
        this._SafeStr_2147 = param4;
        if (param4.maxCharacters > 0) {
            this._SafeStr_2179.maxChars = param4.maxCharacters;
        }
        this._SafeStr_2179.text = this._SafeStr_2147.initialText;
        if (param4.width >= 0) {
            this._SafeStr_3190.width = param4.width + this._SafeStr_4751;
        }
        this._SafeStr_2179.editable = param4.editable;
        this._SafeStr_2179.restrict = param4.restrict;
        if (param4.tooltip != null) {
            this._SafeStr_2179.toolTipCaption = param4.tooltip;
        }
        this._container.addChild(this._SafeStr_3190);
        if (param4.placeholder != null) {
            this._placeholder = param2.createText(param4.placeholder, new TextParam(2));
            this._placeholder.window.blend = 0.5;
            this._placeholder.window.tags.push("HALF_BLEND");
            this._container.addChild(this._placeholder.window);
            this._placeholder.window.x = this._SafeStr_2179.x;
            this._placeholder.window.y = this._SafeStr_2179.y;
        }
        this._SafeStr_2179.addEventListener("WE_CHANGE", this.textHasChanged);
        this.textHasChanged(null);
    }

    private textHasChanged = (param1: WindowEvent): void => {
        if (this._placeholder) {
            this._placeholder.window.visible = this._SafeStr_2179.text.length == 0;
        }
        if (this._SafeStr_2179.text != this._SafeStr_4943) {
            if (this._SafeStr_4407 != null) {
                for (const _loc2_ of this._SafeStr_4407 ?? []) {
                    _loc2_(this._SafeStr_2179.text);
                }
            }
            this._SafeStr_4943 = this._SafeStr_2179.text;
        }
        this.updateWarn();
    };

    public get text(): string {
        return this._SafeStr_2179.text;
    }

    public set text(param1: string) {
        this._SafeStr_2179.text = param1;
        this.textHasChanged(null);
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        let _loc2_: number = this._SafeStr_2147.width >= 0 ? this._SafeStr_2147.width + this._SafeStr_4751 : param1;
        this._SafeStr_3190.width = _loc2_;
        if (this._placeholder != null) {
            this._placeholder.resizeToWidth(_loc2_ - this._SafeStr_4751);
        }
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override hasStaticWidth(): boolean {
        return this._SafeStr_2147.width >= 0;
    }

    public override get staticWidth(): number {
        return this._SafeStr_2147.width + this._SafeStr_4751;
    }

    protected override get childPresets(): any[] {
        return this._placeholder == null ? [] : [this._placeholder];
    }

    public addListener(param1: (...args: any[]) => any): void {
        if (this._SafeStr_4407 == null) {
            this._SafeStr_4407 = [];
            this._SafeStr_4943 = this._SafeStr_2179.text;
        }
        this._SafeStr_4407.push(param1);
    }

    private shouldShowWarn(): boolean {
        let _loc2_: number = this._SafeStr_2147.maxCharacters;
        if (_loc2_ <= 10) {
            return false;
        }
        let _loc1_: number = Math.min(30, Math.max(6, _loc2_ / 5)) | 0;
        return this._SafeStr_2179.text.length > _loc2_ - _loc1_;
    }

    private updateWarn(): void {
        if (this.charLimitWarnArea == null) {
            return;
        }
        let _loc1_: boolean = this.shouldShowWarn();
        this.charLimitWarnArea.visible = _loc1_;
        if (_loc1_) {
            this.limitText.text = this._SafeStr_2179.text.length + "/" + this._SafeStr_2147.maxCharacters;
        }
    }

    public addEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._SafeStr_2179.addEventListener(param1, param2);
    }

    public removeEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._SafeStr_2179.removeEventListener(param1, param2);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_3190 = null;
        this._placeholder = null;
        this._SafeStr_2147 = null;
    }

    private get charLimitWarnArea(): IWindowContainer {
        return asGuarded(this._container.findChildByName("char_limit_warn"), isIWindowContainer);
    }

    private get limitText(): ITextWindow {
        return asGuarded(this._container.findChildByName("limit_text"), isITextWindow);
    }
}
