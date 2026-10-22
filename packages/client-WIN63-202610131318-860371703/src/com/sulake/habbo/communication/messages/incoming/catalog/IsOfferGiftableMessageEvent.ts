import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IsOfferGiftableMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/IsOfferGiftableMessageParser';

export class IsOfferGiftableMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::IsOfferGiftableMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IsOfferGiftableMessageParser);
    }

    public getParser(): IsOfferGiftableMessageParser {
        return this._parser instanceof IsOfferGiftableMessageParser ? this._parser : null;
    }
}
