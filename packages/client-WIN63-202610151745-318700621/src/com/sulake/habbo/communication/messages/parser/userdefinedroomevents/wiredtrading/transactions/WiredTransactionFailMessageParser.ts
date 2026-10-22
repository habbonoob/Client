import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredTransactionFailMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionFailMessageParser'); }

    declare private _transactionFailureTypeId: number;
    static { (this.prototype as any)._transactionFailureTypeId = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._transactionFailureTypeId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._transactionFailureTypeId = param1.readInteger();
        return true;
    }

    public get transactionFailureTypeId(): number {
        return this._transactionFailureTypeId;
    }
}
