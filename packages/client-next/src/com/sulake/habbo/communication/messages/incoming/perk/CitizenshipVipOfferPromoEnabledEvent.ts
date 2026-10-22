import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CitizenshipVipOfferPromoEnabledMessageParser } from '@/com/sulake/habbo/communication/messages/parser/perk/CitizenshipVipOfferPromoEnabledMessageParser';

export class CitizenshipVipOfferPromoEnabledEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.perk::CitizenshipVipOfferPromoEnabledEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CitizenshipVipOfferPromoEnabledMessageParser);
    }

    public getParser(): CitizenshipVipOfferPromoEnabledMessageParser {
        return this._parser instanceof CitizenshipVipOfferPromoEnabledMessageParser ? this._parser : null;
    }
}
