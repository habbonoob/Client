import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface INotifyWindow extends IWindowContainer {
}

export const INotifyWindow = Symbol('com.sulake.core.window.components::INotifyWindow');
registerClassName(INotifyWindow, 'com.sulake.core.window.components::INotifyWindow');

export function isINotifyWindow(value: unknown): value is INotifyWindow {
    return (value as { [INotifyWindow]?: true } | null | undefined)?.[INotifyWindow] === true;
}
