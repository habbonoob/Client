import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradeSilverSetParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradeSilverSetParser';

export class TradeSilverSetMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradeSilverSetMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TradeSilverSetParser);
    }

    public getParser(): TradeSilverSetParser {
        return this._parser instanceof TradeSilverSetParser ? this._parser : null;
    }
}
