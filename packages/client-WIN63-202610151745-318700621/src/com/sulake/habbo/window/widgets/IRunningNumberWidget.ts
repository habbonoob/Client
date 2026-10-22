import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IRunningNumberWidget extends IWidget {
    get number(): number;
    set number(param1: number);
    set initialNumber(param1: number);
    get digits(): number;
    set digits(param1: number);
    get colorStyle(): number;
    set colorStyle(param1: number);
    get updateFrequency(): number;
    set updateFrequency(param1: number);
}

export const IRunningNumberWidget = Symbol('com.sulake.habbo.window.widgets::IRunningNumberWidget');
registerClassName(IRunningNumberWidget, 'com.sulake.habbo.window.widgets::IRunningNumberWidget');

export function isIRunningNumberWidget(value: unknown): value is IRunningNumberWidget {
    return (value as { [IRunningNumberWidget]?: true } | null | undefined)?.[IRunningNumberWidget] === true;
}
