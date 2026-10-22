import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradeOpenFailedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradeOpenFailedParser';

export class TradeOpenFailedEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradeOpenFailedEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public getParser(): TradeOpenFailedParser {
        return this._parser instanceof TradeOpenFailedParser ? this._parser : null;
    }
}
