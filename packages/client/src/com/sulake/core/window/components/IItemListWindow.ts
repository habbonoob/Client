import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface IItemListWindow extends IWindow, IScrollableWindow, IIterable {
    get spacing(): number;
    set spacing(param1: number);
    get scaleToFitItems(): boolean;
    set scaleToFitItems(param1: boolean);
    get autoArrangeItems(): boolean;
    set autoArrangeItems(param1: boolean);
    get resizeOnItemUpdate(): boolean;
    set resizeOnItemUpdate(param1: boolean);
    get inverseResizeOnItemUpdate(): boolean;
    set inverseResizeOnItemUpdate(param1: boolean);
    get numListItems(): number;
    set disableAutodrag(param1: boolean);
    get isPartOfGridWindow(): boolean;
    set isPartOfGridWindow(param1: boolean);
    get scrollableWindow(): IWindow;
    get enableScrollByDragging(): boolean;
    set enableScrollByDragging(param1: boolean);
    addListItem(param1: IWindow): IWindow;
    addListItemAt(param1: IWindow, param2: number): IWindow;
    getListItemAt(param1: number): IWindow;
    getListItemByID(param1: number): IWindow;
    getListItemByName(param1: string): IWindow;
    getListItemByTag(param1: string): IWindow;
    getListItemIndex(param1: IWindow): number;
    removeListItem(param1: IWindow): IWindow;
    removeListItemAt(param1: number): IWindow;
    setListItemIndex(param1: IWindow, param2: number): void;
    swapListItems(param1: IWindow, param2: IWindow): void;
    groupListItemsWithID(param1: number, param2: any[], param3?: number): number;
    groupListItemsWithTag(param1: string, param2: any[], param3?: number): number;
    swapListItemsAt(param1: number, param2: number): void;
    removeListItems(): void;
    destroyListItems(): void;
    arrangeListItems(): void;
    populate(param1: any[]): void;
    stopDragging(): void;
    scrollWithWheel(param1: number): void;
}

export const IItemListWindow = Symbol('com.sulake.core.window.components::IItemListWindow');
registerClassName(IItemListWindow, 'com.sulake.core.window.components::IItemListWindow');

export function isIItemListWindow(value: unknown): value is IItemListWindow {
    return (value as { [IItemListWindow]?: true } | null | undefined)?.[IItemListWindow] === true;
}
