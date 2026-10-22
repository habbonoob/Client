import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface IItemGridWindow extends IWindow, IScrollableWindow, IIterable {
    get spacing(): number;
    set spacing(param1: number);
    set verticalSpacing(param1: number);
    get scaleToFitItems(): boolean;
    set scaleToFitItems(param1: boolean);
    get autoArrangeItems(): boolean;
    set autoArrangeItems(param1: boolean);
    get resizeOnItemUpdate(): boolean;
    set resizeOnItemUpdate(param1: boolean);
    get numColumns(): number;
    get numRows(): number;
    get numGridItems(): number;
    get shouldRebuildGridOnResize(): boolean;
    set shouldRebuildGridOnResize(param1: boolean);
    get containerResizeToColumns(): boolean;
    set containerResizeToColumns(param1: boolean);
    addGridItem(param1: IWindow): IWindow;
    addGridItemAt(param1: IWindow, param2: number): IWindow;
    getGridItemAt(param1: number): IWindow;
    getGridItemByID(param1: number): IWindow;
    getGridItemByName(param1: string): IWindow;
    getGridItemByTag(param1: string): IWindow;
    getGridItemIndex(param1: IWindow): number;
    removeGridItem(param1: IWindow): IWindow;
    removeGridItemAt(param1: number): IWindow;
    setGridItemIndex(param1: IWindow, param2: number): void;
    swapGridItems(param1: IWindow, param2: IWindow): void;
    swapGridItemsAt(param1: number, param2: number): void;
    removeGridItems(): void;
    destroyGridItems(): void;
    rebuildGridStructure(): void;
    populate(param1: any[]): void;
}

export const IItemGridWindow = Symbol('com.sulake.core.window.components::IItemGridWindow');
registerClassName(IItemGridWindow, 'com.sulake.core.window.components::IItemGridWindow');

export function isIItemGridWindow(value: unknown): value is IItemGridWindow {
    return (value as { [IItemGridWindow]?: true } | null | undefined)?.[IItemGridWindow] === true;
}
