import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface ICaptionWindow extends IWindowContainer {
}

export const ICaptionWindow = Symbol('com.sulake.core.window.components::ICaptionWindow');
registerClassName(ICaptionWindow, 'com.sulake.core.window.components::ICaptionWindow');

export function isICaptionWindow(value: unknown): value is ICaptionWindow {
    return (value as { [ICaptionWindow]?: true } | null | undefined)?.[ICaptionWindow] === true;
}
