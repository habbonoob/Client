import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomForwardMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomForwardMessageParser';

export class RoomForwardMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::RoomForwardMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomForwardMessageParser);
    }

    public getParser(): RoomForwardMessageParser {
        return this._parser instanceof RoomForwardMessageParser ? this._parser : null;
    }
}
