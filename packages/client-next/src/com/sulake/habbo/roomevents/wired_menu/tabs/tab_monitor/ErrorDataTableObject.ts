import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredErrorData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredErrorData';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { WiredMenuMonitorTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_monitor/ErrorDataTableObject.group';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class ErrorDataTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_monitor::ErrorDataTableObject'); }

    declare private _SafeStr_7089: WiredMenuMonitorTab;

    declare private _data: WiredErrorData;

    declare private _localization: IHabboLocalizationManager;

    constructor(param1: WiredMenuMonitorTab, param2: WiredErrorData, param3: IHabboLocalizationManager) {
        this._SafeStr_7089 = param1;
        this._data = param2;
        this._localization = param3;
    }

    private static convertTimestamp(param1: number): string {
        let _loc2_: Date = new Date(param1);
        let _loc6_: number = _loc2_.getFullYear() | 0;
        let _loc5_: number = _loc2_.getMonth() + 1 | 0;
        let _loc8_: number = _loc2_.getDate() | 0;
        let _loc3_: number = _loc2_.getHours() | 0;
        let _loc7_: number = _loc2_.getMinutes() | 0;
        let _loc4_: number = _loc2_.getSeconds() | 0;
        return _loc6_ + "-" + ErrorDataTableObject.addLeadingZero(_loc5_) + "-" + ErrorDataTableObject.addLeadingZero(_loc8_) + " " + ErrorDataTableObject.addLeadingZero(_loc3_) + ":" + ErrorDataTableObject.addLeadingZero(_loc7_) + ":" + ErrorDataTableObject.addLeadingZero(_loc4_);
    }

    private static addLeadingZero(param1: number): string {
        return param1 < 10 ? "0" + param1.toString() : param1.toString();
    }

    public get data(): WiredErrorData {
        return this._data;
    }

    public get identifier(): string {
        return String(this._data.errorId);
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: WiredErrorData = (param2 instanceof ErrorDataTableObject ? param2 : null).data;
        switch (param1) {
            case WiredMenuMonitorTab._SafeStr_6468:
                return this._data.throwCount != _loc3_.throwCount;
            case WiredMenuMonitorTab.LOG_COLUMN_LATEST:
                return this._data.msSinceLastOccurrence != _loc3_.msSinceLastOccurrence;
            default:
                return false;
        }
    }

    public isUpdated(param1: any): boolean {
        let _loc2_: WiredErrorData = (param1 instanceof ErrorDataTableObject ? param1 : null).data;
        return this._data.msSinceLastOccurrence != _loc2_.msSinceLastOccurrence || this._data.throwCount != _loc2_.throwCount;
    }

    public onLinkClicked = (): void => {
        this._SafeStr_7089.onErrorLinkClicked(this._data);
    };

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case WiredMenuMonitorTab.LOG_COLUMN_TYPE:
                return new TableCell(TableCell._SafeStr_3709, this._data.errorName, false, false, null, this.onLinkClicked);
            case WiredMenuMonitorTab._SafeStr_7383:
                return new TableCell(TableCell._SafeStr_2166, this._data.category);
            case WiredMenuMonitorTab._SafeStr_6468:
                return new TableCell(TableCell._SafeStr_2166, String(this._data.throwCount));
            case WiredMenuMonitorTab.LOG_COLUMN_LATEST:
                if (this._data.msSinceLastOccurrence < 0) {
                    return new TableCell(TableCell._SafeStr_2166, "/");
                }
                return new TableCell(TableCell._SafeStr_2166, FriendlyTime.getFriendlyTime(this._localization, this._data.msSinceLastOccurrence / 1000, ".ago", 3), false, false, null, null, false, this.timestampString);
                break;
            default:
                return null;
        }
    }

    private get timestampString(): string {
        let _loc1_: number = new Date().getTime() - this._data.msSinceLastOccurrence;
        _loc1_ -= _loc1_ % 1000;
        return ErrorDataTableObject.convertTimestamp(_loc1_);
    }
}
