import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingConfirmationParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingConfirmationParser';

export class TradingConfirmationEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingConfirmationEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradingConfirmationParser {
        return this._parser instanceof TradingConfirmationParser ? this._parser : null;
    }
}
