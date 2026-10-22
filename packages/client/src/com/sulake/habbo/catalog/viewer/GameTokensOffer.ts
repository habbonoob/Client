import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';

export class GameTokensOffer implements IPurchasableOffer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::GameTokensOffer'); }

    constructor(param1: number, param2: string, param3: number, param4: number, param5: number) {
        this._offerId = param1;
        this._localizationId = param2;
        this._priceInCredits = param3;
        this._priceInActivityPoints = param4;
        this._activityPointType = param5;
    }

    declare private _localizationId: string;

    declare private _priceInCredits: number;
    static { (this.prototype as any)._priceInCredits = 0; }

    declare private _priceInActivityPoints: number;
    static { (this.prototype as any)._priceInActivityPoints = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get disposed(): boolean {
        return false;
    }

    public get priceInActivityPoints(): number {
        return this._priceInActivityPoints;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public get priceInCredits(): number {
        return this._priceInCredits;
    }

    public get page(): ICatalogPage {
        return null;
    }

    public set page(param1: ICatalogPage) {
    }

    public get priceType(): string {
        return "price_type_credits";
    }

    public get productContainer(): IProductContainer {
        return null;
    }

    public get product(): IProduct {
        return this.productContainer ? this.productContainer.firstProduct : null;
    }

    public get gridItem(): IGridItem {
        return null;
    }

    public get localizationId(): string {
        return this._localizationId;
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
        return "${" + this.localizationId + "}";
    }

    public get localizationDescription(): string {
        return "${" + this.localizationId + "}";
    }

    public get priceInSilver(): number {
        return -1;
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
