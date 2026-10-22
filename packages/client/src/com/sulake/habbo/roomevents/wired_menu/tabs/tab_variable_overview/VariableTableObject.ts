import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { WiredMenuOverviewTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/PropertyTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class VariableTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_variable_overview::VariableTableObject'); }

    constructor(param1: WiredVariable, param2: HabboUserDefinedRoomEvents) {
        this._variable = param1;
        this._roomEvents = param2;
    }

    declare private _variable: WiredVariable;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    public get identifier(): string {
        return this._variable.variableId;
    }

    public get variable(): WiredVariable {
        return this._variable;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: WiredVariable = (param2 instanceof VariableTableObject ? param2 : null).variable;
        if (param1 == WiredMenuOverviewTab.LIST_COLUMN_NAME) {
            return this._variable.variableName != _loc3_.variableName;
        }
        return false;
    }

    public isUpdated(param1: any): boolean {
        let _loc2_: WiredVariable = (param1 instanceof VariableTableObject ? param1 : null).variable;
        return this._variable.variableName != _loc2_.variableName;
    }

    public getTableCell(param1: string): TableCell {
        if (param1 == WiredMenuOverviewTab.LIST_COLUMN_NAME) {
            return new TableCell(TableCell._SafeStr_2166, this.variable.variableName);
        }
        return null;
    }
}
