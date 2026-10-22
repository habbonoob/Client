import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';

export interface IDragBarWindow extends IInteractiveWindow {
    get scrollbarOffsetX(): number;
    get scrollbarOffsetY(): number;
    set scrollbarOffsetX(param1: number);
    set scrollbarOffsetY(param1: number);
}

export const IDragBarWindow = Symbol('com.sulake.core.window.components::IDragBarWindow');
registerClassName(IDragBarWindow, 'com.sulake.core.window.components::IDragBarWindow');

export function isIDragBarWindow(value: unknown): value is IDragBarWindow {
    return (value as { [IDragBarWindow]?: true } | null | undefined)?.[IDragBarWindow] === true;
}
