import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserTypingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/UserTypingMessageParser';

export class UserTypingMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::UserTypingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserTypingMessageParser);
    }

    public getParser(): UserTypingMessageParser {
        return this._parser instanceof UserTypingMessageParser ? this._parser : null;
    }
}
