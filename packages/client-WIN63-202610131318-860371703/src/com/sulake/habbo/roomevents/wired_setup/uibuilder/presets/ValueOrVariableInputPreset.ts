import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ValueOrVariableInputPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ValueOrVariableInputPreset'); }

    private static readonly ICON_WIDTH: number = 19;
    private static readonly ICONS_WIDTH: number = 40;

    declare private _SafeStr_3190: IWindowContainer;

    declare private _SafeStr_14320: IWindowContainer;

    declare private _SafeStr_2179: ITextFieldWindow;

    declare private _SafeStr_14321: (...args: any[]) => any;

    declare private _textChangeListeners: any[];

    declare private _cachedText: string;

    declare private _SafeStr_14322: boolean;
    static { (this.prototype as any)._SafeStr_14322 = false; }

    declare private _SafeStr_14323: boolean;
    static { (this.prototype as any)._SafeStr_14323 = false; }

    declare private _SafeStr_4751: number;
    static { (this.prototype as any)._SafeStr_4751 = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _originalInputColor: number;
    static { (this.prototype as any)._originalInputColor = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any, param5: number = -1) {
        super(param1, param2, param3);
        this._SafeStr_14321 = param4;
        this._width = param5;
        this._textChangeListeners = [];
        this._SafeStr_3190 = asGuarded(param3.createTextInputView(), isIWindowContainer);
        this._SafeStr_3190.enableLookupCache();
        this._SafeStr_2179 = asGuarded(this._SafeStr_3190.findChildByName("field"), isITextFieldWindow);
        this._SafeStr_14320 = asGuarded(param2.createLayout("value_or_variable_input_icons"), isIWindowContainer);
        this._SafeStr_14320.enableLookupCache();
        this.targetTypeBitmap.setParamFlag(16, false);
        this._SafeStr_3190.addChild(this._SafeStr_14320);
        this._SafeStr_4751 = this._SafeStr_3190.width - this._SafeStr_2179.width;
        if (this.hasStaticWidth()) {
            this._SafeStr_3190.width = this.staticWidth;
        }
        this._originalInputColor = this._SafeStr_3190.color;
        this._cachedText = this._SafeStr_2179.text;
        ValueOrVariableInputPreset.setBitmap(this.variableBitmap, this.variableRegion, param1.getButtonImage("icon_variable_reference"));
        this.variableRegion.toolTipCaption = "${wiredfurni.params.variables.reference_value.popup}";
        this.variableRegion.addEventListener("WME_CLICK", this.onVariableRegionClicked);
        this._SafeStr_2179.addEventListener("WE_CHANGE", this.onTextChanged);
        this.layoutInput();
    }

    private static setBitmap(param1: IBitmapWrapperWindow, param2: IRegionWindow, param3: BitmapData): void {
        param1.bitmap = param3;
        param1.width = param3.width;
        param1.height = param3.height;
        param1.x = (param2.width - param1.width) / 2 | 0;
        param1.y = (param2.height - param1.height) / 2 | 0;
    }

    private static centerBitmap(param1: IBitmapWrapperWindow, param2: IRegionWindow): void {
        param1.x = (param2.width - param1.width) / 2 | 0;
        param1.y = (param2.height - param1.height) / 2 | 0;
    }

    public get text(): string {
        return this._SafeStr_2179.text;
    }

    public set text(param1: string) {
        this._SafeStr_2179.text = param1;
        this.onTextChanged(null);
    }

    public setTextSilently(param1: string): void {
        this._SafeStr_14322 = true;
        this._SafeStr_2179.text = param1;
        this._cachedText = this._SafeStr_2179.text;
        this._SafeStr_14322 = false;
    }

    public setTargetIndicator(param1: number, param2: boolean): void {
        let _loc4_: string = null;
        let _loc3_: any = 0;
        this._SafeStr_14323 = param2;
        this.targetTypeRegion.visible = param2;
        if (param2) {
            _loc4_ = WiredInputSourcePicker.getTypeNameForSource(param1);
            this.targetTypeRegion.toolTipCaption = this._roomEvents.localization.getLocalization("wiredfurni.params.sourcetype." + _loc4_);
            ValueOrVariableInputPreset.setBitmap(this.targetTypeBitmap, this.targetTypeRegion, this._roomEvents.getButtonImage("icon_source_" + _loc4_));
            _loc3_ = Util.lightenColor(WiredInputSourcePicker.getColorForSourceType(param1), 1.26);
            this.targetTypeBitmap.filters = [new GlowFilter(_loc3_ >>> 0, 0.7, 10, 10, 3.5, 1)];
        } else {
            this.targetTypeRegion.toolTipCaption = "";
            this.targetTypeBitmap.filters = [];
        }
        this.layoutInput();
    }

    public setInvalid(param1: string): void {
        let _loc2_: boolean = param1 != null && param1.length > 0;
        if (this.warningDisplay == null || this.errorText == null) {
            return;
        }
        this._SafeStr_3190.color = _loc2_ ? this._SafeStr_2144.invalidInputBackgroundColor : this._originalInputColor;
        this.warningDisplay.visible = _loc2_;
        if (_loc2_) {
            this.errorText.text = param1;
        }
    }

    public addTextChangeListener(param1: (...args: any[]) => any): void {
        this._textChangeListeners.push(param1);
    }

    public get anchorWindow(): IWindow {
        return this._SafeStr_3190;
    }

    private onTextChanged = (param1: WindowEvent): void => {
        if (this._SafeStr_2179.text == this._cachedText) {
            return;
        }
        this._cachedText = this._SafeStr_2179.text;
        if (this._SafeStr_14322) {
            return;
        }
        for (const _loc2_ of this._textChangeListeners ?? []) {
            _loc2_(this._cachedText);
        }
    };

    private onVariableRegionClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14321 != null) {
            this._SafeStr_14321();
        }
    };

    private layoutInput(): void {
        this._SafeStr_14320.x = this._SafeStr_3190.width - 40;
        this._SafeStr_14320.height = this._SafeStr_3190.height;
        this.targetTypeRegion.height = this._SafeStr_3190.height;
        this.variableRegion.height = this._SafeStr_3190.height;
        ValueOrVariableInputPreset.centerBitmap(this.targetTypeBitmap, this.targetTypeRegion);
        ValueOrVariableInputPreset.centerBitmap(this.variableBitmap, this.variableRegion);
        let _loc1_: number = this._SafeStr_14323 ? 40 : 19;
        this._SafeStr_2179.width = Math.max(0, this._SafeStr_3190.width - this._SafeStr_4751 - _loc1_) | 0;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_3190.width = this.hasStaticWidth() ? this.staticWidth : param1;
        this.layoutInput();
    }

    public override hasStaticWidth(): boolean {
        return this._width >= 0;
    }

    public override get staticWidth(): number {
        return this.hasStaticWidth() ? this._width + this._SafeStr_4751 : super.staticWidth;
    }

    public override get window(): IWindow {
        return this._SafeStr_3190;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.variableRegion.removeEventListener("WME_CLICK", this.onVariableRegionClicked);
        this._SafeStr_2179.removeEventListener("WE_CHANGE", this.onTextChanged);
        this._SafeStr_3190.removeChild(this._SafeStr_14320);
        this._SafeStr_14320.dispose();
        this._SafeStr_3190.dispose();
        this._SafeStr_14320 = null;
        this._SafeStr_3190 = null;
        this._SafeStr_2179 = null;
        this._SafeStr_14321 = null;
        this._textChangeListeners = null;
        super.dispose();
    }

    private get targetTypeRegion(): IRegionWindow {
        return asGuarded(this._SafeStr_14320.findChildByName("target_type_region"), isIRegionWindow);
    }

    private get variableRegion(): IRegionWindow {
        return asGuarded(this._SafeStr_14320.findChildByName("variable_region"), isIRegionWindow);
    }

    private get targetTypeBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._SafeStr_14320.findChildByName("target_type_bitmap"), isIBitmapWrapperWindow);
    }

    private get variableBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._SafeStr_14320.findChildByName("variable_bitmap"), isIBitmapWrapperWindow);
    }

    private get warningDisplay(): IWindow {
        return this._SafeStr_3190.findChildByName("warning_display");
    }

    private get errorText(): ITextWindow {
        return asGuarded(this._SafeStr_3190.findChildByName("error_text"), isITextWindow);
    }
}
