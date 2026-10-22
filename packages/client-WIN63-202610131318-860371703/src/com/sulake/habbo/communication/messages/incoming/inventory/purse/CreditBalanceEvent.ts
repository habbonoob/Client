import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CreditBalanceParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/purse/CreditBalanceParser';

export class CreditBalanceEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.purse::CreditBalanceEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CreditBalanceParser);
    }

    public getParser(): CreditBalanceParser {
        return this._parser instanceof CreditBalanceParser ? this._parser : null;
    }
}
