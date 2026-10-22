import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';

export interface IPasswordFieldWindow extends ITextFieldWindow {
}

export const IPasswordFieldWindow = Symbol('com.sulake.core.window.components::IPasswordFieldWindow');
registerClassName(IPasswordFieldWindow, 'com.sulake.core.window.components::IPasswordFieldWindow');

export function isIPasswordFieldWindow(value: unknown): value is IPasswordFieldWindow {
    return (value as { [IPasswordFieldWindow]?: true } | null | undefined)?.[IPasswordFieldWindow] === true;
}
