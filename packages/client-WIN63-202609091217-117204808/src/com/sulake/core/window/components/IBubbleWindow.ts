import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';

export interface IBubbleWindow extends IWindowContainer {
    get direction(): string;
    set direction(param1: string);
    get pointerOffset(): number;
    set pointerOffset(param1: number);
    get margins(): IMargins;
    get content(): IWindowContainer;
}

export const IBubbleWindow = Symbol('com.sulake.core.window.components::IBubbleWindow');
registerClassName(IBubbleWindow, 'com.sulake.core.window.components::IBubbleWindow');

export function isIBubbleWindow(value: unknown): value is IBubbleWindow {
    return (value as { [IBubbleWindow]?: true } | null | undefined)?.[IBubbleWindow] === true;
}
