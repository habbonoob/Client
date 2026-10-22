import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export class MarketPlaceOffer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketPlaceOffer'); }

    constructor(param1: number, param2: number, param3: number, param4: string, param5: IStuffData, param6: number, param7: number, param8: number, param9: number, param10: number = -1) {
        this._offerId = param1;
        this._furniId = param2;
        this._furniType = param3;
        this._extraData = param4;
        this._stuffData = param5;
        this._price = param6;
        this._status = param7;
        this._timeLeftMinutes = param8;
        this._averagePrice = param9;
        this._offerCount = param10;
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _furniType: number;
    static { (this.prototype as any)._furniType = 0; }

    declare private _extraData: string;

    declare private _stuffData: IStuffData;

    declare private _price: number;
    static { (this.prototype as any)._price = 0; }

    declare private _averagePrice: number;
    static { (this.prototype as any)._averagePrice = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    private _timeLeftMinutes: number = -1;

    public get timeLeftMinutes(): number {
        return this._timeLeftMinutes;
    }

    declare private _offerCount: number;
    static { (this.prototype as any)._offerCount = 0; }

    public get offerCount(): number {
        return this._offerCount;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get furniType(): number {
        return this._furniType;
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

    public get averagePrice(): number {
        return this._averagePrice;
    }
}
