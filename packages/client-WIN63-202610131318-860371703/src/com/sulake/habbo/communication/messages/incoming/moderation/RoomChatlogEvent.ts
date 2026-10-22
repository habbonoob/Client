import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomChatlogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/RoomChatlogMessageParser';

export class RoomChatlogEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::RoomChatlogEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomChatlogMessageParser);
    }

    public getParser(): RoomChatlogMessageParser {
        return this._parser instanceof RoomChatlogMessageParser ? this._parser : null;
    }
}
