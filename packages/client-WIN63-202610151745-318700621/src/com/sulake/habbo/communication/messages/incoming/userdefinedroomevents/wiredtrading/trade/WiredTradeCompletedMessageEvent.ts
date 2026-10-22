import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTradeCompletedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeCompletedMessageParser';

export class WiredTradeCompletedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.trade::WiredTradeCompletedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTradeCompletedMessageParser);
    }

    public getParser(): WiredTradeCompletedMessageParser {
        return this._parser instanceof WiredTradeCompletedMessageParser ? this._parser : null;
    }
}
