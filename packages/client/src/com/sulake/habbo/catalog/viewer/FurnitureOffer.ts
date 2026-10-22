import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import { FurniProductContainer } from '@/com/sulake/habbo/catalog/viewer/FurniProductContainer';
import { isIGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import { Product } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';

export class FurnitureOffer implements IPurchasableOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::FurnitureOffer'); }

    constructor(param1: IFurnitureData, param2: HabboCatalog) {
        this._furniData = param1;
        this._SafeStr_2499 = new FurniProductContainer(this, new Array<IProduct>(0).fill(null), param2, this._furniData);
        this._product = new Product(this._furniData.type, this._furniData.id, this._furniData.customParams, 1, param2.getProductData(this._furniData.className), this._furniData, param2);
    }

    declare private _furniData: IFurnitureData;

    declare private _previewCallbackId: number;
    static { (this.prototype as any)._previewCallbackId = 0; }

    declare private _page: ICatalogPage;

    declare private _SafeStr_2499: FurniProductContainer;

    declare private _product: Product;

    public get disposed(): boolean {
        return this._furniData == null;
    }

    public get offerId(): number {
        return this.isRentOffer ? this._furniData.rentOfferId : this._furniData.purchaseOfferId;
    }

    public get priceInActivityPoints(): number {
        return 0;
    }

    public get activityPointType(): number {
        return 0;
    }

    public get priceInCredits(): number {
        return 0;
    }

    public get page(): ICatalogPage {
        return this._page;
    }

    public set page(param1: ICatalogPage) {
        this._page = param1;
    }

    public get priceType(): string {
        return "";
    }

    public get productContainer(): IProductContainer {
        return this._SafeStr_2499;
    }

    public get product(): IProduct {
        return this._product;
    }

    public get gridItem(): IGridItem {
        return isIGridItem(this._SafeStr_2499) ? this._SafeStr_2499 : null;
    }

    public get localizationId(): string {
        return "roomItem.name." + this._furniData.id;
    }

    public get bundlePurchaseAllowed(): boolean {
        return false;
    }

    public get isRentOffer(): boolean {
        return this._furniData.rentOfferId > -1 && !(this._page != null && this._page.isBuilderPage);
    }

    public get giftable(): boolean {
        return false;
    }

    public get pricingModel(): string {
        return "pricing_model_furniture";
    }

    public get previewCallbackId(): number {
        return this._previewCallbackId;
    }

    public set previewCallbackId(param1: number) {
        this._previewCallbackId = param1;
    }

    public get clubLevel(): number {
        return 0;
    }

    public get badgeCode(): string {
        return "";
    }

    public get extraChatStyleCode(): string {
        return "";
    }

    public get isSingleChatStyle(): boolean {
        return false;
    }

    public get localizationName(): string {
        return this._furniData.localizedName;
    }

    public get localizationDescription(): string {
        return this._furniData.description;
    }

    public get priceInSilver(): number {
        return -1;
    }

    public get priceInEmerald(): number {
        return 0;
    }

    public dispose(): void {
        this._furniData = null;
        this._page = null;
        this._previewCallbackId = -1;
    }

    get [IPurchasableOffer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
