import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTradeInitiateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeInitiateMessageParser';

export class WiredTradeInitiateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.trade::WiredTradeInitiateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTradeInitiateMessageParser);
    }

    public getParser(): WiredTradeInitiateMessageParser {
        return this._parser instanceof WiredTradeInitiateMessageParser ? this._parser : null;
    }
}
