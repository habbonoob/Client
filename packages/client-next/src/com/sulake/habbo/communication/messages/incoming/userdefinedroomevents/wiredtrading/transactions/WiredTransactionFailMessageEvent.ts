import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTransactionFailMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionFailMessageParser';

export class WiredTransactionFailMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.transactions::WiredTransactionFailMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTransactionFailMessageParser);
    }

    public getParser(): WiredTransactionFailMessageParser {
        return this._parser instanceof WiredTransactionFailMessageParser ? this._parser : null;
    }
}
