import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IBoxSizerWindow extends IWindowContainer {
    setHorizontalPadding(param1: number): void;
    setVerticalPadding(param1: number): void;
    setSpacing(param1: number): void;
    setVertical(param1: boolean): void;
    setAutoRearrange(param1: boolean): void;
    getAutoRearrange(): boolean;
}

export const IBoxSizerWindow = Symbol('com.sulake.core.window.components::IBoxSizerWindow');
registerClassName(IBoxSizerWindow, 'com.sulake.core.window.components::IBoxSizerWindow');

export function isIBoxSizerWindow(value: unknown): value is IBoxSizerWindow {
    return (value as { [IBoxSizerWindow]?: true } | null | undefined)?.[IBoxSizerWindow] === true;
}
