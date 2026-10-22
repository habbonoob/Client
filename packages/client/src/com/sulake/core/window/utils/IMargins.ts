import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IMargins {
    get left(): number;
    set left(param1: number);
    get right(): number;
    set right(param1: number);
    get top(): number;
    set top(param1: number);
    get bottom(): number;
    set bottom(param1: number);
}

export const IMargins = Symbol('com.sulake.core.window.utils::IMargins');
registerClassName(IMargins, 'com.sulake.core.window.utils::IMargins');

export function isIMargins(value: unknown): value is IMargins {
    return (value as { [IMargins]?: true } | null | undefined)?.[IMargins] === true;
}
