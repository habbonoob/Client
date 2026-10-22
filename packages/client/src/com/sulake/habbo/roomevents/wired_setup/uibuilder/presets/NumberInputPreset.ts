import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class NumberInputPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::NumberInputPreset'); }

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

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: NumberInputParam) {
        super(param1, param2, param3);
        this._SafeStr_3190 = param3.createTextInputView();
        this._SafeStr_2179 = asGuarded(this._SafeStr_3190.findChildByName("field"), isITextFieldWindow);
        this._SafeStr_2147 = param4;
        this._SafeStr_4751 = this._SafeStr_3190.width - this._SafeStr_2179.width;
        if (param4.width >= 0) {
            this._SafeStr_3190.width = param4.width + this._SafeStr_4751;
        }
        this._SafeStr_2179.restrict = "0123456789" + (param4.min < 0 ? "\\-" : "") + (param4.precision > 0 ? ",." : "") + (param4.nonDecimalNotations ? "xba-fA-F" : "");
        this._endsWithFive = param4.endsWithFive;
        this._min = this._endsWithFive ? param4.min * 5 : param4.min;
        this._SafeStr_4035 = this._endsWithFive ? param4.max * 5 : param4.max;
        this._precision = param4.precision;
        if (param4.tooltip != null) {
            this._SafeStr_2179.toolTipCaption = param4.tooltip;
        }
        this.setValue(param4.initialValue);
        this._SafeStr_2179.addEventListener("WE_CHANGE", this.onTextChange);
    }

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

    declare private _onValueChange: (...args: any[]) => any;

    private _ignoreListeners: boolean = false;

    public override get staticWidth(): number {
        if (this._SafeStr_2147.width >= 0) {
            return this._SafeStr_2147.width + this._SafeStr_4751;
        }
        throw new Exception("Number input with -1 width has no static width");
    }

    public override get window(): IWindow {
        return this._SafeStr_3190;
    }

    public set onValueChange(param1: (...args: any[]) => any) {
        this._onValueChange = param1;
    }

    public get value(): number {
        return this._SafeStr_5295;
    }

    public set value(param1: number) {
        this.setValue(param1);
    }

    public get number(): number {
        return Number(this._latestValidValueStr);
    }

    public override hasStaticWidth(): boolean {
        return this._SafeStr_2147.width >= 0;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        let _loc2_: number = this._SafeStr_2147.width >= 0 ? this._SafeStr_2147.width + this._SafeStr_4751 : param1;
        this._SafeStr_3190.width = _loc2_;
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

    public reset(): void {
        this.setValue(this._SafeStr_2147.initialValue);
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
        this._ignoreListeners = false;
    }

    private onTextChange = (param1: WindowEvent): void => {
        let _loc2_: number = 0;
        let _loc4_: RegExp = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        _loc5_ = 0;
        if (this._ignoreListeners) {
            return;
        }
        let _loc8_: string = this._SafeStr_2179.text;
        if (_loc8_ == "" || _loc8_ == "-" && this._SafeStr_2147.min < 0) {
            return;
        }
        let _loc3_: string = _loc8_.charAt(_loc8_.length - 1);
        if (this._precision == 0 && this._endsWithFive && _loc3_ != "0" && _loc3_ != "5") {
            return;
        }
        if (this._precision < 0 && _loc3_ == "0") {
            return;
        }
        if (this._SafeStr_2147.nonDecimalNotations && (_loc8_.indexOf("0b") == 0 || _loc8_.indexOf("0x") == 0)) {
            _loc2_ = (_loc8_.indexOf("0b") == 0 ? parseInt(_loc8_.substr(2), 2) : parseInt(_loc8_.substr(2), 16)) | 0;
            this.setValidValueAndNotify(_loc2_ < this._min ? this._min : (_loc2_ > this._SafeStr_4035 ? this._SafeStr_4035 : _loc2_));
            return;
        }
        let _loc9_: string = _loc8_.replace(",", ".");
        if (this._precision > 0) {
            if (_loc9_.charAt(_loc9_.length - 1) == ".") {
                _loc9_ = _loc9_.substring(0, _loc9_.length - 1);
            }
            _loc4_ = /^-?([0-9]*[.])?[0-9]+$/;
            if (!_loc4_.test(_loc9_)) {
                this._ignoreListeners = true;
                this._SafeStr_2179.text = this._latestValidValueStr;
                this._ignoreListeners = false;
                return;
            }
            _loc5_ = 0;
            while (_loc5_ < this._precision) {
                _loc6_ = _loc9_.indexOf(".");
                if (_loc6_ == -1) {
                    _loc9_ += "0";
                } else {
                    _loc9_ = NumberInputPreset.swapChars(_loc9_, _loc6_, _loc6_ + 1);
                    if (_loc9_.charAt(_loc9_.length - 1) == ".") {
                        _loc9_ = _loc9_.substring(0, _loc9_.length - 1);
                    }
                }
                _loc5_++;
            }
        } else if (this._precision < 0) {
            _loc5_ = 0;
            while (_loc5_ > this._precision) {
                if (_loc9_ == "0" || _loc9_ == "-0" || _loc9_ == "") {
                    break;
                }
                if (_loc9_.charAt(_loc9_.length - 1) == "0") {
                    _loc9_ = _loc9_.substring(0, _loc9_.length - 1);
                } else {
                    this._ignoreListeners = true;
                    this._SafeStr_2179.text = this._latestValidValueStr;
                    this._ignoreListeners = false;
                }
                _loc5_ -= 1;
            }
        }
        let _loc7_: ITextFieldWindow = this._SafeStr_2179;
        if (this._endsWithFive && _loc9_.charAt(_loc9_.length - 1) != "0" && _loc9_.charAt(_loc9_.length - 1) != "5") {
            _loc7_.text = this._latestValidValueStr;
            return;
        }
        _loc2_ = Number(_loc9_) | 0;
        if (!isNaN(_loc2_) && NumberInputPreset.isValidInt(_loc9_)) {
            if (String(_loc2_).length <= String(this._SafeStr_2147.min).length && _loc2_ < this._SafeStr_2147.min && String(this._SafeStr_2147.max).length > String(this._SafeStr_2147.min).length) {
                return;
            }
            if (_loc2_ >= this._min && _loc2_ <= this._SafeStr_4035) {
                this._latestValidValueStr = _loc7_.text;
            } else if (_loc2_ < this._min) {
                _loc2_ = this._min;
                this._latestValidValueStr = this.displayValue(this._min);
                _loc7_.text = this._latestValidValueStr;
            } else {
                _loc2_ = this._SafeStr_4035;
                this._latestValidValueStr = this.displayValue(this._SafeStr_4035);
                _loc7_.text = this._latestValidValueStr;
            }
            this.setValidValueAndNotify((this._endsWithFive ? _loc2_ / 5 : _loc2_) | 0);
        } else {
            _loc7_.text = this._latestValidValueStr;
        }
    };

    private setValidValueAndNotify(param1: number): void {
        this._SafeStr_5295 = param1;
        if (this._onValueChange != null) {
            this._onValueChange(param1);
        }
    }
}
