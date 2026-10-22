import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SpecialSystemChatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/SpecialSystemChatMessageParser';

export class SpecialSystemChatMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::SpecialSystemChatMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SpecialSystemChatMessageParser);
    }

    public getParser(): SpecialSystemChatMessageParser {
        return this._parser instanceof SpecialSystemChatMessageParser ? this._parser : null;
    }
}
