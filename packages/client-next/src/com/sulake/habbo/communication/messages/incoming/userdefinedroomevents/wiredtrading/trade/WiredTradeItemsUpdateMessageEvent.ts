import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredTradeItemsUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/WiredTradeItemsUpdateMessageParser';

export class WiredTradeItemsUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.trade::WiredTradeItemsUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredTradeItemsUpdateMessageParser);
    }

    public getParser(): WiredTradeItemsUpdateMessageParser {
        return this._parser instanceof WiredTradeItemsUpdateMessageParser ? this._parser : null;
    }
}
