import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export class MarketPlaceOffer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketPlaceOffer'); }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_6601: number;
    static { (this.prototype as any)._SafeStr_6601 = 0; }

    declare private _extraData: string;

    declare private _stuffData: IStuffData;

    declare private _price: number;
    static { (this.prototype as any)._price = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    private _timeLeftMinutes: number = -1;

    declare private _SafeStr_6209: number;
    static { (this.prototype as any)._SafeStr_6209 = 0; }

    declare private _offerCount: number;
    static { (this.prototype as any)._offerCount = 0; }

    declare private _statusTime: number;
    static { (this.prototype as any)._statusTime = NaN; }

    declare private _SafeStr_14152: boolean;
    static { (this.prototype as any)._SafeStr_14152 = false; }

    declare private _SafeStr_14153: boolean;
    static { (this.prototype as any)._SafeStr_14153 = false; }

    constructor(param1: number, param2: number, param3: number, param4: string, param5: IStuffData, param6: number, param7: number, param8: number, param9: number, param10: number = -1, param11: number = NaN, param12: boolean = false, param13: boolean = false) {
        this._offerId = param1;
        this._furniId = param2;
        this._SafeStr_6601 = param3;
        this._extraData = param4;
        this._stuffData = param5;
        this._price = param6;
        this._status = param7;
        this._timeLeftMinutes = param8;
        this._SafeStr_6209 = param9;
        this._offerCount = param10;
        this._statusTime = param11;
        this._SafeStr_14152 = param12;
        this._SafeStr_14153 = param13;
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get furniType(): number {
        return this._SafeStr_6601;
    }

    public get extraData(): string {
        return this._extraData;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public get price(): number {
        return this._price;
    }

    public get status(): number {
        return this._status;
    }

    public get timeLeftMinutes(): number {
        return this._timeLeftMinutes;
    }

    public get averagePrice(): number {
        return this._SafeStr_6209;
    }

    public get offerCount(): number {
        return this._offerCount;
    }

    public get statusTime(): number {
        return this._statusTime;
    }

    public get isUsable(): boolean {
        return this._SafeStr_14152;
    }

    public get isUsed(): boolean {
        return this._SafeStr_14153;
    }
}
