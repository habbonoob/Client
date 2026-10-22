import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredTransactionLogList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogList';

export class WiredTransactionLogListMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionLogListMessageParser'); }

    constructor() {
    }

    declare private _logs: WiredTransactionLogList;

    public get logs(): WiredTransactionLogList {
        return this._logs;
    }

    public flush(): boolean {
        this._logs = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._logs = new WiredTransactionLogList(param1);
        return true;
    }
}
