import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ClubOfferExtendData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubOfferExtendData';

export class HabboClubExtendOfferMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::HabboClubExtendOfferMessageParser'); }

    declare private _offer: ClubOfferExtendData;

    constructor() {
    }

    public flush(): boolean {
        this._offer = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._offer = new ClubOfferExtendData(param1);
        return true;
    }

    public offer(): ClubOfferExtendData {
        return this._offer;
    }
}
