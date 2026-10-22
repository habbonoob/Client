import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { OfficialRoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomEntryData';
import { OfficialRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomsData';
import { PromotedRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PromotedRoomsData';

export class OfficialRoomsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::OfficialRoomsMessageParser'); }

    declare private _data: OfficialRoomsData;

    declare private _adRoom: OfficialRoomEntryData;

    declare private _promotedRooms: PromotedRoomsData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new OfficialRoomsData(param1);
        let _loc2_: number = param1.readInteger();
        if (_loc2_ > 0) {
            this._adRoom = new OfficialRoomEntryData(param1);
        }
        this._promotedRooms = new PromotedRoomsData(param1);
        return true;
    }

    public get data(): OfficialRoomsData {
        return this._data;
    }

    public get adRoom(): OfficialRoomEntryData {
        return this._adRoom;
    }

    public get promotedRooms(): PromotedRoomsData {
        return this._promotedRooms;
    }
}
