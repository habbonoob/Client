import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ClubOfferData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ClubOfferData'); }

    constructor(param1: IMessageDataWrapper) {
        this._offerId = param1.readInteger();
        this._productCode = param1.readString();
        param1.readBoolean();
        this._priceCredits = param1.readInteger();
        this._SafeStr_5965 = param1.readInteger();
        this._SafeStr_6285 = param1.readInteger();
        this._vip = param1.readBoolean();
        this._months = param1.readInteger();
        this._extraDays = param1.readInteger();
        this._SafeStr_5614 = param1.readBoolean();
        this._daysLeftAfterPurchase = param1.readInteger();
        this._year = param1.readInteger();
        this._month = param1.readInteger();
        this._day = param1.readInteger();
    }

    declare private _priceCredits: number;
    static { (this.prototype as any)._priceCredits = 0; }

    declare private _SafeStr_5965: number;
    static { (this.prototype as any)._SafeStr_5965 = 0; }

    declare private _SafeStr_6285: number;
    static { (this.prototype as any)._SafeStr_6285 = 0; }

    declare private _vip: boolean;
    static { (this.prototype as any)._vip = false; }

    declare private _months: number;
    static { (this.prototype as any)._months = 0; }

    declare private _extraDays: number;
    static { (this.prototype as any)._extraDays = 0; }

    declare private _daysLeftAfterPurchase: number;
    static { (this.prototype as any)._daysLeftAfterPurchase = 0; }

    declare private _year: number;
    static { (this.prototype as any)._year = 0; }

    declare private _day: number;
    static { (this.prototype as any)._day = 0; }

    declare private _SafeStr_5614: boolean;
    static { (this.prototype as any)._SafeStr_5614 = false; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    declare private _month: number;
    static { (this.prototype as any)._month = 0; }

    public get month(): number {
        return this._month;
    }

    public get priceCredits(): number {
        return this._priceCredits;
    }

    public get vip(): boolean {
        return this._vip;
    }

    public get months(): number {
        return this._months;
    }

    public get extraDays(): number {
        return this._extraDays;
    }

    public get daysLeftAfterPurchase(): number {
        return this._daysLeftAfterPurchase;
    }

    public get year(): number {
        return this._year;
    }

    public get day(): number {
        return this._day;
    }

    public get priceActivityPoints(): number {
        return this._SafeStr_5965;
    }

    public get priceActivityPointType(): number {
        return this._SafeStr_6285;
    }

    public get isGiftable(): boolean {
        return this._SafeStr_5614;
    }
}
