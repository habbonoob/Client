import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ProductOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/ProductOfferMessageParser';

export class ProductOfferEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ProductOfferEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ProductOfferMessageParser);
    }

    public getParser(): ProductOfferMessageParser {
        return this._parser instanceof ProductOfferMessageParser ? this._parser : null;
    }
}
