import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface ISelectableWindow extends IWindow {
    get selector(): ISelectorWindow;
    get isSelected(): boolean;
    set isSelected(param1: boolean);
    select(): boolean;
    unselect(): boolean;
}

export const ISelectableWindow = Symbol('com.sulake.core.window.components::ISelectableWindow');
registerClassName(ISelectableWindow, 'com.sulake.core.window.components::ISelectableWindow');

export function isISelectableWindow(value: unknown): value is ISelectableWindow {
    return (value as { [ISelectableWindow]?: true } | null | undefined)?.[ISelectableWindow] === true;
}
