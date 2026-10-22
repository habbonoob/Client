import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';

export class ClubBuyOfferData implements IPurchasableOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.club::ClubBuyOfferData'); }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _productCode: string;

    declare private _priceCredits: number;
    static { (this.prototype as any)._priceCredits = 0; }

    declare private _SafeStr_5965: number;
    static { (this.prototype as any)._SafeStr_5965 = 0; }

    declare private _SafeStr_6285: number;
    static { (this.prototype as any)._SafeStr_6285 = 0; }

    declare private _SafeStr_6726: boolean;
    static { (this.prototype as any)._SafeStr_6726 = false; }

    declare private _SafeStr_6400: number;
    static { (this.prototype as any)._SafeStr_6400 = 0; }

    declare private _SafeStr_6475: number;
    static { (this.prototype as any)._SafeStr_6475 = 0; }

    declare private _page: ICatalogPage;

    declare private _year: number;
    static { (this.prototype as any)._year = 0; }

    declare private _month: number;
    static { (this.prototype as any)._month = 0; }

    declare private _day: number;
    static { (this.prototype as any)._day = 0; }

    declare private _extraParameter: string;

    private _upgradeHcPeriodToVip: boolean = false;
    private _disposed: boolean = false;

    declare private _extraDays: number;
    static { (this.prototype as any)._extraDays = 0; }

    declare private _SafeStr_5614: boolean;
    static { (this.prototype as any)._SafeStr_5614 = false; }

    constructor(param1: number, param2: string, param3: number, param4: number, param5: number, param6: boolean, param7: number, param8: number, param9: number, param10: number, param11: number, param12: number, param13: boolean = false) {
        this._offerId = param1;
        this._productCode = param2;
        this._priceCredits = param3;
        this._SafeStr_5965 = param4;
        this._SafeStr_6285 = param5;
        this._SafeStr_6726 = param6;
        this._SafeStr_6400 = param7;
        this._extraDays = param8;
        this._SafeStr_6475 = param9;
        this._year = param10;
        this._month = param11;
        this._day = param12;
        this._SafeStr_5614 = param13;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._disposed = true;
        this._page = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get extraParameter(): string {
        return this._extraParameter;
    }

    public set extraParameter(param1: string) {
        this._extraParameter = param1;
    }

    public get offerId(): number {
        return this._offerId;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get priceCredits(): number {
        return this._priceCredits;
    }

    public get vip(): boolean {
        return this._SafeStr_6726;
    }

    public get months(): number {
        return this._SafeStr_6400;
    }

    public get daysLeftAfterPurchase(): number {
        return this._SafeStr_6475;
    }

    public get year(): number {
        return this._year;
    }

    public get month(): number {
        return this._month;
    }

    public get day(): number {
        return this._day;
    }

    public get isGiftable(): boolean {
        return this._SafeStr_5614;
    }

    public get priceInActivityPoints(): number {
        return this._SafeStr_5965;
    }

    public get activityPointType(): number {
        return this._SafeStr_6285;
    }

    public get priceInCredits(): number {
        return this._priceCredits;
    }

    public get page(): ICatalogPage {
        return this._page;
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
        return this._productCode;
    }

    public set page(param1: ICatalogPage) {
        this._page = param1;
    }

    public get upgradeHcPeriodToVip(): boolean {
        return this._upgradeHcPeriodToVip;
    }

    public set upgradeHcPeriodToVip(param1: boolean) {
        this._upgradeHcPeriodToVip = param1;
    }

    public get extraDays(): number {
        return this._extraDays;
    }

    public get bundlePurchaseAllowed(): boolean {
        return false;
    }

    public get isRentOffer(): boolean {
        return false;
    }

    public get giftable(): boolean {
        return this._SafeStr_5614;
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

    get [IPurchasableOffer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
