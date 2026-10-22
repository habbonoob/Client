import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradeSilverFeeParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradeSilverFeeParser';

export class TradeSilverFeeMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradeSilverFeeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TradeSilverFeeParser);
    }

    public getParser(): TradeSilverFeeParser {
        return this._parser instanceof TradeSilverFeeParser ? this._parser : null;
    }
}
