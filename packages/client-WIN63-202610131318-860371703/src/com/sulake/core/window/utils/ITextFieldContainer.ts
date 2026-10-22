import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';

export interface ITextFieldContainer {
    get textField(): TextField;
    get margins(): IMargins;
}

export const ITextFieldContainer = Symbol('com.sulake.core.window.utils::ITextFieldContainer');
registerClassName(ITextFieldContainer, 'com.sulake.core.window.utils::ITextFieldContainer');

export function isITextFieldContainer(value: unknown): value is ITextFieldContainer {
    return (value as { [ITextFieldContainer]?: true } | null | undefined)?.[ITextFieldContainer] === true;
}
