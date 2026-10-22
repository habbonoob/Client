import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import { TargetedOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/TargetedOfferData';

export class TargetedOffer extends TargetedOfferData implements IPurchasableOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers.data::TargetedOffer'); }

    public static readonly _SafeStr_7942: number = 10;

    constructor(param1: TargetedOfferData = null) {
        super(param1);
    }

    public get offerId(): number {
        return 0;
    }

    public get page(): ICatalogPage {
        return null;
    }

    public set page(param1: ICatalogPage) {
    }

    public get priceType(): string {
        return "";
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
        return "";
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

    public isExpired(): boolean {
        return this._expirationTime > 0 && this.getSecondsRemaining() <= 0;
    }

    public getSecondsRemaining(): number {
        let _loc1_: number = (this._expirationTime - getTimer()) / 1000 - 10 >>> 0;
        return Math.max(0, _loc1_) | 0;
    }

    public checkPurseBalance(param1: IPurse, param2: number): boolean {
        if (!param1 || param1.credits < this._priceInCredits * param2) {
            return false;
        }
        if (param1.getActivityPointsForType(this._activityPointType) < this._priceInActivityPoints * param2) {
            return false;
        }
        return true;
    }

    public getLocalizedSubProductNames(param1: IHabboCatalog): string[] {
        let _loc4_: IProductData = null;
        let _loc2_: string[] = new Array<string>(0).fill(null);
        for (const _loc3_ of this._subProductCodes ?? []) {
            _loc4_ = param1.getProductData(_loc3_);
            _loc2_.push(_loc4_ ? _loc4_.name : _loc3_);
        }
        return _loc2_;
    }

    public dispose(): void {
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
