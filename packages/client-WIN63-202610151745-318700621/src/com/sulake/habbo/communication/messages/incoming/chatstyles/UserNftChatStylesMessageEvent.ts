import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserNftChatStylesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/chatstyles/UserNftChatStylesMessageParser';

export class UserNftChatStylesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.chatstyles::UserNftChatStylesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserNftChatStylesMessageParser);
    }

    public getParser(): UserNftChatStylesMessageParser {
        return this._parser instanceof UserNftChatStylesMessageParser ? this._parser : null;
    }
}
