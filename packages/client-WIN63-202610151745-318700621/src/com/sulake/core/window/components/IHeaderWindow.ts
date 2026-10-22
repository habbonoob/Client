import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IHeaderWindow extends IWindowContainer {
    get title(): ILabelWindow;
    get controls(): IItemListWindow;
}

export const IHeaderWindow = Symbol('com.sulake.core.window.components::IHeaderWindow');
registerClassName(IHeaderWindow, 'com.sulake.core.window.components::IHeaderWindow');

export function isIHeaderWindow(value: unknown): value is IHeaderWindow {
    return (value as { [IHeaderWindow]?: true } | null | undefined)?.[IHeaderWindow] === true;
}
