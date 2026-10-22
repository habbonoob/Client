import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IProduct extends IGetImageListener, IDisposable {
    get productType(): string;
    get productClassId(): number;
    get extraParam(): string;
    set extraParam(param1: string);
    get productCount(): number;
    get productData(): IProductData;
    get furnitureData(): IFurnitureData;
    get isUniqueLimitedItem(): boolean;
    get isColorable(): boolean;
    get uniqueLimitedItemSeriesSize(): number;
    get uniqueLimitedItemsLeft(): number;
    set uniqueLimitedItemsLeft(param1: number);
    set view(param1: IWindowContainer);
    set grid(param1: IItemGrid);
    initIcon(param1: IProductContainer, param2?: IGetImageListener, param3?: IAvatarImageListener, param4?: IPurchasableOffer, param5?: IBitmapWrapperWindow, param6?: IStuffData, param7?: (...args: any[]) => any): BitmapData;
}
