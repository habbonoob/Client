import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IDropListItemWindow extends IButtonWindow {
    get menu(): IDropMenuWindow;
    get value(): IWindow;
    set value(param1: IWindow);
}

export const IDropListItemWindow = Symbol('com.sulake.core.window.components::IDropListItemWindow');
registerClassName(IDropListItemWindow, 'com.sulake.core.window.components::IDropListItemWindow');

export function isIDropListItemWindow(value: unknown): value is IDropListItemWindow {
    return (value as { [IDropListItemWindow]?: true } | null | undefined)?.[IDropListItemWindow] === true;
}
