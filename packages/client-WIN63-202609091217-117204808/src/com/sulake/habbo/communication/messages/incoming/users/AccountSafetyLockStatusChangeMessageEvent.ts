import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AccountSafetyLockStatusChangeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/AccountSafetyLockStatusChangeMessageParser';

export class AccountSafetyLockStatusChangeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::AccountSafetyLockStatusChangeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AccountSafetyLockStatusChangeMessageParser);
    }

    public getParser(): AccountSafetyLockStatusChangeMessageParser {
        return this._parser instanceof AccountSafetyLockStatusChangeMessageParser ? this._parser : null;
    }
}
