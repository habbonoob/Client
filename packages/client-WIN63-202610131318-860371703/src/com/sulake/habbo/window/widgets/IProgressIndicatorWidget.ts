import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IProgressIndicatorWidget extends IWidget {
    get size(): number;
    set size(param1: number);
    get position(): number;
    set position(param1: number);
    get mode(): string;
    set mode(param1: string);
}

export const IProgressIndicatorWidget = Symbol('com.sulake.habbo.window.widgets::IProgressIndicatorWidget');
registerClassName(IProgressIndicatorWidget, 'com.sulake.habbo.window.widgets::IProgressIndicatorWidget');

export function isIProgressIndicatorWidget(value: unknown): value is IProgressIndicatorWidget {
    return (value as { [IProgressIndicatorWidget]?: true } | null | undefined)?.[IProgressIndicatorWidget] === true;
}
