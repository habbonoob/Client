import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMarketPlaceOfferData } from '@/com/sulake/habbo/catalog/marketplace/IMarketPlaceOfferData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class MarketPlaceOfferData implements IMarketPlaceOfferData {
    static { registerClassName(this, 'com.sulake.habbo.catalog.marketplace::MarketPlaceOfferData'); }

    public static readonly _SafeStr_7439: number = 1;
    public static readonly _SafeStr_7475: number = 2;

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

    declare private _SafeStr_6209: number;
    static { (this.prototype as any)._SafeStr_6209 = 0; }

    declare private _imageCallback: number;
    static { (this.prototype as any)._imageCallback = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    private _timeLeftMinutes: number = -1;

    declare private _offerCount: number;
    static { (this.prototype as any)._offerCount = 0; }

    declare private _image: BitmapData;

    private _statusTime: number = NaN;

    declare private _SafeStr_14124: boolean;
    static { (this.prototype as any)._SafeStr_14124 = false; }

    declare private _SafeStr_14125: boolean;
    static { (this.prototype as any)._SafeStr_14125 = false; }

    constructor(param1: number, param2: number, param3: number, param4: string, param5: IStuffData, param6: number, param7: number, param8: number, param9: number = -1, param10: boolean = false, param11: boolean = false) {
        this._offerId = param1;
        this._furniId = param2;
        this._SafeStr_6601 = param3;
        this._extraData = param4;
        this._stuffData = param5;
        this._price = param6;
        this._status = param7;
        this._SafeStr_6209 = param8;
        this._offerCount = param9;
        this._SafeStr_14124 = param10;
        this._SafeStr_14125 = param11;
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

    public get averagePrice(): number {
        return this._SafeStr_6209;
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

    public set imageCallback(param1: number) {
        this._imageCallback = param1;
    }

    public get imageCallback(): number {
        return this._imageCallback;
    }

    public get status(): number {
        return this._status;
    }

    public get timeLeftMinutes(): number {
        return this._timeLeftMinutes;
    }

    public set timeLeftMinutes(param1: number) {
        this._timeLeftMinutes = param1;
    }

    public get statusTime(): number {
        return this._statusTime;
    }

    public set statusTime(param1: number) {
        this._statusTime = param1;
    }

    public set price(param1: number) {
        this._price = param1;
    }

    public set offerId(param1: number) {
        this._offerId = param1;
    }

    public get offerCount(): number {
        return this._offerCount;
    }

    public set offerCount(param1: number) {
        this._offerCount = param1;
    }

    public get isUniqueLimitedItem(): boolean {
        return this.stuffData != null && this.stuffData.uniqueSerialNumber > 0;
    }

    public get isUsable(): boolean {
        return this._SafeStr_14124;
    }

    public get isUsed(): boolean {
        return this._SafeStr_14125;
    }
}
