import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IItemGrid } from '@/com/sulake/habbo/catalog/viewer/IItemGrid';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface IProductContainer extends IDisposable {
    initProductIcon(param1: IRoomEngine, param2?: IStuffData): void;
    activate(): void;
    get products(): IProduct[];
    get firstProduct(): IProduct;
    set view(param1: IWindowContainer);
    get view(): IWindowContainer;
    set grid(param1: IItemGrid);
    setClubIconLevel(param1: number): void;
    get offer(): IPurchasableOffer;
}

export const IProductContainer = Symbol('com.sulake.habbo.catalog.viewer::IProductContainer');
registerClassName(IProductContainer, 'com.sulake.habbo.catalog.viewer::IProductContainer');

export function isIProductContainer(value: unknown): value is IProductContainer {
    return (value as { [IProductContainer]?: true } | null | undefined)?.[IProductContainer] === true;
}
