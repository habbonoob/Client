import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserBannedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/UserBannedMessageParser';

export class UserBannedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::UserBannedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserBannedMessageParser);
    }

    public getParser(): UserBannedMessageParser {
        return this._parser instanceof UserBannedMessageParser ? this._parser : null;
    }
}
