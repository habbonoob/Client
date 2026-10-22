import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradeNftAssetsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftAssetsMessageParser';

export class TradeNftAssetsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles.trading::TradeNftAssetsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TradeNftAssetsMessageParser);
    }

    public getParser(): TradeNftAssetsMessageParser {
        return this._parser instanceof TradeNftAssetsMessageParser ? this._parser : null;
    }
}
