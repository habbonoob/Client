import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';

export interface IDropMenuWindow extends IInteractiveWindow {
    get selection(): number;
    set selection(param1: number);
    get numMenuItems(): number;
    populate(param1: any[]): void;
    populateWithVector(param1: string[]): void;
    enumerateSelection(): any[];
    openMenu(): void;
}

export const IDropMenuWindow = Symbol('com.sulake.core.window.components::IDropMenuWindow');
registerClassName(IDropMenuWindow, 'com.sulake.core.window.components::IDropMenuWindow');

export function isIDropMenuWindow(value: unknown): value is IDropMenuWindow {
    return (value as { [IDropMenuWindow]?: true } | null | undefined)?.[IDropMenuWindow] === true;
}
