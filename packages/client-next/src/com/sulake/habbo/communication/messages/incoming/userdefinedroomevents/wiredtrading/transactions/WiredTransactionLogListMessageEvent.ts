import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTransactionLogListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogListMessageParser';

export class WiredTransactionLogListMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.transactions::WiredTransactionLogListMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTransactionLogListMessageParser);
    }

    public getParser(): WiredTransactionLogListMessageParser {
        return this._parser instanceof WiredTransactionLogListMessageParser ? this._parser : null;
    }
}
