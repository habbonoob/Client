import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredLinkNetwork } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkNetwork';
import type { WiredLinkController } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class WiredLinkNetworkTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_link::WiredLinkNetworkTableObject'); }

    declare private _controller: WiredLinkController;

    declare private _SafeStr_14561: WiredLinkNetwork;

    declare private _current: boolean;
    static { (this.prototype as any)._current = false; }

    constructor(param1: WiredLinkController, param2: WiredLinkNetwork, param3: boolean) {
        this._controller = param1;
        this._SafeStr_14561 = param2;
        this._current = param3;
    }

    public static compare(param1: WiredLinkNetworkTableObject, param2: WiredLinkNetworkTableObject): number {
        if (param1._SafeStr_14561.linkedInCurrentRoom != param2._SafeStr_14561.linkedInCurrentRoom) {
            return param1._SafeStr_14561.linkedInCurrentRoom ? -1 : 1;
        }
        return param1._SafeStr_14561.name.localeCompare(param2._SafeStr_14561.name);
    }

    public get identifier(): string {
        return this._SafeStr_14561.id;
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case "name":
                return new TableCell(TableCell._SafeStr_2166, this._SafeStr_14561.name);
            case "count":
                return new TableCell(TableCell._SafeStr_2166, String(this._SafeStr_14561.connectionCount));
            case "status":
                if (!this._current && !this._SafeStr_14561.linkedInCurrentRoom) {
                    return new TableCell(TableCell._SafeStr_3709, "${wiredlink.status.connect}", false, false, null, this.onConnect);
                }
                return new TableCell(TableCell._SafeStr_2166, this._current ? "${wiredlink.status.connected}" : "${wiredlink.status.linked_in_room}", false, false, null, null, false, null, (this._current ? 2650950 : 5592405) >>> 0);
                break;
            case "manage":
                return new TableCell(TableCell._SafeStr_3709, "${wiredlink.manage}", false, false, null, this.onManage);
            default:
                return null;
        }
    }

    private onConnect = (): void => {
        this._controller.save(this._SafeStr_14561.id, this._controller.receiveLocal);
    };

    private onManage = (): void => {
        this._controller.getConnections(this._SafeStr_14561.id);
    };

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: WiredLinkNetworkTableObject = param2 instanceof WiredLinkNetworkTableObject ? param2 : null;
        switch (param1) {
            case "name":
                return this._SafeStr_14561.name != _loc3_._SafeStr_14561.name;
            case "count":
                return this._SafeStr_14561.connectionCount != _loc3_._SafeStr_14561.connectionCount;
            case "status":
                return this._SafeStr_14561.linkedInCurrentRoom != _loc3_._SafeStr_14561.linkedInCurrentRoom || this._current != _loc3_._current;
            default:
                return false;
        }
    }

    public isUpdated(param1: any): boolean {
        return this.isPropertyUpdated("name", param1) || this.isPropertyUpdated("count", param1) || this.isPropertyUpdated("status", param1);
    }
}
