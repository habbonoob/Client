import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredLogEntry } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/roomlogs/WiredLogEntry';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { WiredRoomLogListController } from '@/com/sulake/habbo/roomevents/wired_menu/roomlogs/WiredRoomLogListController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class WiredRoomLogListTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.roomlogs::WiredRoomLogListTableObject'); }

    static #staticsReady = false;

    private static COLOR_INFO: number = 4607;
    private static COLOR_WARN: number = 11757568;
    private static COLOR_ERROR: number = 14362624;
    private static COLOR_DEBUG: number = 10158534;

    private static get COLORS(): any[] {
        WiredRoomLogListTableObject.#initStatics();
        return WiredRoomLogListTableObject.COLORS;
    }
    private static set COLORS(value: any[]) {
        WiredRoomLogListTableObject.#initStatics();
        WiredRoomLogListTableObject.COLORS = value;
    }

    declare private _controller: WiredRoomLogListController;

    declare private _element: WiredLogEntry;

    constructor(param1: WiredRoomLogListController, param2: WiredLogEntry) {
        this._controller = param1;
        this._element = param2;
    }

    public get identifier(): string {
        return String(this._element.id);
    }

    public getTableCell(param1: string): TableCell {
        let _loc2_: number = WiredRoomLogListTableObject.COLORS[this._element.logLevel] | 0;
        switch (param1) {
            case "timestamp":
                return new TableCell(TableCell._SafeStr_2166, this._element.timestampStr, false, true, null, null, false, null, _loc2_ >>> 0);
            case "source":
                return new TableCell(TableCell._SafeStr_2166, this.localize("wiredmenu.logs_overview.log_source." + this._element.logSource), false, false, null, null, false, null, _loc2_ >>> 0);
            case "level":
                return new TableCell(TableCell._SafeStr_2166, this.localize("wiredmenu.logs_overview.log_level." + this._element.logLevel), false, false, null, null, false, null, _loc2_ >>> 0);
            case "message":
                return new TableCell(TableCell._SafeStr_2166, this._element.logMessage, false, true, null, null, false, null, _loc2_ >>> 0);
            default:
                return null;
        }
    }

    private localize(param1: string): string {
        return this.localization.getLocalization(param1);
    }

    private get localization(): IHabboLocalizationManager {
        return this._controller.localizationManager;
    }

    public get element(): WiredLogEntry {
        return this._element;
    }

    public isPropertyUpdated(param1: string, param2: any): boolean {
        return false;
    }

    public isUpdated(param1: any): boolean {
        return false;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (WiredRoomLogListTableObject.#staticsReady) return;
        WiredRoomLogListTableObject.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(WiredRoomLogListTableObject, name, { value, writable: true, configurable: true, enumerable: true });
        set("COLORS", null);
        set("COLORS", [WiredRoomLogListTableObject.COLOR_INFO, WiredRoomLogListTableObject.COLOR_WARN, WiredRoomLogListTableObject.COLOR_ERROR, WiredRoomLogListTableObject.COLOR_DEBUG]);
    }
}
