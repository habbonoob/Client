import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';

export interface IRadioButtonWindow extends ISelectableWindow {
}

export const IRadioButtonWindow = Symbol('com.sulake.core.window.components::IRadioButtonWindow');
registerClassName(IRadioButtonWindow, 'com.sulake.core.window.components::IRadioButtonWindow');

export function isIRadioButtonWindow(value: unknown): value is IRadioButtonWindow {
    return (value as { [IRadioButtonWindow]?: true } | null | undefined)?.[IRadioButtonWindow] === true;
}
