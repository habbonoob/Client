import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFocusWindow } from '@/com/sulake/core/window/components/IFocusWindow';
import type { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export interface ITextFieldWindow extends ITextWindow, IFocusWindow, IInteractiveWindow {
    get editable(): boolean;
    set editable(param1: boolean);
    get selectable(): boolean;
    set selectable(param1: boolean);
    get displayAsPassword(): boolean;
    set displayAsPassword(param1: boolean);
    get displayRaw(): boolean;
    set displayRaw(param1: boolean);
    setSelection(param1: number, param2: number): void;
    get selectionBeginIndex(): number;
    get selectionEndIndex(): number;
    get restrict(): string;
    set restrict(param1: string);
    requestChangeEvent(): void;
    getWordAt(param1: number, param2: number): string;
}

export const ITextFieldWindow = Symbol('com.sulake.core.window.components::ITextFieldWindow');
registerClassName(ITextFieldWindow, 'com.sulake.core.window.components::ITextFieldWindow');

export function isITextFieldWindow(value: unknown): value is ITextFieldWindow {
    return (value as { [ITextFieldWindow]?: true } | null | undefined)?.[ITextFieldWindow] === true;
}
