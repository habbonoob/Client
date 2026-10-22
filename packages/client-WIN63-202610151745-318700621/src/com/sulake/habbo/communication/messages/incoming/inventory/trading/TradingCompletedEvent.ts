import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingCompletedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingCompletedParser';

export class TradingCompletedEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingCompletedEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradingCompletedParser {
        return this._parser instanceof TradingCompletedParser ? this._parser : null;
    }
}
