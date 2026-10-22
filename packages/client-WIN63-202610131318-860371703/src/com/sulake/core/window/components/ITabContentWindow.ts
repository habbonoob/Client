import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface ITabContentWindow extends IWindowContainer {
}

export const ITabContentWindow = Symbol('com.sulake.core.window.components::ITabContentWindow');
registerClassName(ITabContentWindow, 'com.sulake.core.window.components::ITabContentWindow');

export function isITabContentWindow(value: unknown): value is ITabContentWindow {
    return (value as { [ITabContentWindow]?: true } | null | undefined)?.[ITabContentWindow] === true;
}
