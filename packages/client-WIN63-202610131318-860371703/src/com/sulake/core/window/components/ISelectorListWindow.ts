import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface ISelectorListWindow extends ISelectorWindow, IIterable {
}

export const ISelectorListWindow = Symbol('com.sulake.core.window.components::ISelectorListWindow');
registerClassName(ISelectorListWindow, 'com.sulake.core.window.components::ISelectorListWindow');

export function isISelectorListWindow(value: unknown): value is ISelectorListWindow {
    return (value as { [ISelectorListWindow]?: true } | null | undefined)?.[ISelectorListWindow] === true;
}
