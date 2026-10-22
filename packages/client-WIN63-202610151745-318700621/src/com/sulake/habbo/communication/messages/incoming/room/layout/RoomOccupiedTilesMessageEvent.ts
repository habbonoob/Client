import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomOccupiedTilesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/layout/RoomOccupiedTilesMessageParser';

export class RoomOccupiedTilesMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.layout::RoomOccupiedTilesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomOccupiedTilesMessageParser);
    }

    public getParser(): RoomOccupiedTilesMessageParser {
        return this._parser instanceof RoomOccupiedTilesMessageParser ? this._parser : null;
    }
}
