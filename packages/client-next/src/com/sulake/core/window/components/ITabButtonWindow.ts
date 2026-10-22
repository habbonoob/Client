import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';

export interface ITabButtonWindow extends ISelectableWindow {
}

export const ITabButtonWindow = Symbol('com.sulake.core.window.components::ITabButtonWindow');
registerClassName(ITabButtonWindow, 'com.sulake.core.window.components::ITabButtonWindow');

export function isITabButtonWindow(value: unknown): value is ITabButtonWindow {
    return (value as { [ITabButtonWindow]?: true } | null | undefined)?.[ITabButtonWindow] === true;
}
