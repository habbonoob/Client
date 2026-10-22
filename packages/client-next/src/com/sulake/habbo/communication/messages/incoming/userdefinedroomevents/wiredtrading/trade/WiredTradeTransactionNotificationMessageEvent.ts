import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTradeTransactionNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeTransactionNotificationMessageParser';

export class WiredTradeTransactionNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.trade::WiredTradeTransactionNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTradeTransactionNotificationMessageParser);
    }

    public getParser(): WiredTradeTransactionNotificationMessageParser {
        return this._parser instanceof WiredTradeTransactionNotificationMessageParser ? this._parser : null;
    }
}
