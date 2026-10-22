import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';
import type { NftStoreOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStoreOffer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';

export class NftStorePurchaseOffer implements IPurchasableOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::NftStorePurchaseOffer'); }

    declare private _SafeStr_4426: NftStoreOffer;

    constructor(param1: NftStoreOffer) {
        this._SafeStr_4426 = param1;
    }

    public get offerId(): number {
        return 0;
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

    public get priceInSilver(): number {
        return 0;
    }

    public get page(): ICatalogPage {
        return null;
    }

    public get priceType(): string {
        return "price_type_silver";
    }

    public get product(): IProduct {
        return null;
    }

    public get productContainer(): IProductContainer {
        return null;
    }

    public get gridItem(): IGridItem {
        return null;
    }

    public get localizationId(): string {
        return this._SafeStr_4426.productCode;
    }

    public get bundlePurchaseAllowed(): boolean {
        return false;
    }

    public get isRentOffer(): boolean {
        return false;
    }

    public get giftable(): boolean {
        return false;
    }

    public get pricingModel(): string {
        return "";
    }

    public set previewCallbackId(param1: number) {
    }

    public get previewCallbackId(): number {
        return 0;
    }

    public get clubLevel(): number {
        return 0;
    }

    public get badgeCode(): string {
        return "";
    }

    public set page(param1: ICatalogPage) {
    }

    public get localizationName(): string {
        return "";
    }

    public get localizationDescription(): string {
        return "";
    }

    public get productCode(): string {
        return this._SafeStr_4426.productCode;
    }

    public get priceInEmerald(): number {
        return this._SafeStr_4426.emeraldPrice;
    }

    public get productInfo(): CollectibleBaseItem {
        return this._SafeStr_4426.productInfo;
    }

    public dispose(): void {
    }

    public get disposed(): boolean {
        return false;
    }

    public get extraChatStyleCode(): string {
        return "";
    }

    public get isSingleChatStyle(): boolean {
        return false;
    }

    get [IPurchasableOffer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
