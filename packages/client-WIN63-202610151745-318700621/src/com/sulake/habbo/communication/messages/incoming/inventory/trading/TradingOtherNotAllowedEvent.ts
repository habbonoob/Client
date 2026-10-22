import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingOtherNotAllowedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingOtherNotAllowedParser';

export class TradingOtherNotAllowedEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingOtherNotAllowedEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradingOtherNotAllowedParser {
        return this._parser instanceof TradingOtherNotAllowedParser ? this._parser : null;
    }
}
