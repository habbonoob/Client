import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';

export interface IScrollableGridWindow extends IItemGridWindow {
    set autoHideScrollBar(param1: boolean);
    get autoHideScrollBar(): boolean;
}

export const IScrollableGridWindow = Symbol('com.sulake.core.window.components::IScrollableGridWindow');
registerClassName(IScrollableGridWindow, 'com.sulake.core.window.components::IScrollableGridWindow');

export function isIScrollableGridWindow(value: unknown): value is IScrollableGridWindow {
    return (value as { [IScrollableGridWindow]?: true } | null | undefined)?.[IScrollableGridWindow] === true;
}
