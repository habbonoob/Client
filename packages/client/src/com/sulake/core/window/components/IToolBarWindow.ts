import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IToolBarWindow extends IWindow {
}

export const IToolBarWindow = Symbol('com.sulake.core.window.components::IToolBarWindow');
registerClassName(IToolBarWindow, 'com.sulake.core.window.components::IToolBarWindow');

export function isIToolBarWindow(value: unknown): value is IToolBarWindow {
    return (value as { [IToolBarWindow]?: true } | null | undefined)?.[IToolBarWindow] === true;
}
