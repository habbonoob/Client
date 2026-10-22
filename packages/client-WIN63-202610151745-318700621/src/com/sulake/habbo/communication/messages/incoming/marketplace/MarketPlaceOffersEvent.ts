import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketPlaceOffersParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketPlaceOffersParser';

export class MarketPlaceOffersEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketPlaceOffersEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketPlaceOffersParser);
    }

    public getParser(): MarketPlaceOffersParser {
        return this._parser instanceof MarketPlaceOffersParser ? this._parser : null;
    }
}
