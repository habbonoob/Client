import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IIlluminaInputHandler } from '@/com/sulake/habbo/window/widgets/IIlluminaInputHandler';

export interface IIlluminaInputWidget extends IWidget {
    get message(): string;
    set message(param1: string);
    get submitHandler(): IIlluminaInputHandler;
    set submitHandler(param1: IIlluminaInputHandler);
    get buttonCaption(): string;
    set buttonCaption(param1: string);
    get emptyMessage(): string;
    set emptyMessage(param1: string);
    get multiline(): boolean;
    set multiline(param1: boolean);
    get maxChars(): number;
    set maxChars(param1: number);
}

export const IIlluminaInputWidget = Symbol('com.sulake.habbo.window.widgets::IIlluminaInputWidget');
registerClassName(IIlluminaInputWidget, 'com.sulake.habbo.window.widgets::IIlluminaInputWidget');

export function isIIlluminaInputWidget(value: unknown): value is IIlluminaInputWidget {
    return (value as { [IIlluminaInputWidget]?: true } | null | undefined)?.[IIlluminaInputWidget] === true;
}
