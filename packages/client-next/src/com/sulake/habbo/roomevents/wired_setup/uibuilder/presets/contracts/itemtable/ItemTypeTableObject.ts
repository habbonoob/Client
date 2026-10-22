import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class ItemTypeTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts.itemtable::ItemTypeTableObject'); }

    declare private _chestItemType: ChestItemType;

    declare private _localizedName: string;

    declare private _SafeStr_7326: string;

    declare private _displayCode: string;

    constructor(param1: ChestItemType, param2: string, param3: string) {
        this._chestItemType = param1;
        this._localizedName = param2;
        this._displayCode = param3;
        this._SafeStr_7326 = param2.toLowerCase();
    }

    public get identifier(): string {
        return (this._chestItemType.isWallItem ? "1-" : "0-") + this._displayCode;
    }

    public getTableCell(param1: string): TableCell {
        let _loc2_: string = null;
        switch (param1) {
            case "furni_name":
                return new TableCell(TableCell._SafeStr_2166, this._localizedName, false, true);
            case "furni_code":
                return new TableCell(TableCell._SafeStr_2166, this._displayCode, false, true);
            case "furni_type":
                _loc2_ = this._chestItemType.isWallItem ? "${inventory.filter.placement.wall}" : "${inventory.filter.placement.floor}";
                return new TableCell(TableCell._SafeStr_2166, _loc2_);
            default:
                return null;
        }
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        return false;
    }

    public isUpdated(param1: any): boolean {
        return false;
    }

    public get chestItemType(): ChestItemType {
        return this._chestItemType;
    }

    public get localizedName(): string {
        return this._localizedName;
    }

    public get displayCode(): string {
        return this._displayCode;
    }

    public matchesSubstring(param1: string): boolean {
        return this._SafeStr_7326.indexOf(param1) != -1 || this._displayCode.indexOf(param1) != -1;
    }
}
