import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { WiredMenuOverviewTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/PropertyTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class PropertyTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_variable_overview::PropertyTableObject'); }

    declare private _identifier: string;

    declare private _value: string;

    declare private _localization: IHabboLocalizationManager;

    declare private _SafeStr_6397: boolean;
    static { (this.prototype as any)._SafeStr_6397 = false; }

    constructor(param1: string, param2: any, param3: IHabboLocalizationManager, param4: boolean = false) {
        this._identifier = param1;
        this._localization = param3;
        this._SafeStr_6397 = param4;
        let _loc5_: string = typeof param2 === "string" ? param2 : null;
        let _loc6_: boolean = typeof param2 === "boolean" ? param2 : null;
        if (_loc5_ != null) {
            this._value = _loc5_;
        } else if (_loc6_ != null) {
            this._value = param3.getLocalization("wiredmenu.bool." + (_loc6_ ? "yes" : "no"));
        } else if (typeof param2 === "number" && (param2 | 0) === param2) {
            this._value = String(typeof param2 === "number" && (param2 | 0) === param2 ? param2 : null);
        } else {
            this._value = "";
        }
    }

    public get identifier(): string {
        return this._identifier;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: PropertyTableObject = param2 instanceof PropertyTableObject ? param2 : null;
        if (param1 == WiredMenuOverviewTab.PROPERTIES_COLUMN_VALUE) {
            return this._value != _loc3_.value;
        }
        return false;
    }

    public isUpdated(param1: any): boolean {
        let _loc2_: PropertyTableObject = param1 instanceof PropertyTableObject ? param1 : null;
        return this._value != _loc2_.value;
    }

    public getTableCell(param1: string): TableCell {
        if (param1 == WiredMenuOverviewTab.PROPERTIES_COLUMN_PROPERTY) {
            return new TableCell(TableCell._SafeStr_2166, this._localization.getLocalization("wiredmenu.variable_overview.properties." + this._identifier));
        }
        if (param1 == WiredMenuOverviewTab.PROPERTIES_COLUMN_VALUE) {
            return new TableCell(TableCell._SafeStr_2166, this._value, false, this._SafeStr_6397);
        }
        return null;
    }

    public get value(): string {
        return this._value;
    }
}
