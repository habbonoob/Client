import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradeNftAssetInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftAssetInventoryMessageParser';

export class TradeNftAssetInventoryMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.collectibles.trading::TradeNftAssetInventoryMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TradeNftAssetInventoryMessageParser);
    }

    public getParser(): TradeNftAssetInventoryMessageParser {
        return this._parser instanceof TradeNftAssetInventoryMessageParser ? this._parser : null;
    }
}
