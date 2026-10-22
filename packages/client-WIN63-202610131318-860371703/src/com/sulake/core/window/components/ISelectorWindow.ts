import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface ISelectorWindow extends IWindow {
    get numSelectables(): number;
    getSelected(): ISelectableWindow;
    setSelected(param1: ISelectableWindow): void;
    addSelectable(param1: ISelectableWindow): ISelectableWindow;
    addSelectableAt(param1: ISelectableWindow, param2: number): ISelectableWindow;
    getSelectableAt(param1: number): ISelectableWindow;
    getSelectableByID(param1: number): ISelectableWindow;
    getSelectableByTag(param1: string): ISelectableWindow;
    getSelectableByName(param1: string): ISelectableWindow;
    getSelectableIndex(param1: ISelectableWindow): number;
    removeSelectable(param1: ISelectableWindow): ISelectableWindow;
}

export const ISelectorWindow = Symbol('com.sulake.core.window.components::ISelectorWindow');
registerClassName(ISelectorWindow, 'com.sulake.core.window.components::ISelectorWindow');

export function isISelectorWindow(value: unknown): value is ISelectorWindow {
    return (value as { [ISelectorWindow]?: true } | null | undefined)?.[ISelectorWindow] === true;
}
