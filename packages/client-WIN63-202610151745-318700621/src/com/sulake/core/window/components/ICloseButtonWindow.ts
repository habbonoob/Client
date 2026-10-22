import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';

export interface ICloseButtonWindow extends IInteractiveWindow {
}

export const ICloseButtonWindow = Symbol('com.sulake.core.window.components::ICloseButtonWindow');
registerClassName(ICloseButtonWindow, 'com.sulake.core.window.components::ICloseButtonWindow');

export function isICloseButtonWindow(value: unknown): value is ICloseButtonWindow {
    return (value as { [ICloseButtonWindow]?: true } | null | undefined)?.[ICloseButtonWindow] === true;
}
