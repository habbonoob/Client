import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IFocusWindow extends IDisposable {
    get focused(): boolean;
    focus(): boolean;
    unfocus(): boolean;
}

export const IFocusWindow = Symbol('com.sulake.core.window.components::IFocusWindow');
registerClassName(IFocusWindow, 'com.sulake.core.window.components::IFocusWindow');

export function isIFocusWindow(value: unknown): value is IFocusWindow {
    return (value as { [IFocusWindow]?: true } | null | undefined)?.[IFocusWindow] === true;
}
