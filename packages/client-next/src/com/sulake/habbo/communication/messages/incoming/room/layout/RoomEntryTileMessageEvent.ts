import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomEntryTileMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/layout/RoomEntryTileMessageParser';

export class RoomEntryTileMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.layout::RoomEntryTileMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomEntryTileMessageParser);
    }

    public getParser(): RoomEntryTileMessageParser {
        return this._parser instanceof RoomEntryTileMessageParser ? this._parser : null;
    }
}
