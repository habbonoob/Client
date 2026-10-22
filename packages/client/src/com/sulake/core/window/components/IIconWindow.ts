import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IIconWindow extends IWindow {
    fitToSize(): void;
}

export const IIconWindow = Symbol('com.sulake.core.window.components::IIconWindow');
registerClassName(IIconWindow, 'com.sulake.core.window.components::IIconWindow');

export function isIIconWindow(value: unknown): value is IIconWindow {
    return (value as { [IIconWindow]?: true } | null | undefined)?.[IIconWindow] === true;
}
