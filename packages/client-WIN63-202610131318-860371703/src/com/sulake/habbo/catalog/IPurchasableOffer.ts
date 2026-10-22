import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';

export interface IPurchasableOffer extends IDisposable {
    get offerId(): number;
    get priceInActivityPoints(): number;
    get activityPointType(): number;
    get priceInCredits(): number;
    get priceInSilver(): number;
    get priceInEmerald(): number;
    get page(): ICatalogPage;
    get priceType(): string;
    get product(): IProduct;
    get productContainer(): IProductContainer;
    get gridItem(): IGridItem;
    get localizationId(): string;
    get bundlePurchaseAllowed(): boolean;
    get isRentOffer(): boolean;
    get giftable(): boolean;
    get pricingModel(): string;
    set previewCallbackId(param1: number);
    get previewCallbackId(): number;
    get clubLevel(): number;
    get badgeCode(): string;
    get extraChatStyleCode(): string;
    get isSingleChatStyle(): boolean;
    set page(param1: ICatalogPage);
    get localizationName(): string;
    get localizationDescription(): string;
}

export const IPurchasableOffer = Symbol('com.sulake.habbo.catalog::IPurchasableOffer');
registerClassName(IPurchasableOffer, 'com.sulake.habbo.catalog::IPurchasableOffer');

export function isIPurchasableOffer(value: unknown): value is IPurchasableOffer {
    return (value as { [IPurchasableOffer]?: true } | null | undefined)?.[IPurchasableOffer] === true;
}
