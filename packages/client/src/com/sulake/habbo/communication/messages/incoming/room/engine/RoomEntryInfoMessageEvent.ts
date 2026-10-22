import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';

export class RoomEntryInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::RoomEntryInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomEntryInfoMessageParser);
    }

    public getParser(): RoomEntryInfoMessageParser {
        return this._parser instanceof RoomEntryInfoMessageParser ? this._parser : null;
    }
}
