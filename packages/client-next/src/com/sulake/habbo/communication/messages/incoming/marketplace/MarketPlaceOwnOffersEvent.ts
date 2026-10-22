import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketPlaceOwnOffersParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketPlaceOwnOffersParser';

export class MarketPlaceOwnOffersEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketPlaceOwnOffersEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketPlaceOwnOffersParser);
    }

    public getParser(): MarketPlaceOwnOffersParser {
        return this._parser instanceof MarketPlaceOwnOffersParser ? this._parser : null;
    }
}
