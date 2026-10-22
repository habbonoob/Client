import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';

export interface IButtonWindow extends IInteractiveWindow {
}

export const IButtonWindow = Symbol('com.sulake.core.window.components::IButtonWindow');
registerClassName(IButtonWindow, 'com.sulake.core.window.components::IButtonWindow');

export function isIButtonWindow(value: unknown): value is IButtonWindow {
    return (value as { [IButtonWindow]?: true } | null | undefined)?.[IButtonWindow] === true;
}
