import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingNoSuchItemParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingNoSuchItemParser';

export class TradingNoSuchItemEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingNoSuchItemEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradingNoSuchItemParser {
        return this._parser instanceof TradingNoSuchItemParser ? this._parser : null;
    }
}
