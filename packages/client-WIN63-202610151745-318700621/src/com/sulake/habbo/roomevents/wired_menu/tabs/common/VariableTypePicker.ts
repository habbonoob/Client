import { asGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';

export class VariableTypePicker implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.common::VariableTypePicker'); }

    private static SELECTION_TYPES: any = ["furni", "user", "global", "context"];
    private _disposed: boolean = false;

    declare private _container: IWindowContainer;

    declare private _onSelectCallback: (...args: any[]) => any;

    declare private _selected: string;

    declare private _selectedType: number;
    static { (this.prototype as any)._selectedType = 0; }

    constructor(param1: IWindowContainer, param2: (...args: any[]) => any) {
        let _loc3_: InteractiveController = null;
        this._container = param1;
        this._onSelectCallback = param2;
        this.setMode(stringOrNull(VariableTypePicker.SELECTION_TYPES[0]), true);
        for (const _loc4_ of valuesOf(VariableTypePicker.SELECTION_TYPES)) {
            _loc3_ = castTo(this.getButton(stringOrNull(_loc4_)), InteractiveController);
            if (_loc3_ != null) {
                _loc3_.addEventListener("WME_OUT", this.maybeCancelEvent);
                _loc3_.addEventListener("WME_UP", this.maybeCancelEvent);
            }
        }
    }

    private maybeCancelEvent = (param1: WindowMouseEvent): void => {
        let _loc2_: IButtonWindow = asGuarded(param1.target, isIButtonWindow);
        if (_loc2_ != null) {
            if (param1.type == "WME_OUT" && _loc2_.id == this._selectedType) {
                param1.preventWindowOperation();
            }
            if (param1.type == "WME_UP") {
                this.setMode(this.getButtonTypeName(_loc2_));
                param1.preventWindowOperation();
            }
        }
    };

    private getButtonTypeName(param1: IButtonWindow): string {
        return stringOrNull(param1.name.split("_")[1]);
    }

    private setMode(param1: string, param2: boolean = false): void {
        let _loc3_: InteractiveController = null;
        this._selected = param1;
        for (const _loc4_ of valuesOf(VariableTypePicker.SELECTION_TYPES)) {
            _loc3_ = castTo(this.getButton(stringOrNull(_loc4_)), InteractiveController);
            if (_loc3_ != null) {
                if (this._selected != _loc4_) {
                    _loc3_.state &= ~0x10;
                    _loc3_.state &= ~4;
                }
            }
        }
        _loc3_ = castTo(this.getButton(this._selected), InteractiveController);
        if (_loc3_.id != this._selectedType) {
            this._selectedType = _loc3_.id;
            if (!param2) {
                this._onSelectCallback(this._selectedType);
            }
        }
    }

    public get selectedType(): number {
        return this._selectedType;
    }

    public set selectedType(param1: number) {
        let _loc2_: IButtonWindow = null;
        for (const _loc3_ of valuesOf(VariableTypePicker.SELECTION_TYPES)) {
            _loc2_ = this.getButton(stringOrNull(_loc3_));
            if (_loc2_ != null) {
                if (_loc2_.id == param1) {
                    this.setMode(this.getButtonTypeName(_loc2_), true);
                }
            }
        }
    }

    public update(param1: number): void {
        let _loc2_: InteractiveController = null;
        if (this._container) {
            for (const _loc3_ of valuesOf(VariableTypePicker.SELECTION_TYPES)) {
                _loc2_ = castTo(this.getButton(stringOrNull(_loc3_)), InteractiveController);
                if (_loc2_ != null) {
                    if (this._selected == _loc3_ && (_loc2_.state & 0x10) == 0) {
                        _loc2_.state |= 16;
                    }
                }
            }
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._container = null;
        this._onSelectCallback = null;
        this._selected = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private getButton(param1: string): IButtonWindow {
        return asGuarded(this._container.findChildByName("type_" + param1 + "_button"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
