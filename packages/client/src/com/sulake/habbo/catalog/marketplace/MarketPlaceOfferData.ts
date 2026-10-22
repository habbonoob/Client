import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceOfferData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class MarketPlaceOfferData implements IMarketPlaceOfferData {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketPlaceOfferData'); }

    public static readonly _SafeStr_7439: number = 1;
    public static readonly _SafeStr_7475: number = 2;

    constructor(param1: number, param2: number, param3: number, param4: string, param5: IStuffData, param6: number, param7: number, param8: number, param9: number = -1) {
        this._offerId = param1;
        this._furniId = param2;
        this._furniType = param3;
        this._extraData = param4;
        this._stuffData = param5;
        this._price = param6;
        this._status = param7;
        this._averagePrice = param8;
        this._offerCount = param9;
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

    declare private _image: BitmapData;

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public set offerId(param1: number) {
        this._offerId = param1;
    }

    declare private _imageCallback: number;
    static { (this.prototype as any)._imageCallback = 0; }

    public get imageCallback(): number {
        return this._imageCallback;
    }

    public set imageCallback(param1: number) {
        this._imageCallback = param1;
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

    public set timeLeftMinutes(param1: number) {
        this._timeLeftMinutes = param1;
    }

    declare private _offerCount: number;
    static { (this.prototype as any)._offerCount = 0; }

    public get offerCount(): number {
        return this._offerCount;
    }

    public set offerCount(param1: number) {
        this._offerCount = param1;
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

    public set price(param1: number) {
        this._price = param1;
    }

    public get averagePrice(): number {
        return this._averagePrice;
    }

    public get image(): BitmapData {
        return this._image;
    }

    public set image(param1: BitmapData) {
        if (this._image != null) {
            this._image.dispose();
        }
        this._image = param1;
    }

    public get isUniqueLimitedItem(): boolean {
        return this.stuffData != null && this.stuffData.uniqueSerialNumber > 0;
    }

    public dispose(): void {
        if (this._image) {
            this._image.dispose();
            this._image = null;
        }
        if (this._stuffData) {
            this._stuffData = null;
        }
    }
}
