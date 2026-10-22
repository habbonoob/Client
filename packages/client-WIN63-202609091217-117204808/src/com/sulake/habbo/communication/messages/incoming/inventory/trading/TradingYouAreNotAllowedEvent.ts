import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingYouAreNotAllowedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingYouAreNotAllowedParser';

export class TradingYouAreNotAllowedEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingYouAreNotAllowedEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradingYouAreNotAllowedParser {
        return this._parser instanceof TradingYouAreNotAllowedParser ? this._parser : null;
    }
}
