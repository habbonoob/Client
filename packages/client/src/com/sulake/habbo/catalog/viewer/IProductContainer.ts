import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface IProductContainer extends IDisposable {
    get products(): IProduct[];
    get firstProduct(): IProduct;
    get view(): IWindowContainer;
    set view(param1: IWindowContainer);
    set grid(param1: IItemGrid);
    get offer(): IPurchasableOffer;
    initProductIcon(param1: IRoomEngine, param2?: IStuffData): void;
    activate(): void;
    setClubIconLevel(param1: number): void;
}

export const IProductContainer = Symbol('com.sulake.habbo.catalog.viewer::IProductContainer');
registerClassName(IProductContainer, 'com.sulake.habbo.catalog.viewer::IProductContainer');

export function isIProductContainer(value: unknown): value is IProductContainer {
    return (value as { [IProductContainer]?: true } | null | undefined)?.[IProductContainer] === true;
}
