import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class PlacedObjectPurchaseData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purchase::PlacedObjectPurchaseData'); }

    private _disposed: boolean = false;

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    private _wallLocation: string = "";
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _direction: number = 0;

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _productClassId: number;
    static { (this.prototype as any)._productClassId = 0; }

    declare private _productData: IProductData;

    declare private _furniData: IFurnitureData;

    declare private _extraParameter: string;

    constructor(param1: number, param2: number, param3: number, param4: string, param5: number, param6: number, param7: number, param8: IPurchasableOffer) {
        this._roomId = param1;
        this._objectId = param2;
        this._category = param3;
        this._wallLocation = param4;
        this._SafeStr_2126 = param5;
        this._y = param6;
        this._direction = param7;
        this.setOfferData(param8);
    }

    public dispose(): void {
        this._disposed = true;
        this._productData = null;
        this._furniData = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private setOfferData(param1: IPurchasableOffer): void {
        this._offerId = param1.offerId;
        this._productClassId = param1.product.productClassId;
        this._productData = param1.product.productData;
        this._furniData = param1.product.furnitureData;
        this._extraParameter = param1.product.extraParam;
    }

    public toString(): string {
        return stringOrNull([this._roomId, this._objectId, this._category, this._wallLocation, this._SafeStr_2126, this._y, this._direction, this._offerId, this._productClassId].toString());
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): number {
        return this._category;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get wallLocation(): string {
        return this._wallLocation;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get direction(): number {
        return this._direction;
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get productClassId(): number {
        return this._productClassId;
    }

    public get extraParameter(): string {
        return this._extraParameter;
    }

    public get furniData(): IFurnitureData {
        return this._furniData;
    }

    get [IDisposable](): true {
        return true;
    }
}
