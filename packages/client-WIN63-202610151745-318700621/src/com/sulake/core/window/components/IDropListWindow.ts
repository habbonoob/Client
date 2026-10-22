import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface IDropListWindow extends IInteractiveWindow, IIterable {
    get selection(): number;
    set selection(param1: number);
    get numMenuItems(): number;
    addMenuItem(param1: IWindow): IWindow;
    addMenuItemAt(param1: IWindow, param2: number): IWindow;
    getMenuItemIndex(param1: IWindow): number;
    getMenuItemAt(param1: number): IWindow;
    removeMenuItem(param1: IWindow): IWindow;
    removeMenuItemAt(param1: number): IWindow;
}

export const IDropListWindow = Symbol('com.sulake.core.window.components::IDropListWindow');
registerClassName(IDropListWindow, 'com.sulake.core.window.components::IDropListWindow');

export function isIDropListWindow(value: unknown): value is IDropListWindow {
    return (value as { [IDropListWindow]?: true } | null | undefined)?.[IDropListWindow] === true;
}
