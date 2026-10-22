import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class TextAreaPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::TextAreaPreset'); }

    declare private _container: IWindowContainer;

    declare private _SafeStr_3190: IWindow;

    declare private _SafeStr_2179: ITextFieldWindow;

    declare private _placeholder: TextPreset;

    declare private _SafeStr_2147: TextAreaParam;

    declare private _cachedText: string;

    private _changeListeners: ((...args: any[]) => any)[] = Array.from([]);

    declare private _SafeStr_4751: number;
    static { (this.prototype as any)._SafeStr_4751 = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: TextAreaParam) {
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
        this._SafeStr_2179.multiline = true;
        this._SafeStr_2179.wordWrap = param4.wordwrap;
        if (param4.width >= 0) {
            this._SafeStr_3190.width = param4.width + this._SafeStr_4751;
        }
        this._SafeStr_3190.height = param4.height;
        if (param4.maxLines >= 0) {
            this._SafeStr_2179.maxLines = param4.maxLines;
        }
        this._SafeStr_2179.editable = param4.editable;
        this._SafeStr_2179.restrict = param4.restrict;
        if (param4.tooltip != null) {
            this._SafeStr_2179.toolTipCaption = param4.tooltip;
        }
        this._container.addChild(this._SafeStr_3190);
        if (param4.placeholder != null) {
            this._placeholder = param2.createText(param4.placeholder, new TextParam(1));
            this._placeholder.window.blend = 0.5;
            this._placeholder.window.tags.push("HALF_BLEND");
            this._placeholder.window.x = this._SafeStr_2179.x;
            this._placeholder.window.y = this._SafeStr_2179.y;
            this._container.addChild(this._placeholder.window);
        }
        this._SafeStr_2179.addEventListener("WE_CHANGE", this.textHasChanged);
        this.textHasChanged(null);
    }

    private textHasChanged = (param1: WindowEvent): void => {
        if (this._placeholder) {
            this._placeholder.visible = this._SafeStr_2179.length == 0;
        }
        this.updateWarn();
        let _loc2_: string = this.text;
        if (_loc2_ != this._cachedText) {
            this._cachedText = _loc2_;
            for (const _loc3_ of this._changeListeners ?? []) {
                _loc3_(_loc2_);
            }
        }
    };

    public get text(): string {
        return this._SafeStr_2179.text.replace(/\n\r/g, "\n").replace(/\r/g, "\n");
    }

    public set text(param1: string) {
        this._SafeStr_2179.text = param1.replace(/\n/g, "\r");
        this.textHasChanged(null);
    }

    public set selectable(param1: boolean) {
        this._SafeStr_2179.selectable = param1;
    }

    public reset(): void {
        this._SafeStr_2179.text = "";
        this.textHasChanged(null);
    }

    public addChangeListener(param1: (...args: any[]) => any): void {
        if (this._changeListeners.indexOf(param1) == -1) {
            this._changeListeners.push(param1);
        }
    }

    public removeChangeListener(param1: (...args: any[]) => any): void {
        let _loc2_: number = this._changeListeners.indexOf(param1);
        if (_loc2_ != -1) {
            this._changeListeners.splice(_loc2_, 1);
        }
    }

    public get currentLength(): number {
        return this._SafeStr_2179.length;
    }

    public get maxCharacters(): number {
        return this._SafeStr_2147.maxCharacters;
    }

    public focus(): boolean {
        return this._SafeStr_2179.focus();
    }

    public insertText(param1: string): boolean {
        let _loc2_: string = this._SafeStr_2179.text;
        let _loc4_: number = this._SafeStr_2179.selectionBeginIndex;
        let _loc3_: number = this._SafeStr_2179.selectionEndIndex;
        if (this._SafeStr_2147.maxCharacters > 0 && _loc2_.length - (_loc3_ - _loc4_) + param1.length > this._SafeStr_2147.maxCharacters) {
            return false;
        }
        this._SafeStr_2179.text = _loc2_.substring(0, _loc4_) + param1 + _loc2_.substring(_loc3_);
        this.textHasChanged(null);
        let _loc5_: number = _loc4_ + param1.length;
        this._SafeStr_2179.setSelection(_loc5_, _loc5_);
        this._SafeStr_2179.focus();
        return true;
    }

    public wrapSelection(param1: string, param2: string): boolean {
        let _loc4_: number = 0;
        let _loc3_: string = this._SafeStr_2179.text;
        let _loc7_: number = this._SafeStr_2179.selectionBeginIndex;
        let _loc5_: number = this._SafeStr_2179.selectionEndIndex;
        if (_loc7_ >= param1.length && _loc5_ + param2.length <= _loc3_.length && _loc3_.substring(_loc7_ - param1.length, _loc7_) == param1 && _loc3_.substring(_loc5_, _loc5_ + param2.length) == param2) {
            this._SafeStr_2179.text = _loc3_.substring(0, _loc7_ - param1.length) + _loc3_.substring(_loc7_, _loc5_) + _loc3_.substring(_loc5_ + param2.length);
            this.textHasChanged(null);
            _loc4_ = _loc7_ - param1.length;
            this._SafeStr_2179.setSelection(_loc4_, _loc4_ + _loc5_ - _loc7_);
            this._SafeStr_2179.focus();
            return true;
        }
        if (this._SafeStr_2147.maxCharacters > 0 && _loc3_.length + param1.length + param2.length > this._SafeStr_2147.maxCharacters) {
            return false;
        }
        this._SafeStr_2179.text = _loc3_.substring(0, _loc7_) + param1 + _loc3_.substring(_loc7_, _loc5_) + param2 + _loc3_.substring(_loc5_);
        this.textHasChanged(null);
        let _loc6_: number = _loc7_ + param1.length;
        this._SafeStr_2179.setSelection(_loc6_, _loc6_ + _loc5_ - _loc7_);
        this._SafeStr_2179.focus();
        return true;
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

    protected override get childPresets(): any[] {
        return this._placeholder == null ? [] : [this._placeholder];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_2179.removeEventListener("WE_CHANGE", this.textHasChanged);
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._placeholder = null;
        this._SafeStr_2147 = null;
        this._cachedText = null;
        this._changeListeners.length = 0;
        this._changeListeners = null;
        this._SafeStr_2179 = null;
        this._SafeStr_3190 = null;
    }

    private get charLimitWarnArea(): IWindowContainer {
        return asGuarded(this._container.findChildByName("char_limit_warn"), isIWindowContainer);
    }

    private get limitText(): ITextWindow {
        return asGuarded(this._container.findChildByName("limit_text"), isITextWindow);
    }
}
