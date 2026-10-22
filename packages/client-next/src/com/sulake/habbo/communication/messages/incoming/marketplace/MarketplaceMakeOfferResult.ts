import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketplaceMakeOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceMakeOfferResultParser';

export class MarketplaceMakeOfferResult extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceMakeOfferResult'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketplaceMakeOfferResultParser);
    }

    public getParser(): MarketplaceMakeOfferResultParser {
        return this._parser instanceof MarketplaceMakeOfferResultParser ? this._parser : null;
    }
}
