import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CreditVaultStatusMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/vault/CreditVaultStatusMessageEventParser';

export class CreditVaultStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.vault::CreditVaultStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CreditVaultStatusMessageEventParser);
    }

    public getParser(): CreditVaultStatusMessageEventParser {
        return this._parser instanceof CreditVaultStatusMessageEventParser ? this._parser : null;
    }
}
