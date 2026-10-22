import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTransactionLogDetailsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionLogDetailsMessageParser';

export class WiredTransactionLogDetailsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.transactions::WiredTransactionLogDetailsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTransactionLogDetailsMessageParser);
    }

    public getParser(): WiredTransactionLogDetailsMessageParser {
        return this._parser instanceof WiredTransactionLogDetailsMessageParser ? this._parser : null;
    }
}
