import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { WiredMenuInspectionTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_inspection/VariableValueTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class VariableValueTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_inspection::VariableValueTableObject'); }

    declare private _highlightChanges: boolean;
    static { (this.prototype as any)._highlightChanges = false; }

    declare private _variable: WiredVariable;

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    declare private _canModify: boolean;
    static { (this.prototype as any)._canModify = false; }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    constructor(param1: WiredVariable, param2: number, param3: boolean, param4: boolean, param5: HabboUserDefinedRoomEvents) {
        this._variable = param1;
        this._value = param2;
        this._canModify = param3;
        this._highlightChanges = param4;
        this._roomEvents = param5;
    }

    public static createVariableValueCell(param1: WiredVariable, param2: number, param3: HabboUserDefinedRoomEvents, param4: boolean, param5: boolean): TableCell {
        let _loc7_: boolean = false;
        let _loc8_: string = null;
        let _loc6_: IHabboLocalizationManager = param3.localization;
        if (param1.hasValue) {
            _loc7_ = param2 == 2147483647 || param2 == -2147483648;
            if (_loc7_) {
                return new TableCell(TableCell._SafeStr_2166, _loc6_.getLocalization("wiredmenu.inspection.flash_restriction.text"), false, false, null, null, false, _loc6_.getLocalization("wiredmenu.inspection.flash_restriction.desc"), 16734003);
            }
            _loc8_ = Util.getPackedVariableText(param1, param2);
            if (_loc8_ != null) {
                return new TableCell(TableCell._SafeStr_2166, _loc8_, param1.canWriteValue && param5, true, String(param2), null, param4, _loc8_ + "\n" + _loc6_.getLocalization("wiredmenu.inspection.packed_variable.desc"), 10158534);
            }
            _loc8_ = Util.variableValueWithString(param1, param2);
            return new TableCell(TableCell._SafeStr_2166, _loc8_, param1.canWriteValue && param5, true, String(param2), null, param4);
        }
        return new TableCell(TableCell._SafeStr_2166, "");
    }

    public get identifier(): string {
        return this._variable.variableId;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: VariableValueTableObject = param2 instanceof VariableValueTableObject ? param2 : null;
        if (param1 == WiredMenuInspectionTab.VARIABLES_COLUMN_VARIABLE) {
            return this._variable.variableName != _loc3_.variable.variableName;
        }
        if (param1 == WiredMenuInspectionTab.VARIABLES_COLUMN_VALUE) {
            if (this._canModify != _loc3_.canModify) {
                return true;
            }
            if (this._variable.hasValue != _loc3_.variable.hasValue) {
                return true;
            }
            if (!this._variable.hasValue) {
                return false;
            }
            return this._value != _loc3_.value || Util.getConnectedText(this.variable, this._value) != Util.getConnectedText(_loc3_.variable, _loc3_.value);
        }
        return false;
    }

    public isUpdated(param1: any): boolean {
        return this.isPropertyUpdated(WiredMenuInspectionTab.VARIABLES_COLUMN_VALUE, param1) || this.isPropertyUpdated(WiredMenuInspectionTab.VARIABLES_COLUMN_VARIABLE, param1);
    }

    public getTableCell(param1: string): TableCell {
        if (param1 == WiredMenuInspectionTab.VARIABLES_COLUMN_VARIABLE) {
            return new TableCell(TableCell._SafeStr_2166, this._variable.variableName, false, true, this._variable.variableName);
        }
        if (param1 == WiredMenuInspectionTab.VARIABLES_COLUMN_VALUE) {
            return VariableValueTableObject.createVariableValueCell(this._variable, this._value, this._roomEvents, this._highlightChanges, this._canModify);
        }
        return null;
    }

    private loc(param1: string): string {
        return this._roomEvents.localization.getLocalization(param1);
    }

    public get variable(): WiredVariable {
        return this._variable;
    }

    public get value(): number {
        return this._value;
    }

    public get canModify(): boolean {
        return this._canModify;
    }
}
