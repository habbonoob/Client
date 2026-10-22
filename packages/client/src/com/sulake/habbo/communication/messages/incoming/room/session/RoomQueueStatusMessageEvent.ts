import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomQueueStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomQueueStatusMessageParser';

export class RoomQueueStatusMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::RoomQueueStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomQueueStatusMessageParser);
    }

    public getParser(): RoomQueueStatusMessageParser {
        return this._parser instanceof RoomQueueStatusMessageParser ? this._parser : null;
    }
}
