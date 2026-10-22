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

    constructor(param1: HabboUserDefinedRoomEvents, param2: number, param3: number) {
        this._roomEvents = param1;
        this._sourceType = param2;
        this._id = param3;
        if (this._sourceType == WiredInputSourcePicker.MERGED_SOURCE) {
            this._selectionCache = new Dictionary();
        }
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _sourceType: number;
    static { (this.prototype as any)._sourceType = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _SafeStr_2348: Triggerable;

    declare private _element: Element;

    declare private _selectionCache: Map<any, any>;

    declare private _selectedText: string;

    declare private _isButtonsDisabled: boolean;
    static { (this.prototype as any)._isButtonsDisabled = false; }

    declare private _disabled: boolean;
    static { (this.prototype as any)._disabled = false; }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _stuffPickingSpecialMode: number;
    static { (this.prototype as any)._stuffPickingSpecialMode = 0; }

    public get stuffPickingSpecialMode(): number {
        return this._stuffPickingSpecialMode;
    }

    public get sourceType(): number {
        return this._sourceType;
    }

    public set sourceType(param1: number) {
        let _loc6_: number = 0;
        if (this._sourceType != WiredInputSourcePicker.MERGED_SOURCE) {
            return;
        }
        let _loc2_: number = this._element.getMergedType(this._id);
        this._element.setMergedType(this._id, param1);
        let _loc7_: any[] = this._element.mergedSelections()[this._id];
        let _loc5_: number = _loc7_[0] | 0;
        let _loc3_: number = _loc7_[1] | 0;
        if (_loc2_ == WiredInputSourcePicker._SafeStr_2178) {
            this._selectionCache.set(_loc2_, this._SafeStr_2348.furniSourceTypes[_loc5_]);
        } else if (_loc2_ == WiredInputSourcePicker.USER_SOURCE) {
            this._selectionCache.set(_loc2_, this._SafeStr_2348.userSourceTypes[_loc3_]);
        }
        let _loc4_: InputSourcesConf = this._SafeStr_2348.inputSourcesConf;
        if (param1 == WiredInputSourcePicker._SafeStr_2178) {
            _loc6_ = Number(this._selectionCache.has(param1) ? this._selectionCache.get(param1) : _loc4_.getAllowedFurniSources(_loc5_)[0]) | 0;
            this._SafeStr_2348.furniSourceTypes[_loc5_] = _loc6_;
        } else if (param1 == WiredInputSourcePicker.USER_SOURCE) {
            _loc6_ = Number(this._selectionCache.has(param1) ? this._selectionCache.get(param1) : _loc4_.getAllowedUserSources(_loc3_)[0]) | 0;
            this._SafeStr_2348.userSourceTypes[_loc3_] = _loc6_;
        }
        this.refreshContainer(this._SafeStr_2348, this._element);
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

    public get disabled(): boolean {
        return this._disabled;
    }

    private get wiredCtrl(): IWiredCtrl {
        return this._roomEvents.wiredCtrl;
    }

    public onChangeInputSource(param1: boolean): void {
        let _loc9_: any[] = null;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc7_: any[] = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        let _loc4_: InputSourcesConf = this._SafeStr_2348.inputSourcesConf;
        if (this._sourceType == WiredInputSourcePicker._SafeStr_2178) {
            _loc9_ = _loc4_.getAllowedFurniSources(this._id);
            _loc2_ = this._SafeStr_2348.furniSourceTypes[this._id] | 0;
            _loc3_ = _loc9_.indexOf(_loc2_);
        } else if (this._sourceType == WiredInputSourcePicker.USER_SOURCE) {
            _loc9_ = _loc4_.getAllowedUserSources(this._id);
            _loc2_ = this._SafeStr_2348.userSourceTypes[this._id] | 0;
            _loc3_ = _loc9_.indexOf(_loc2_);
        } else {
            _loc7_ = this._element.mergedSelections()[this._id];
            _loc5_ = _loc7_[0] | 0;
            _loc6_ = _loc7_[1] | 0;
            _loc8_ = this._element.getMergedType(this._id);
            if (_loc8_ == WiredInputSourcePicker._SafeStr_2178) {
                _loc9_ = _loc4_.getAllowedFurniSources(_loc5_);
                _loc2_ = this._SafeStr_2348.furniSourceTypes[_loc5_] | 0;
                _loc3_ = _loc9_.indexOf(_loc2_);
            } else {
                if (_loc8_ != WiredInputSourcePicker.USER_SOURCE) {
                    return;
                }
                _loc9_ = _loc4_.getAllowedUserSources(_loc6_);
                _loc2_ = this._SafeStr_2348.userSourceTypes[_loc6_] | 0;
                _loc3_ = _loc9_.indexOf(_loc2_);
            }
        }
        if (_loc3_ == -1) {
            _loc3_ = 0;
        } else if (param1) {
            _loc3_ = (_loc3_ + 1) % _loc9_.length;
        } else {
            _loc3_ = (_loc3_ - 1 + _loc9_.length) % _loc9_.length;
        }
        if (this._sourceType == WiredInputSourcePicker._SafeStr_2178) {
            this._SafeStr_2348.furniSourceTypes[this._id] = _loc9_[_loc3_];
        } else if (this._sourceType == WiredInputSourcePicker.USER_SOURCE) {
            this._SafeStr_2348.userSourceTypes[this._id] = _loc9_[_loc3_];
        } else if (_loc8_ == WiredInputSourcePicker._SafeStr_2178) {
            this._SafeStr_2348.furniSourceTypes[_loc5_] = _loc9_[_loc3_];
        } else if (_loc8_ == WiredInputSourcePicker.USER_SOURCE) {
            this._SafeStr_2348.userSourceTypes[_loc6_] = _loc9_[_loc3_];
        }
        this.refreshContainer(this._SafeStr_2348, this._element);
    }

    public refreshContainer(param1: Triggerable, param2: Element): void {
        let _loc14_: number = 0;
        let _loc9_: string = null;
        let _loc10_: any[] = null;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc11_: number = 0;
        let _loc4_: string = null;
        let _loc13_: boolean = false;
        let _loc6_: boolean = false;
        let _loc12_: any[] = null;
        let _loc5_: number = 0;
        if (this._SafeStr_2348 != param1 || this._element != param2) {
            this._SafeStr_2348 = param1;
            this._element = param2;
            if (this._sourceType == WiredInputSourcePicker.MERGED_SOURCE) {
                this._selectionCache = new Dictionary();
            }
        }
        let _loc3_: boolean = false;
        if (this._sourceType == WiredInputSourcePicker._SafeStr_2178) {
            _loc9_ = "furni";
            _loc14_ = param1.furniSourceTypes[this._id] | 0;
        } else if (this._sourceType == WiredInputSourcePicker.USER_SOURCE) {
            _loc9_ = "users";
            _loc14_ = param1.userSourceTypes[this._id] | 0;
        } else {
            _loc10_ = param2.mergedSelections()[this._id];
            _loc7_ = _loc10_[0] | 0;
            _loc8_ = _loc10_[1] | 0;
            _loc11_ = param2.getMergedType(this._id);
            if (_loc11_ == WiredInputSourcePicker._SafeStr_2178) {
                _loc9_ = "furni";
                _loc14_ = param1.furniSourceTypes[_loc7_] | 0;
            } else if (_loc11_ == WiredInputSourcePicker.USER_SOURCE) {
                _loc9_ = "users";
                _loc14_ = param1.userSourceTypes[_loc8_] | 0;
            } else {
                _loc3_ = true;
                _loc9_ = WiredInputSourcePicker.getTypeNameForSource(param2.getMergedType(this._id));
            }
        }
        if (_loc3_) {
            _loc4_ = "wiredfurni.params.sources." + _loc9_;
        } else {
            _loc4_ = "wiredfurni.params.sources." + _loc9_ + "." + _loc14_;
        }
        let _loc15_: string = this._roomEvents.localization.getLocalization(_loc4_, _loc4_);
        this._stuffPickingSpecialMode = WiredInputSourcePicker.STUFF_PICKING_MODE_NONE;
        if (_loc9_ == "furni") {
            _loc13_ = param1.inputSourcesConf.isDualFurniPickingMode();
            _loc6_ = this.wiredCtrl.hidePickFurniInstructions;
            _loc5_ = WiredInputSourcePicker.STUFF_PICKING_MODE_NONE;
            if (_loc14_ == 100) {
                _loc12_ = this.wiredCtrl.getStuffIds();
                _loc5_ = WiredInputSourcePicker.STUFF_PICKING_MODE_1;
            } else if (_loc14_ == 101) {
                _loc12_ = this.wiredCtrl.getStuffIds2();
                _loc5_ = WiredInputSourcePicker.STUFF_PICKING_MODE_2;
            }
            if (_loc13_ && _loc5_ != WiredInputSourcePicker.STUFF_PICKING_MODE_NONE) {
                this._stuffPickingSpecialMode = _loc5_;
            }
            if ((_loc13_ || _loc6_) && _loc12_ != null) {
                _loc15_ += " [" + _loc12_.length + "/" + param1.furniLimit + "]";
            }
        }
        this._isButtonsDisabled = _loc3_;
        this._selectedText = _loc15_;
        this._disabled = param2.isInputSourceDisabled(this._id, this._sourceType);
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

    get [IDisposable](): true {
        return true;
    }
}
