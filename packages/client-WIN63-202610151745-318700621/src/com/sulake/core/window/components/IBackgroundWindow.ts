import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IBackgroundWindow extends IWindowContainer {
}

export const IBackgroundWindow = Symbol('com.sulake.core.window.components::IBackgroundWindow');
registerClassName(IBackgroundWindow, 'com.sulake.core.window.components::IBackgroundWindow');

export function isIBackgroundWindow(value: unknown): value is IBackgroundWindow {
    return (value as { [IBackgroundWindow]?: true } | null | undefined)?.[IBackgroundWindow] === true;
}
