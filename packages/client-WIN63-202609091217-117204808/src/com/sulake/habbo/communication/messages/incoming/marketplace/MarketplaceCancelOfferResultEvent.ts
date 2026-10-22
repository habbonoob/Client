import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketplaceCancelOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceCancelOfferResultParser';

export class MarketplaceCancelOfferResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceCancelOfferResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketplaceCancelOfferResultParser);
    }

    public getParser(): MarketplaceCancelOfferResultParser {
        return this._parser instanceof MarketplaceCancelOfferResultParser ? this._parser : null;
    }
}
