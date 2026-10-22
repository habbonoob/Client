import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredTradeTransactionNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade::WiredTradeTransactionNotificationMessageParser'); }

    constructor() {
    }

    declare private _tradeTransactionNotificationId: number;
    static { (this.prototype as any)._tradeTransactionNotificationId = 0; }

    public get tradeTransactionNotificationId(): number {
        return this._tradeTransactionNotificationId;
    }

    public flush(): boolean {
        this._tradeTransactionNotificationId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._tradeTransactionNotificationId = param1.readInteger();
        return true;
    }
}
