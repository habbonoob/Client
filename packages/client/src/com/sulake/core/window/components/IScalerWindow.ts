import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IScalerWindow extends IWindow {
}

export const IScalerWindow = Symbol('com.sulake.core.window.components::IScalerWindow');
registerClassName(IScalerWindow, 'com.sulake.core.window.components::IScalerWindow');

export function isIScalerWindow(value: unknown): value is IScalerWindow {
    return (value as { [IScalerWindow]?: true } | null | undefined)?.[IScalerWindow] === true;
}
