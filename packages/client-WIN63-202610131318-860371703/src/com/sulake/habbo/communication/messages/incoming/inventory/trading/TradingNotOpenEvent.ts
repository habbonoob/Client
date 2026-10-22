import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingNotOpenParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingNotOpenParser';

export class TradingNotOpenEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingNotOpenEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradingNotOpenParser {
        return this._parser instanceof TradingNotOpenParser ? this._parser : null;
    }
}
