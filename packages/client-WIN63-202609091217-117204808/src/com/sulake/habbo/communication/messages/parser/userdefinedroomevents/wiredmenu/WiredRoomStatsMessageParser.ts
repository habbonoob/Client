import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredRoomStatsData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredRoomStatsData';

export class WiredRoomStatsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredRoomStatsMessageParser'); }

    declare private _roomStats: WiredRoomStatsData;

    constructor() {
    }

    public flush(): boolean {
        this._roomStats = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomStats = new WiredRoomStatsData(param1);
        return true;
    }

    public get roomStats(): WiredRoomStatsData {
        return this._roomStats;
    }
}
