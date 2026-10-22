import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';

export interface IHTMLTextWindow extends ITextFieldWindow {
    get linkTarget(): string;
    set linkTarget(param1: string);
    initializeLinkStyle(): void;
}

export const IHTMLTextWindow = Symbol('com.sulake.core.window.components::IHTMLTextWindow');
registerClassName(IHTMLTextWindow, 'com.sulake.core.window.components::IHTMLTextWindow');

export function isIHTMLTextWindow(value: unknown): value is IHTMLTextWindow {
    return (value as { [IHTMLTextWindow]?: true } | null | undefined)?.[IHTMLTextWindow] === true;
}
