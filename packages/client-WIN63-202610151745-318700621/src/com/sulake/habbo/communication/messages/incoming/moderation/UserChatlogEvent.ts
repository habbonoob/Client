import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserChatlogMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/UserChatlogMessageParser';

export class UserChatlogEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::UserChatlogEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserChatlogMessageParser);
    }

    public getParser(): UserChatlogMessageParser {
        return this._parser instanceof UserChatlogMessageParser ? this._parser : null;
    }
}
