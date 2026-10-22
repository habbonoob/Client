import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredTransactionDetails } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionDetails';

export class WiredTransactionLogDetailsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionLogDetailsMessageParser'); }

    declare private _details: WiredTransactionDetails;

    constructor() {
    }

    public flush(): boolean {
        this._details = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._details = new WiredTransactionDetails(param1);
        return true;
    }

    public get details(): WiredTransactionDetails {
        return this._details;
    }
}
