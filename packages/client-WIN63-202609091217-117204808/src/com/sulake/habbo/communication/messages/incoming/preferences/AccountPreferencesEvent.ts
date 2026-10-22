import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AccountPreferencesParser } from '@/com/sulake/habbo/communication/messages/parser/preferences/AccountPreferencesParser';

export class AccountPreferencesEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.preferences::AccountPreferencesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AccountPreferencesParser);
    }

    public getParser(): AccountPreferencesParser {
        return this._parser instanceof AccountPreferencesParser ? this._parser : null;
    }
}
