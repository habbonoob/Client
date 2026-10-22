import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class NumberInputPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::NumberInputPreset'); }

    declare private _SafeStr_3190: IWindow;

    declare private _SafeStr_2179: ITextFieldWindow;

    declare private _SafeStr_2147: NumberInputParam;

    declare private _number: number;
    static { (this.prototype as any)._number = 0; }

    declare private _SafeStr_5295: number;
    static { (this.prototype as any)._SafeStr_5295 = 0; }

    declare private _latestValidValueStr: string;

    declare private _min: number;
    static { (this.prototype as any)._min = 0; }

    declare private _SafeStr_4035: number;
    static { (this.prototype as any)._SafeStr_4035 = 0; }

    declare private _precision: number;
    static { (this.prototype as any)._precision = 0; }

    declare private _endsWithFive: boolean;
    static { (this.prototype as any)._endsWithFive = false; }

    declare private _SafeStr_4751: number;
    static { (this.prototype as any)._SafeStr_4751 = 0; }

    declare private _originalBorderColor: number;
    static { (this.prototype as any)._originalBorderColor = 0; }

    declare private _onValueChange: (...args: any[]) => any;

    private _ignoreListeners: boolean = false;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: NumberInputParam) {
        super(param1, param2, param3);
        this._SafeStr_3190 = param3.createTextInputView();
        this._SafeStr_3190.enableLookupCache();
        this._SafeStr_2179 = asGuarded(this._SafeStr_3190.findChildByName("field"), isITextFieldWindow);
        this._SafeStr_2147 = param4;
        this._SafeStr_4751 = this._SafeStr_3190.width - this._SafeStr_2179.width;
        if (param4.width >= 0) {
            this._SafeStr_3190.width = param4.width + this._SafeStr_4751;
        }
        this.setValidation(param4.min, param4.max, param4.precision, param4.endsWithFive);
        if (param4.tooltip != null) {
            this._SafeStr_2179.toolTipCaption = param4.tooltip;
        }
        this.captureOriginalInputState();
        this.setValue(param4.initialValue);
        this._SafeStr_2179.addEventListener("WE_CHANGE", this.onTextChange);
    }

    private static swapChars(param1: string, param2: number, param3: number): string {
        let _loc5_: any[] = param1.split("");
        let _loc4_: string = stringOrNull(_loc5_[param2]);
        _loc5_[param2] = _loc5_[param3];
        _loc5_[param3] = _loc4_;
        return _loc5_.join("");
    }

    private static isValidInt(param1: string): boolean {
        let _loc2_: RegExp = /^-?\d+$/;
        return _loc2_.test(param1);
    }

    public set onValueChange(param1: (...args: any[]) => any) {
        this._onValueChange = param1;
    }

    public setValidation(param1: number, param2: number, param3: number, param4: boolean): void {
        this._endsWithFive = param4;
        this._min = param4 ? param1 * 5 : param1;
        this._SafeStr_4035 = param4 ? param2 * 5 : param2;
        this._precision = param3;
        this._SafeStr_2179.restrict = "0123456789" + (param1 < 0 ? "\\-" : "") + (param3 > 0 ? ",." : "") + (this._SafeStr_2147.nonDecimalNotations ? "xba-fA-F" : "");
    }

    private displayValue(param1: number): string {
        let _loc3_: number = 0;
        let _loc2_: string = param1.toString();
        if (this._precision > 0) {
            while (_loc2_.length < this._precision + 1) {
                _loc2_ = "0" + _loc2_;
            }
            _loc2_ = _loc2_.substring(0, _loc2_.length - this._precision) + "." + _loc2_.substring(_loc2_.length - this._precision);
            while (_loc2_.charAt(_loc2_.length - 1) == "0") {
                _loc2_ = _loc2_.substring(0, _loc2_.length - 1);
            }
            if (_loc2_.charAt(_loc2_.length - 1) == ".") {
                _loc2_ = _loc2_.substring(0, _loc2_.length - 1);
            }
        }
        if (this._precision < 0) {
            _loc3_ = 0;
            while (_loc3_ > this._precision) {
                _loc2_ += "0";
                _loc3_ -= 1;
            }
        }
        return _loc2_;
    }

    private setValue(param1: number): void {
        this._ignoreListeners = true;
        this._number = param1;
        this._SafeStr_5295 = param1;
        this._latestValidValueStr = this.displayValue(this._endsWithFive ? param1 * 5 : param1);
        this._SafeStr_2179.text = this._latestValidValueStr;
        this.updateInvalidState(null);
        this._ignoreListeners = false;
    }

    public set value(param1: number) {
        this.setValue(param1);
    }

    public reset(): void {
        this.setValue(this._SafeStr_2147.initialValue);
    }

    private onTextChange = (param1: WindowEvent): void => {
        let _loc2_: number = 0;
        if (this._ignoreListeners) {
            return;
        }
        let _loc3_: string = this._SafeStr_2179.text;
        let _loc4_: number = this.parseDisplayValue(_loc3_);
        if (isNaN(_loc4_)) {
            this.updateInvalidState(this.invalidNumberMessage());
            return;
        }
        _loc2_ = _loc4_ | 0;
        if (_loc2_ < this._min || _loc2_ > this._SafeStr_4035) {
            this.updateInvalidState(this.rangeValidationMessage());
            return;
        }
        this.updateInvalidState(null);
        this._latestValidValueStr = this._SafeStr_2179.text;
        this.setValidValueAndNotify((this._endsWithFive ? _loc2_ / 5 : _loc2_) | 0);
    };

    private parseDisplayValue(param1: string): number {
        let _loc5_: RegExp = null;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: number = 0;
        if (param1 == "" || param1 == "-" && this._min < 0) {
            return NaN;
        }
        let _loc4_: string = param1.charAt(param1.length - 1);
        if (this._precision == 0 && this._endsWithFive && _loc4_ != "0" && _loc4_ != "5") {
            return NaN;
        }
        if (this._SafeStr_2147.nonDecimalNotations && (param1.indexOf("0b") == 0 || param1.indexOf("0x") == 0)) {
            return param1.indexOf("0b") == 0 ? parseInt(param1.substr(2), 2) : Number(parseInt(param1.substr(2), 16));
        }
        let _loc7_: string = param1.replace(",", ".");
        if (this._precision > 0) {
            if (_loc7_.charAt(_loc7_.length - 1) == ".") {
                _loc7_ = _loc7_.substring(0, _loc7_.length - 1);
            }
            _loc5_ = /^-?([0-9]*[.])?[0-9]+$/;
            if (!_loc5_.test(_loc7_)) {
                return NaN;
            }
            _loc2_ = 0;
            while (_loc2_ < this._precision) {
                _loc6_ = _loc7_.indexOf(".");
                if (_loc6_ == -1) {
                    _loc7_ += "0";
                } else {
                    _loc7_ = NumberInputPreset.swapChars(_loc7_, _loc6_, _loc6_ + 1);
                    if (_loc7_.charAt(_loc7_.length - 1) == ".") {
                        _loc7_ = _loc7_.substring(0, _loc7_.length - 1);
                    }
                }
                _loc2_++;
            }
        } else if (this._precision < 0) {
            _loc3_ = 0;
            while (_loc3_ > this._precision) {
                if (_loc7_ == "0" || _loc7_ == "-0" || _loc7_ == "") {
                    break;
                }
                if (_loc7_.charAt(_loc7_.length - 1) != "0") {
                    return NaN;
                }
                _loc7_ = _loc7_.substring(0, _loc7_.length - 1);
                _loc3_ -= 1;
            }
        }
        if (this._endsWithFive && _loc7_.charAt(_loc7_.length - 1) != "0" && _loc7_.charAt(_loc7_.length - 1) != "5") {
            return NaN;
        }
        return NumberInputPreset.isValidInt(_loc7_) ? Number(_loc7_) | 0 : NaN;
    }

    private setValidValueAndNotify(param1: number): void {
        this._SafeStr_5295 = param1;
        if (this._onValueChange != null) {
            this._onValueChange(param1);
        }
    }

    private captureOriginalInputState(): void {
        this._originalBorderColor = this._SafeStr_3190.color;
    }

    private updateInvalidState(param1: string): void {
        let _loc2_: boolean = param1 != null && param1.length > 0;
        if (this.errorText == null || this.warningDisplay == null) {
            return;
        }
        if (_loc2_) {
            this._SafeStr_3190.color = this._SafeStr_2144.invalidInputBackgroundColor;
            this.errorText.text = param1;
            this.warningDisplay.visible = true;
        } else {
            this._SafeStr_3190.color = this._originalBorderColor;
            this.warningDisplay.visible = false;
        }
    }

    private invalidNumberMessage(): string {
        return this.localizations.getLocalization("wiredfurni.params.number_input.invalid", "Number is invalid");
    }

    private rangeValidationMessage(): string {
        let _loc1_: boolean = this._min != -2147483648;
        let _loc2_: boolean = this._SafeStr_4035 != 2147483647;
        if (_loc1_ && _loc2_) {
            return this.localizations.getLocalizationWithParams("wiredfurni.params.number_input.between", "Number needs to be between %min% and %max%", "min", this.displayValue(this._min), "max", this.displayValue(this._SafeStr_4035));
        }
        if (_loc1_) {
            return this.localizations.getLocalizationWithParams("wiredfurni.params.number_input.min", "Number needs to be %min% or higher", "min", this.displayValue(this._min));
        }
        if (_loc2_) {
            return this.localizations.getLocalizationWithParams("wiredfurni.params.number_input.max", "Number needs to be %max% or lower", "max", this.displayValue(this._SafeStr_4035));
        }
        return this.invalidNumberMessage();
    }

    public get value(): number {
        return this._SafeStr_5295;
    }

    public get number(): number {
        return Number(this._latestValidValueStr);
    }

    public override hasStaticWidth(): boolean {
        return this._SafeStr_2147.width >= 0;
    }

    public override get staticWidth(): number {
        if (this._SafeStr_2147.width >= 0) {
            return this._SafeStr_2147.width + this._SafeStr_4751;
        }
        throw new Exception("Number input with -1 width has no static width");
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        let _loc2_: number = this._SafeStr_2147.width >= 0 ? this._SafeStr_2147.width + this._SafeStr_4751 : param1;
        this._SafeStr_3190.width = _loc2_;
    }

    public override get window(): IWindow {
        return this._SafeStr_3190;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_3190.dispose();
        this._SafeStr_3190 = null;
        this._SafeStr_2147 = null;
    }

    private get warningDisplay(): IWindow {
        return this._SafeStr_3190.findChildByName("warning_display");
    }

    private get errorText(): ITextWindow {
        return asGuarded(this._SafeStr_3190.findChildByName("error_text"), isITextWindow);
    }
}
