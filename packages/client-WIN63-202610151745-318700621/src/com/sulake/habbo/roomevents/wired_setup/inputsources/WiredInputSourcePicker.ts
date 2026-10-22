import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { InputSourcesConf } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/InputSourcesConf';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { IWiredCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/IWiredCtrl';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';

export class WiredInputSourcePicker implements SourceTypePickedListener, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.inputsources::WiredInputSourcePicker'); }

    public static _SafeStr_2178: number = 0;
    public static USER_SOURCE: number = 1;
    public static MERGED_SOURCE: number = 2;
    public static STUFF_PICKING_MODE_NONE: number = 0;
    public static STUFF_PICKING_MODE_1: number = 1;
    public static STUFF_PICKING_MODE_2: number = 2;
    private _disposed: boolean = false;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _sourceType: number;
    static { (this.prototype as any)._sourceType = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _SafeStr_2348: Triggerable;

    declare private _element: Element;

    declare private _selectionCache: Map<any, any>;

    declare private _selectedText: string;

    declare private _stuffPickingSpecialMode: number;
    static { (this.prototype as any)._stuffPickingSpecialMode = 0; }

    declare private _isButtonsDisabled: boolean;
    static { (this.prototype as any)._isButtonsDisabled = false; }

    declare private _disabled: boolean;
    static { (this.prototype as any)._disabled = false; }

    declare private _SafeStr_14458: boolean;
    static { (this.prototype as any)._SafeStr_14458 = false; }

    declare private _SafeStr_14459: boolean;
    static { (this.prototype as any)._SafeStr_14459 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: number, param3: number) {
        this._roomEvents = param1;
        this._sourceType = param2;
        this._id = param3;
        if (this._sourceType == WiredInputSourcePicker.MERGED_SOURCE) {
            this._selectionCache = new Dictionary();
        }
    }

    public static getTypeNameForSource(param1: number): string {
        if (param1 == WiredInputSourcePicker._SafeStr_2178) {
            return "furni";
        }
        if (param1 == WiredInputSourcePicker.USER_SOURCE) {
            return "users";
        }
        if (param1 == VariableExtraSourceTypes.CONTEXT_SOURCE) {
            return "context";
        }
        if (param1 == VariableExtraSourceTypes.GLOBAL_SOURCE) {
            return "global";
        }
        return "";
    }

    public static getColorForSourceType(param1: number): number {
        if (param1 == WiredInputSourcePicker.USER_SOURCE) {
            return 2526761;
        }
        if (param1 == WiredInputSourcePicker._SafeStr_2178) {
            return 12228630;
        }
        if (param1 == VariableExtraSourceTypes.CONTEXT_SOURCE) {
            return 11558430;
        }
        return 1934221;
    }

    private static hasIndex(param1: any[], param2: number): boolean {
        return param1 != null && param2 >= 0 && param2 < param1.length;
    }

    private static getAllowedSources(param1: InputSourcesConf, param2: number, param3: number): any[] {
        if (param1 == null) {
            return null;
        }
        if (param2 == WiredInputSourcePicker._SafeStr_2178 && param3 >= 0 && param3 < param1.amountFurniSelections) {
            return param1.getAllowedFurniSources(param3);
        }
        if (param2 == WiredInputSourcePicker.USER_SOURCE && param3 >= 0 && param3 < param1.amountUserSelections) {
            return param1.getAllowedUserSources(param3);
        }
        return null;
    }

    private static getSelectedSources(param1: Triggerable, param2: number): any[] {
        if (param1 == null) {
            return null;
        }
        if (param2 == WiredInputSourcePicker._SafeStr_2178) {
            return param1.furniSourceTypes;
        }
        if (param2 == WiredInputSourcePicker.USER_SOURCE) {
            return param1.userSourceTypes;
        }
        return null;
    }

    private static getDefaultSources(param1: InputSourcesConf, param2: number): any[] {
        if (param1 == null) {
            return null;
        }
        if (param2 == WiredInputSourcePicker._SafeStr_2178) {
            return param1.defaultFurniSources;
        }
        if (param2 == WiredInputSourcePicker.USER_SOURCE) {
            return param1.defaultUserSources;
        }
        return null;
    }

    public onChangeInputSource(param1: boolean): void {
        let _loc9_: any[] = null;
        let _loc2_: any[] = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: any[] = null;
        let _loc3_: number = 0;
        let _loc8_: number = 0;
        if (this._SafeStr_2348 == null || this._element == null) {
            return;
        }
        let _loc6_: InputSourcesConf = this._SafeStr_2348.inputSourcesConf;
        if (this._sourceType == WiredInputSourcePicker._SafeStr_2178) {
            _loc8_ = WiredInputSourcePicker._SafeStr_2178;
            _loc3_ = this._id;
        } else if (this._sourceType == WiredInputSourcePicker.USER_SOURCE) {
            _loc8_ = WiredInputSourcePicker.USER_SOURCE;
            _loc3_ = this._id;
        } else {
            _loc7_ = this.getMergedSelection(this._element);
            if (_loc7_ == null) {
                return;
            }
            _loc8_ = this._element.getMergedType(this._id);
            if (_loc8_ == WiredInputSourcePicker._SafeStr_2178) {
                _loc3_ = _loc7_[0] | 0;
            } else {
                if (_loc8_ != WiredInputSourcePicker.USER_SOURCE) {
                    return;
                }
                _loc3_ = _loc7_[1] | 0;
            }
        }
        _loc9_ = WiredInputSourcePicker.getAllowedSources(_loc6_, _loc8_, _loc3_);
        _loc2_ = WiredInputSourcePicker.getSelectedSources(this._SafeStr_2348, _loc8_);
        if (_loc9_ == null || _loc9_.length == 0 || !WiredInputSourcePicker.hasIndex(_loc2_, _loc3_)) {
            return;
        }
        _loc4_ = _loc2_[_loc3_] | 0;
        _loc5_ = _loc9_.indexOf(_loc4_);
        if (_loc5_ == -1) {
            _loc5_ = 0;
        } else if (param1) {
            _loc5_ = (_loc5_ + 1) % _loc9_.length;
        } else {
            _loc5_ = (_loc5_ - 1 + _loc9_.length) % _loc9_.length;
        }
        _loc2_[_loc3_] = _loc9_[_loc5_];
        this.refreshContainer(this._SafeStr_2348, this._element);
    }

    public set sourceType(param1: number) {
        let _loc8_: any[] = null;
        let _loc3_: number = 0;
        let _loc9_: number = 0;
        if (this._sourceType != WiredInputSourcePicker.MERGED_SOURCE || this._SafeStr_2348 == null || this._element == null) {
            return;
        }
        let _loc10_: any[] = this.getMergedSelection(this._element);
        if (_loc10_ == null) {
            return;
        }
        let _loc4_: number = this._element.getMergedType(this._id);
        let _loc7_: number = _loc10_[0] | 0;
        let _loc5_: number = _loc10_[1] | 0;
        let _loc2_: any[] = WiredInputSourcePicker.getSelectedSources(this._SafeStr_2348, _loc4_);
        if (_loc4_ == WiredInputSourcePicker._SafeStr_2178 && WiredInputSourcePicker.hasIndex(_loc2_, _loc7_)) {
            this._selectionCache.set(_loc4_, _loc2_[_loc7_]);
        } else if (_loc4_ == WiredInputSourcePicker.USER_SOURCE && WiredInputSourcePicker.hasIndex(_loc2_, _loc5_)) {
            this._selectionCache.set(_loc4_, _loc2_[_loc5_]);
        }
        this._element.setMergedType(this._id, param1);
        let _loc6_: InputSourcesConf = this._SafeStr_2348.inputSourcesConf;
        if (param1 == WiredInputSourcePicker._SafeStr_2178) {
            _loc3_ = _loc7_;
        } else if (param1 == WiredInputSourcePicker.USER_SOURCE) {
            _loc3_ = _loc5_;
        }
        if (param1 == WiredInputSourcePicker._SafeStr_2178 || param1 == WiredInputSourcePicker.USER_SOURCE) {
            _loc8_ = WiredInputSourcePicker.getAllowedSources(_loc6_, param1, _loc3_);
            _loc2_ = WiredInputSourcePicker.getSelectedSources(this._SafeStr_2348, param1);
            if (_loc8_ != null && _loc8_.length > 0 && WiredInputSourcePicker.hasIndex(_loc2_, _loc3_)) {
                _loc9_ = Number(this._selectionCache.has(param1) ? this._selectionCache.get(param1) : _loc8_[0]) | 0;
                _loc2_[_loc3_] = _loc9_;
            }
        }
        this.refreshContainer(this._SafeStr_2348, this._element);
    }

    public refreshContainer(param1: Triggerable, param2: Element): void {
        let _loc14_: number = 0;
        let _loc7_: string = null;
        let _loc15_: any[] = null;
        let _loc18_: any[] = null;
        let _loc12_: any[] = null;
        let _loc8_: any[] = null;
        let _loc9_: number = 0;
        let _loc4_: string = null;
        let _loc11_: boolean = false;
        let _loc6_: boolean = false;
        let _loc10_: any[] = null;
        let _loc5_: number = 0;
        if (param1 == null || param2 == null) {
            return;
        }
        if (this._SafeStr_2348 != param1 || this._element != param2) {
            this._SafeStr_2348 = param1;
            this._element = param2;
            if (this._sourceType == WiredInputSourcePicker.MERGED_SOURCE) {
                this._selectionCache = new Dictionary();
            }
        }
        let _loc16_: number = -1;
        let _loc13_: number = -1;
        let _loc3_: boolean = false;
        if (this._sourceType == WiredInputSourcePicker._SafeStr_2178) {
            _loc7_ = "furni";
            _loc16_ = WiredInputSourcePicker._SafeStr_2178;
            _loc13_ = this._id;
        } else if (this._sourceType == WiredInputSourcePicker.USER_SOURCE) {
            _loc7_ = "users";
            _loc16_ = WiredInputSourcePicker.USER_SOURCE;
            _loc13_ = this._id;
        } else {
            _loc8_ = this.getMergedSelection(param2);
            _loc9_ = param2.getMergedType(this._id);
            if (_loc8_ != null && _loc9_ == WiredInputSourcePicker._SafeStr_2178) {
                _loc7_ = "furni";
                _loc16_ = WiredInputSourcePicker._SafeStr_2178;
                _loc13_ = _loc8_[0] | 0;
            } else if (_loc8_ != null && _loc9_ == WiredInputSourcePicker.USER_SOURCE) {
                _loc7_ = "users";
                _loc16_ = WiredInputSourcePicker.USER_SOURCE;
                _loc13_ = _loc8_[1] | 0;
            } else {
                _loc3_ = true;
                _loc7_ = WiredInputSourcePicker.getTypeNameForSource(_loc9_);
            }
        }
        _loc12_ = WiredInputSourcePicker.getSelectedSources(param1, _loc16_);
        if (WiredInputSourcePicker.hasIndex(_loc12_, _loc13_)) {
            _loc14_ = _loc12_[_loc13_] | 0;
        }
        _loc15_ = WiredInputSourcePicker.getAllowedSources(param1.inputSourcesConf, _loc16_, _loc13_);
        _loc18_ = WiredInputSourcePicker.getDefaultSources(param1.inputSourcesConf, _loc16_);
        this._SafeStr_14458 = WiredInputSourcePicker.hasIndex(_loc12_, _loc13_) && WiredInputSourcePicker.hasIndex(_loc18_, _loc13_) && _loc14_ != _loc18_[_loc13_];
        this._SafeStr_14459 = _loc15_ != null && _loc15_.length > 1;
        if (_loc3_) {
            _loc4_ = "wiredfurni.params.sources." + _loc7_;
        } else {
            _loc4_ = "wiredfurni.params.sources." + _loc7_ + "." + _loc14_;
        }
        let _loc17_: string = this._roomEvents.localization.getLocalization(_loc4_, _loc4_);
        this._stuffPickingSpecialMode = WiredInputSourcePicker.STUFF_PICKING_MODE_NONE;
        if (_loc7_ == "furni") {
            _loc11_ = param1.inputSourcesConf.isDualFurniPickingMode();
            _loc6_ = this.wiredCtrl.hidePickFurniInstructions;
            _loc5_ = WiredInputSourcePicker.STUFF_PICKING_MODE_NONE;
            if (_loc14_ == 100 || _loc14_ == 110) {
                _loc10_ = this.wiredCtrl.getStuffIds();
                _loc5_ = WiredInputSourcePicker.STUFF_PICKING_MODE_1;
            } else if (_loc14_ == 101) {
                _loc10_ = this.wiredCtrl.getStuffIds2();
                _loc5_ = WiredInputSourcePicker.STUFF_PICKING_MODE_2;
            }
            if (_loc11_ && _loc5_ != WiredInputSourcePicker.STUFF_PICKING_MODE_NONE) {
                this._stuffPickingSpecialMode = _loc5_;
            }
            if (_loc5_ != WiredInputSourcePicker.STUFF_PICKING_MODE_NONE && (_loc11_ || _loc6_ && _loc10_ != null)) {
                this._SafeStr_14459 = true;
            }
            if ((_loc11_ || _loc6_) && _loc10_ != null) {
                _loc17_ += " [" + _loc10_.length + "/" + param1.furniLimit + "]";
            }
        }
        this._isButtonsDisabled = _loc3_;
        this._selectedText = _loc17_;
        this._disabled = param2.isInputSourceDisabled(this._id, this._sourceType);
    }

    public get sourceType(): number {
        return this._sourceType;
    }

    public get id(): number {
        return this._id;
    }

    public get selectedText(): string {
        return this._selectedText;
    }

    public get isButtonsDisabled(): boolean {
        return this._isButtonsDisabled;
    }

    public get stuffPickingSpecialMode(): number {
        return this._stuffPickingSpecialMode;
    }

    private get wiredCtrl(): IWiredCtrl {
        return this._roomEvents.wiredCtrl;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public get usesNonDefaultSelection(): boolean {
        return this._SafeStr_14458;
    }

    public get hasMeaningfulSelection(): boolean {
        return this._SafeStr_14459;
    }

    private getMergedSelection(param1: Element): any[] {
        if (param1 == null) {
            return null;
        }
        let _loc2_: any[] = param1.mergedSelections();
        if (!WiredInputSourcePicker.hasIndex(_loc2_, this._id)) {
            return null;
        }
        let _loc3_: any[] = asGuarded(_loc2_[this._id], Array.isArray);
        return _loc3_ != null && _loc3_.length >= 2 ? _loc3_ : null;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._roomEvents = null;
        this._SafeStr_2348 = null;
        this._element = null;
        this._selectionCache = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
