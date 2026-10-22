import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ClubOfferData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ClubOfferData'); }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _productCode: string;

    declare private _priceCredits: number;
    static { (this.prototype as any)._priceCredits = 0; }

    declare private _SafeStr_5965: number;
    static { (this.prototype as any)._SafeStr_5965 = 0; }

    declare private _SafeStr_6285: number;
    static { (this.prototype as any)._SafeStr_6285 = 0; }

    declare private _SafeStr_6726: boolean;
    static { (this.prototype as any)._SafeStr_6726 = false; }

    declare private _SafeStr_6400: number;
    static { (this.prototype as any)._SafeStr_6400 = 0; }

    declare private _extraDays: number;
    static { (this.prototype as any)._extraDays = 0; }

    declare private _SafeStr_6475: number;
    static { (this.prototype as any)._SafeStr_6475 = 0; }

    declare private _year: number;
    static { (this.prototype as any)._year = 0; }

    declare private _month: number;
    static { (this.prototype as any)._month = 0; }

    declare private _day: number;
    static { (this.prototype as any)._day = 0; }

    declare private _SafeStr_5614: boolean;
    static { (this.prototype as any)._SafeStr_5614 = false; }

    constructor(param1: IMessageDataWrapper) {
        this._offerId = param1.readInteger();
        this._productCode = param1.readString();
        param1.readBoolean();
        this._priceCredits = param1.readInteger();
        this._SafeStr_5965 = param1.readInteger();
        this._SafeStr_6285 = param1.readInteger();
        this._SafeStr_6726 = param1.readBoolean();
        this._SafeStr_6400 = param1.readInteger();
        this._extraDays = param1.readInteger();
        this._SafeStr_5614 = param1.readBoolean();
        this._SafeStr_6475 = param1.readInteger();
        this._year = param1.readInteger();
        this._month = param1.readInteger();
        this._day = param1.readInteger();
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get priceCredits(): number {
        return this._priceCredits;
    }

    public get vip(): boolean {
        return this._SafeStr_6726;
    }

    public get months(): number {
        return this._SafeStr_6400;
    }

    public get extraDays(): number {
        return this._extraDays;
    }

    public get daysLeftAfterPurchase(): number {
        return this._SafeStr_6475;
    }

    public get year(): number {
        return this._year;
    }

    public get month(): number {
        return this._month;
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
