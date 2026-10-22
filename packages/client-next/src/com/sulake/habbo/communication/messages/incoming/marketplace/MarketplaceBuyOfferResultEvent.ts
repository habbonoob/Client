import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketplaceBuyOfferResultParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceBuyOfferResultParser';

export class MarketplaceBuyOfferResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceBuyOfferResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketplaceBuyOfferResultParser);
    }

    public getParser(): MarketplaceBuyOfferResultParser {
        return this._parser instanceof MarketplaceBuyOfferResultParser ? this._parser : null;
    }
}
