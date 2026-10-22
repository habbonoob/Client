import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IMargins {
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    set left(param1: number);
    set right(param1: number);
    set top(param1: number);
    set bottom(param1: number);
}

export const IMargins = Symbol('com.sulake.core.window.utils::IMargins');
registerClassName(IMargins, 'com.sulake.core.window.utils::IMargins');

export function isIMargins(value: unknown): value is IMargins {
    return (value as { [IMargins]?: true } | null | undefined)?.[IMargins] === true;
}
