import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomReadyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomReadyMessageParser';

export class RoomReadyMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::RoomReadyMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomReadyMessageParser);
    }

    public getParser(): RoomReadyMessageParser {
        return this._parser instanceof RoomReadyMessageParser ? this._parser : null;
    }
}
