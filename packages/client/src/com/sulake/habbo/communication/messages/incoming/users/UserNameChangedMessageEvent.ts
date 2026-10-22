import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserNameChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/UserNameChangedMessageParser';

export class UserNameChangedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::UserNameChangedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserNameChangedMessageParser);
    }

    public getParser(): UserNameChangedMessageParser {
        return this._parser instanceof UserNameChangedMessageParser ? this._parser : null;
    }
}
