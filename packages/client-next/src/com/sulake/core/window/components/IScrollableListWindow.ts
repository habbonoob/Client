import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';

export interface IScrollableListWindow extends IItemListWindow {
    set autoHideScrollBar(param1: boolean);
    get autoHideScrollBar(): boolean;
    get isScrollBarVisible(): boolean;
}

export const IScrollableListWindow = Symbol('com.sulake.core.window.components::IScrollableListWindow');
registerClassName(IScrollableListWindow, 'com.sulake.core.window.components::IScrollableListWindow');

export function isIScrollableListWindow(value: unknown): value is IScrollableListWindow {
    return (value as { [IScrollableListWindow]?: true } | null | undefined)?.[IScrollableListWindow] === true;
}
