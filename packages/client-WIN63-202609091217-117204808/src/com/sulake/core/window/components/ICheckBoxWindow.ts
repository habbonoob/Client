import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';

export interface ICheckBoxWindow extends ISelectableWindow {
}

export const ICheckBoxWindow = Symbol('com.sulake.core.window.components::ICheckBoxWindow');
registerClassName(ICheckBoxWindow, 'com.sulake.core.window.components::ICheckBoxWindow');

export function isICheckBoxWindow(value: unknown): value is ICheckBoxWindow {
    return (value as { [ICheckBoxWindow]?: true } | null | undefined)?.[ICheckBoxWindow] === true;
}
