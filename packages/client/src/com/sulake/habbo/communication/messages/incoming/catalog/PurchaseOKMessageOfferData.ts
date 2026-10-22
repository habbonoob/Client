import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CatalogPageMessageProductData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageProductData';

export class PurchaseOKMessageOfferData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::PurchaseOKMessageOfferData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._offerId = param1.readInteger();
        this._localizationId = param1.readString();
        this._isRent = param1.readBoolean();
        this._priceInCredits = param1.readInteger();
        this._priceInActivityPoints = param1.readInteger();
        this._activityPointType = param1.readInteger();
        this._SafeStr_5614 = param1.readBoolean();
        let _loc3_: number = param1.readInteger();
        this._products = new Array<CatalogPageMessageProductData>(0).fill(null);
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._products.push(new CatalogPageMessageProductData(param1));
            _loc2_++;
        }
        this._clubLevel = param1.readInteger();
        this._bundlePurchaseAllowed = param1.readBoolean();
    }

    declare private _localizationId: string;

    declare private _isRent: boolean;
    static { (this.prototype as any)._isRent = false; }

    declare private _priceInCredits: number;
    static { (this.prototype as any)._priceInCredits = 0; }

    declare private _priceInActivityPoints: number;
    static { (this.prototype as any)._priceInActivityPoints = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    declare private _SafeStr_5614: boolean;
    static { (this.prototype as any)._SafeStr_5614 = false; }

    declare private _bundlePurchaseAllowed: boolean;
    static { (this.prototype as any)._bundlePurchaseAllowed = false; }

    declare private _products: CatalogPageMessageProductData[];

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get localizationId(): string {
        return this._localizationId;
    }

    public get isRent(): boolean {
        return this._isRent;
    }

    public get priceInCredits(): number {
        return this._priceInCredits;
    }

    public get priceInActivityPoints(): number {
        return this._priceInActivityPoints;
    }

    public get products(): CatalogPageMessageProductData[] {
        return this._products;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get giftable(): boolean {
        return this._SafeStr_5614;
    }

    public get bundlePurchaseAllowed(): boolean {
        return this._bundlePurchaseAllowed;
    }
}
