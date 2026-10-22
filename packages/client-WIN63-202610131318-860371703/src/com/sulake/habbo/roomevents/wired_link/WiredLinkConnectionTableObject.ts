import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredLinkConnection } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkConnection';
import type { WiredLinkController } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkController';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export class WiredLinkConnectionTableObject implements ITableObject {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_link::WiredLinkConnectionTableObject'); }

    declare private _controller: WiredLinkController;

    declare private _connection: WiredLinkConnection;

    constructor(param1: WiredLinkController, param2: WiredLinkConnection) {
        this._controller = param1;
        this._connection = param2;
    }

    public get identifier(): string {
        return this._connection.roomId + ":" + this._connection.furniId;
    }

    public getTableCell(param1: string): TableCell {
        switch (param1) {
            case "room":
                return new TableCell(TableCell._SafeStr_2166, this._connection.roomName, false, true, this._connection.roomName);
            case "room_id":
                return new TableCell(TableCell._SafeStr_2166, String(this._connection.roomId));
            case "furni":
                return new TableCell(TableCell._SafeStr_2166, String(this._connection.furniId));
            case "receive_local":
                return new TableCell(TableCell._SafeStr_2166, this._connection.receiveLocal ? "${wiredlink.receive_local.yes}" : "${wiredlink.receive_local.no}");
            case "visit":
                return new TableCell(TableCell._SafeStr_3709, "${wiredlink.visit_room}", false, false, null, this.onVisitRoom);
            default:
                return null;
        }
    }

    private onVisitRoom = (): void => {
        this._controller.visitRoom(this._connection.roomId);
    };

    public isPropertyUpdated(param1: string, param2: any): boolean {
        let _loc3_: WiredLinkConnectionTableObject = param2 instanceof WiredLinkConnectionTableObject ? param2 : null;
        switch (param1) {
            case "room":
                return this._connection.roomName != _loc3_._connection.roomName;
            case "room_id":
                return this._connection.roomId != _loc3_._connection.roomId;
            case "furni":
                return this._connection.furniId != _loc3_._connection.furniId;
            case "receive_local":
                return this._connection.receiveLocal != _loc3_._connection.receiveLocal;
            case "visit":
                return this._connection.roomId != _loc3_._connection.roomId;
            default:
                return false;
        }
    }

    public isUpdated(param1: any): boolean {
        return this.isPropertyUpdated("room", param1) || this.isPropertyUpdated("room_id", param1) || this.isPropertyUpdated("furni", param1) || this.isPropertyUpdated("receive_local", param1) || this.isPropertyUpdated("visit", param1);
    }
}
