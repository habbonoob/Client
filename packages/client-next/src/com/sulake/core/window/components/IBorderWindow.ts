import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IBorderWindow extends IWindowContainer {
}

export const IBorderWindow = Symbol('com.sulake.core.window.components::IBorderWindow');
registerClassName(IBorderWindow, 'com.sulake.core.window.components::IBorderWindow');

export function isIBorderWindow(value: unknown): value is IBorderWindow {
    return (value as { [IBorderWindow]?: true } | null | undefined)?.[IBorderWindow] === true;
}
