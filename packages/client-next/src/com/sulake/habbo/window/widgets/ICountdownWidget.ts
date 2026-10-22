import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface ICountdownWidget extends IWidget {
    get colorStyle(): number;
    set colorStyle(param1: number);
    get running(): boolean;
    set running(param1: boolean);
    get digits(): number;
    set digits(param1: number);
    get seconds(): number;
    set seconds(param1: number);
}

export const ICountdownWidget = Symbol('com.sulake.habbo.window.widgets::ICountdownWidget');
registerClassName(ICountdownWidget, 'com.sulake.habbo.window.widgets::ICountdownWidget');

export function isICountdownWidget(value: unknown): value is ICountdownWidget {
    return (value as { [ICountdownWidget]?: true } | null | undefined)?.[ICountdownWidget] === true;
}
