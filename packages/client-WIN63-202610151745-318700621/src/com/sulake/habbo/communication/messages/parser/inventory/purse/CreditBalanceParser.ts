import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CreditBalanceParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.purse::CreditBalanceParser'); }

    declare private _balance: number;
    static { (this.prototype as any)._balance = 0; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._balance = Number(param1.readString()) | 0;
        return true;
    }

    public flush(): boolean {
        return true;
    }

    public get balance(): number {
        return this._balance;
    }
}
