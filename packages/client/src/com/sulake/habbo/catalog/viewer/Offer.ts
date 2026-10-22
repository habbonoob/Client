import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import { BundleProductContainer } from '@/com/sulake/habbo/catalog/viewer/BundleProductContainer';
import { isIGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import { MultiProductContainer } from '@/com/sulake/habbo/catalog/viewer/MultiProductContainer';
import { Product, ProductContainer } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { SingleProductContainer } from '@/com/sulake/habbo/catalog/viewer/SingleProductContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class Offer implements IPurchasableOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::Offer'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        Offer.#initStatics();
        return Offer._log;
    }

    public static readonly PRICING_MODEL_UNKNOWN: string = "pricing_model_unknown";
    public static readonly PRICING_MODEL_SINGLE: string = "pricing_model_single";
    public static readonly PRICING_MODEL_MULTI: string = "pricing_model_multi";
    public static readonly PRICING_MODEL_BUNDLE: string = "pricing_model_bundle";
    public static readonly PRICING_MODEL_FURNI: string = "pricing_model_furniture";
    public static readonly PRICE_TYPE_NONE: string = "price_type_none";
    public static readonly PRICE_TYPE_CREDITS: string = "price_type_credits";
    public static readonly PRICE_TYPE_ACTIVITYPOINTS: string = "price_type_activitypoints";
    public static readonly PRICE_TYPE_CREDITS_AND_ACTIVITYPOINTS: string = "price_type_credits_and_activitypoints";
    public static readonly PRICE_TYPE_SILVER: string = "price_type_silver";

    constructor(param1: number, param2: string, param3: boolean, param4: number, param5: number, param6: number, param7: number, param8: boolean, param9: number, param10: IProduct[], param11: boolean, param12: HabboCatalog) {
        this._offerId = param1;
        this._localizationId = param2;
        this._isRentOffer = param3;
        this._priceInCredits = param4;
        this._priceInActivityPoints = param5;
        this._activityPointType = param6;
        this._priceInSilver = param7;
        this._SafeStr_5614 = param8;
        this._clubLevel = param9;
        this._bundlePurchaseAllowed = param11;
        this._catalog = param12;
        this._isSingleChatStyle = param10.length == 1 && param10[0].productType == "chat_style" || param10.length == 2 && (param10[0].productType == "chat_style" && param10[1].productType == "b" || param10[0].productType == "b" && param10[1].productType == "chat_style");
        this.analyzePricingModel(param10);
        this.analyzePriceType();
        this.createProductContainer(param10);
        for (const _loc13_ of param10 ?? []) {
            if (_loc13_.productType == "b") {
                this._badgeCode = _loc13_.extraParam;
                break;
            }
            if (!this.isSingleChatStyle && _loc13_.productType == "chat_style") {
                this._extraChatBubbleCode = _loc13_.extraParam;
                break;
            }
        }
    }

    declare private _pricingModel: string;

    declare private _priceType: string;

    declare private _localizationId: string;

    declare private _priceInCredits: number;
    static { (this.prototype as any)._priceInCredits = 0; }

    declare private _priceInActivityPoints: number;
    static { (this.prototype as any)._priceInActivityPoints = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _priceInSilver: number;
    static { (this.prototype as any)._priceInSilver = 0; }

    declare private _SafeStr_5614: boolean;
    static { (this.prototype as any)._SafeStr_5614 = false; }

    declare private _isRentOffer: boolean;
    static { (this.prototype as any)._isRentOffer = false; }

    declare private _page: ICatalogPage;

    declare private _SafeStr_2499: IProductContainer;

    private _clubLevel: number = 0;

    declare private _extraChatBubbleCode: string;

    private _bundlePurchaseAllowed: boolean = false;

    declare private _catalog: HabboCatalog;

    declare private _isSingleChatStyle: boolean;
    static { (this.prototype as any)._isSingleChatStyle = false; }

    declare private _previewCallbackId: number;
    static { (this.prototype as any)._previewCallbackId = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _badgeCode: string;

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get page(): ICatalogPage {
        return this._page;
    }

    public set page(param1: ICatalogPage) {
        this._page = param1;
    }

    public get localizationId(): string {
        return this._localizationId;
    }

    public get priceInCredits(): number {
        return this._priceInCredits;
    }

    public get priceInActivityPoints(): number {
        return this._priceInActivityPoints;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public get priceInSilver(): number {
        return this._priceInSilver;
    }

    public get giftable(): boolean {
        return this._SafeStr_5614;
    }

    public get productContainer(): IProductContainer {
        return this._SafeStr_2499;
    }

    public get product(): IProduct {
        return this._SafeStr_2499 ? this._SafeStr_2499.firstProduct : null;
    }

    public get gridItem(): IGridItem {
        return isIGridItem(this._SafeStr_2499) ? this._SafeStr_2499 : null;
    }

    public get pricingModel(): string {
        return this._pricingModel;
    }

    public get priceType(): string {
        return this._priceType;
    }

    public get previewCallbackId(): number {
        return this._previewCallbackId;
    }

    public set previewCallbackId(param1: number) {
        this._previewCallbackId = param1;
    }

    public get bundlePurchaseAllowed(): boolean {
        return this._bundlePurchaseAllowed;
    }

    public get isRentOffer(): boolean {
        return this._isRentOffer;
    }

    public get isSingleChatStyle(): boolean {
        return this._isSingleChatStyle;
    }

    public get extraChatStyleCode(): string {
        return this._extraChatBubbleCode;
    }

    public get localizationName(): string {
        let _loc1_: IProductData = this._catalog.getProductData(this._localizationId);
        return _loc1_ ? _loc1_.name : "${" + this._localizationId + "}";
    }

    public get localizationDescription(): string {
        let _loc1_: IProductData = this._catalog.getProductData(this._localizationId);
        return _loc1_ ? _loc1_.description : "${" + this._localizationId + "}";
    }

    public get priceInEmerald(): number {
        return 0;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._disposed = true;
        this._offerId = 0;
        this._localizationId = "";
        this._priceInCredits = 0;
        this._priceInActivityPoints = 0;
        this._activityPointType = 0;
        this._page = null;
        this._catalog = null;
        if (this._SafeStr_2499 != null) {
            this._SafeStr_2499.dispose();
            this._SafeStr_2499 = null;
        }
    }

    public clone(): Offer {
        let _loc4_: IFurnitureData = null;
        let _loc2_: Product = null;
        let _loc5_: IProduct[] = new Array<IProduct>(0).fill(null);
        let _loc6_: IProductData = this._catalog.getProductData(this.localizationId);
        for (const _loc3_ of this._SafeStr_2499.products ?? []) {
            _loc4_ = this._catalog.getFurnitureData(_loc3_.productClassId, _loc3_.productType);
            _loc2_ = new Product(_loc3_.productType, _loc3_.productClassId, _loc3_.extraParam, _loc3_.productCount, _loc6_, _loc4_, this._catalog);
            _loc5_.push(_loc2_);
        }
        let _loc1_: Offer = new Offer(this.offerId, this.localizationId, this.isRentOffer, this.priceInCredits, this.priceInActivityPoints, this.activityPointType, this.priceInSilver, this.giftable, this.clubLevel, _loc5_, this.bundlePurchaseAllowed, this._catalog);
        _loc1_.page = this.page;
        return _loc1_;
    }

    private createProductContainer(param1: IProduct[]): void {
        switch (this._pricingModel) {
            case "pricing_model_single":
                this._SafeStr_2499 = new SingleProductContainer(this, param1, this._catalog);
                break;
            case "pricing_model_multi":
                this._SafeStr_2499 = new MultiProductContainer(this, param1, this._catalog);
                break;
            case "pricing_model_bundle":
                this._SafeStr_2499 = new BundleProductContainer(this, param1, this._catalog);
                break;
            default:
                this._SafeStr_2499 = new ProductContainer(this, param1, this._catalog);
                Offer._log.warn("Unknown pricing model" + this._pricingModel);
        }
    }

    private analyzePricingModel(param1: IProduct[]): void {
        if (this.isSingleChatStyle) {
            this._pricingModel = "pricing_model_single";
            return;
        }
        let _loc2_: IProduct[] = Product.stripAddonProducts(param1);
        if (_loc2_.length == 1) {
            if (_loc2_[0].productCount == 1) {
                this._pricingModel = "pricing_model_single";
            } else {
                this._pricingModel = "pricing_model_multi";
            }
        } else if (_loc2_.length > 1) {
            this._pricingModel = "pricing_model_bundle";
        } else {
            this._pricingModel = "pricing_model_unknown";
        }
    }

    private analyzePriceType(): void {
        if (this._priceInCredits > 0 && this._priceInActivityPoints > 0) {
            this._priceType = "price_type_credits_and_activitypoints";
        } else if (this._priceInCredits > 0) {
            this._priceType = "price_type_credits";
        } else if (this._priceInActivityPoints > 0) {
            this._priceType = "price_type_activitypoints";
        } else if (this._priceInSilver > 0) {
            this._priceType = "price_type_silver";
        } else {
            this._priceType = "price_type_none";
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Offer.#staticsReady) return;
        Offer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Offer, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.Offer"));
    }

    get [IPurchasableOffer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
