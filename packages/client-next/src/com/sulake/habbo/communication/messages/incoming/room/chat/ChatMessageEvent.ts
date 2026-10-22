import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/ChatMessageParser';

export class ChatMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::ChatMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChatMessageParser);
    }

    public getParser(): ChatMessageParser {
        return this._parser instanceof ChatMessageParser ? this._parser : null;
    }
}
