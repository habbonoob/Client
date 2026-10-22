import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PurchaseOKMessageOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/PurchaseOKMessageOfferData';

export class PurchaseOKMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::PurchaseOKMessageParser'); }

    constructor() {
    }

    declare private _offer: PurchaseOKMessageOfferData;

    public get offer(): PurchaseOKMessageOfferData {
        return this._offer;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._offer = new PurchaseOKMessageOfferData(param1);
        return true;
    }
}
