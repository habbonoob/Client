import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IToolTipWindow extends IWindow {
}

export const IToolTipWindow = Symbol('com.sulake.core.window.components::IToolTipWindow');
registerClassName(IToolTipWindow, 'com.sulake.core.window.components::IToolTipWindow');

export function isIToolTipWindow(value: unknown): value is IToolTipWindow {
    return (value as { [IToolTipWindow]?: true } | null | undefined)?.[IToolTipWindow] === true;
}
