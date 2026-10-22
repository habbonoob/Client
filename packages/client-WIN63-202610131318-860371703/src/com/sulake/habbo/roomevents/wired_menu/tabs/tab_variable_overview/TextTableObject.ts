import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { WiredMenuOverviewTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/PropertyTableObject.group';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class TextTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_variable_overview::TextTableObject'); }

    declare private _value: string;

    declare private _text: string;

    constructor(param1: string, param2: string) {
        this._value = param1;
        this._text = param2;
    }

    public get identifier(): string {
        return this._value;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: TextTableObject = param2 instanceof TextTableObject ? param2 : null;
        if (param1 == WiredMenuOverviewTab._SafeStr_6806) {
            return this._text != _loc3_.text;
        }
        return false;
    }

    public isUpdated(param1: any): boolean {
        let _loc2_: TextTableObject = param1 instanceof TextTableObject ? param1 : null;
        return this._text != _loc2_.text;
    }

    public getTableCell(param1: string): TableCell {
        if (param1 == WiredMenuOverviewTab._SafeStr_7427) {
            return new TableCell(TableCell._SafeStr_2166, this._value, false, true);
        }
        if (param1 == WiredMenuOverviewTab._SafeStr_6806) {
            return new TableCell(TableCell._SafeStr_2166, this.text, false, true);
        }
        return null;
    }

    public get text(): string {
        return this._text;
    }
}
