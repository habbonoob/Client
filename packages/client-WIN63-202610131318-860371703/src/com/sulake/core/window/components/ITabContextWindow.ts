import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface ITabContextWindow extends IWindow, IIterable {
    get selector(): ISelectorListWindow;
    get container(): IWindowContainer;
    get numTabItems(): number;
    addTabItem(param1: ITabButtonWindow): ITabButtonWindow;
    addTabItemAt(param1: ITabButtonWindow, param2: number): ITabButtonWindow;
    removeTabItem(param1: ITabButtonWindow): void;
    getTabItemAt(param1: number): ITabButtonWindow;
    getTabItemByName(param1: string): ITabButtonWindow;
    getTabItemByID(param1: number): ITabButtonWindow;
    getTabItemIndex(param1: ITabButtonWindow): number;
}

export const ITabContextWindow = Symbol('com.sulake.core.window.components::ITabContextWindow');
registerClassName(ITabContextWindow, 'com.sulake.core.window.components::ITabContextWindow');

export function isITabContextWindow(value: unknown): value is ITabContextWindow {
    return (value as { [ITabContextWindow]?: true } | null | undefined)?.[ITabContextWindow] === true;
}
