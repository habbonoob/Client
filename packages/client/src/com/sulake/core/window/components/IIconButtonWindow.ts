import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';

export interface IIconButtonWindow extends IInteractiveWindow {
}

export const IIconButtonWindow = Symbol('com.sulake.core.window.components::IIconButtonWindow');
registerClassName(IIconButtonWindow, 'com.sulake.core.window.components::IIconButtonWindow');

export function isIIconButtonWindow(value: unknown): value is IIconButtonWindow {
    return (value as { [IIconButtonWindow]?: true } | null | undefined)?.[IIconButtonWindow] === true;
}
