import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniRentOrBuyoutOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/FurniRentOrBuyoutOfferMessageParser';

export class FurniRentOrBuyoutOfferMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::FurniRentOrBuyoutOfferMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniRentOrBuyoutOfferMessageParser);
    }

    public getParser(): FurniRentOrBuyoutOfferMessageParser {
        return this._parser instanceof FurniRentOrBuyoutOfferMessageParser ? this._parser : null;
    }
}
