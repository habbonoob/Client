import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IRadioButtonSelectionWindow extends IWindowContainer {
    get selected(): IRadioButtonWindow;
    radioButtonSelection(param1: IRadioButtonWindow): void;
}

export const IRadioButtonSelectionWindow = Symbol('com.sulake.core.window.components::IRadioButtonSelectionWindow');
registerClassName(IRadioButtonSelectionWindow, 'com.sulake.core.window.components::IRadioButtonSelectionWindow');

export function isIRadioButtonSelectionWindow(value: unknown): value is IRadioButtonSelectionWindow {
    return (value as { [IRadioButtonSelectionWindow]?: true } | null | undefined)?.[IRadioButtonSelectionWindow] === true;
}
