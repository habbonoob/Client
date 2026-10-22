import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IMargins } from '@/com/sulake/core/window/utils/IMargins';
import type { TextStyle } from '@/com/sulake/core/window/utils/TextStyle';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export interface ILabelWindow extends IWindow {
    get antiAliasType(): string;
    get autoSize(): string;
    get bold(): boolean;
    get border(): boolean;
    get borderColor(): number;
    get defaultTextFormat(): TextFormat;
    get embedFonts(): boolean;
    get fontFace(): string;
    get fontSize(): number;
    get gridFitType(): string;
    get italic(): boolean;
    get kerning(): boolean;
    get length(): number;
    get margins(): IMargins;
    get maxChars(): number;
    get sharpness(): number;
    get spacing(): number;
    get text(): string;
    get textColor(): number;
    get textBackground(): boolean;
    get textBackgroundColor(): number;
    get textHeight(): number;
    get textWidth(): number;
    get textStyle(): TextStyle;
    get thickness(): number;
    get underline(): boolean;
    get vertical(): boolean;
    set text(param1: string);
    set textStyle(param1: TextStyle);
    set textColor(param1: number);
    set vertical(param1: boolean);
}

export const ILabelWindow = Symbol('com.sulake.core.window.components::ILabelWindow');
registerClassName(ILabelWindow, 'com.sulake.core.window.components::ILabelWindow');

export function isILabelWindow(value: unknown): value is ILabelWindow {
    return (value as { [ILabelWindow]?: true } | null | undefined)?.[ILabelWindow] === true;
}
