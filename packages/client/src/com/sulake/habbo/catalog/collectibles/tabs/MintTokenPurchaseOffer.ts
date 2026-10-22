import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { MintTokenOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/MintTokenOffer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';

export class MintTokenPurchaseOffer implements IPurchasableOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs::MintTokenPurchaseOffer'); }

    constructor(param1: MintTokenOffer) {
        this._SafeStr_5165 = param1;
    }

    declare public _SafeStr_5165: MintTokenOffer;

    public get offerId(): number {
        return this._SafeStr_5165.offerId;
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
        return this._SafeStr_5165.silverPrice;
    }

    public get page(): ICatalogPage {
        return null;
    }

    public set page(param1: ICatalogPage) {
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
        return this._SafeStr_5165.productCode;
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

    public get previewCallbackId(): number {
        return 0;
    }

    public set previewCallbackId(param1: number) {
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
        return "";
    }

    public get localizationDescription(): string {
        return "";
    }

    public get disposed(): boolean {
        return false;
    }

    public get priceInEmerald(): number {
        return 0;
    }

    public dispose(): void {
    }

    get [IPurchasableOffer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
