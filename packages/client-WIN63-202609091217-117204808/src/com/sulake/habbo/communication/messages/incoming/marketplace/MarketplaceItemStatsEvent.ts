import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketplaceItemStatsParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceItemStatsParser';

export class MarketplaceItemStatsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceItemStatsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketplaceItemStatsParser);
    }

    public getParser(): MarketplaceItemStatsParser {
        return this._parser instanceof MarketplaceItemStatsParser ? this._parser : null;
    }
}
