import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ClubOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubOfferData';

export class ClubOfferExtendData extends ClubOfferData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ClubOfferExtendData'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
        this._SafeStr_5606 = param1.readInteger();
        this._SafeStr_6440 = param1.readInteger();
        this._originalActivityPointType = param1.readInteger();
        this._subscriptionDaysLeft = param1.readInteger();
    }

    declare private _SafeStr_5606: number;
    static { (this.prototype as any)._SafeStr_5606 = 0; }

    declare private _SafeStr_6440: number;
    static { (this.prototype as any)._SafeStr_6440 = 0; }

    declare private _originalActivityPointType: number;
    static { (this.prototype as any)._originalActivityPointType = 0; }

    declare private _subscriptionDaysLeft: number;
    static { (this.prototype as any)._subscriptionDaysLeft = 0; }

    public get originalPrice(): number {
        return this._SafeStr_5606 * this.months;
    }

    public get originalActivityPointPrice(): number {
        return this._SafeStr_6440 * this.months;
    }

    public get originalActivityPointType(): number {
        return this._originalActivityPointType;
    }

    public get discountCreditAmount(): number {
        return this._SafeStr_5606 * this.months - this.priceCredits;
    }

    public get discountActivityPointAmount(): number {
        return this.originalActivityPointPrice * this.months - this.priceActivityPoints;
    }

    public get subscriptionDaysLeft(): number {
        return this._subscriptionDaysLeft;
    }
}
