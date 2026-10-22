import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketplaceCanMakeOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceCanMakeOfferResultParser';

export class MarketplaceCanMakeOfferResult extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceCanMakeOfferResult'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketplaceCanMakeOfferResultParser);
    }

    public getParser(): MarketplaceCanMakeOfferResultParser {
        return this._parser instanceof MarketplaceCanMakeOfferResultParser ? this._parser : null;
    }
}
