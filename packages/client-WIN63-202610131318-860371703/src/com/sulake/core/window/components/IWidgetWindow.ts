import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface IWidgetWindow extends IWindow, IIterable {
    get widget(): IWidget;
    get rootWindow(): IWindow;
    set rootWindow(param1: IWindow);
}

export const IWidgetWindow = Symbol('com.sulake.core.window.components::IWidgetWindow');
registerClassName(IWidgetWindow, 'com.sulake.core.window.components::IWidgetWindow');

export function isIWidgetWindow(value: unknown): value is IWidgetWindow {
    return (value as { [IWidgetWindow]?: true } | null | undefined)?.[IWidgetWindow] === true;
}
