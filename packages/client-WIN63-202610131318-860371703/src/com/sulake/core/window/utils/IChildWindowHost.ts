import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IChildWindowHost {
    get children(): IWindow[];
}

export const IChildWindowHost = Symbol('com.sulake.core.window.utils::IChildWindowHost');
registerClassName(IChildWindowHost, 'com.sulake.core.window.utils::IChildWindowHost');

export function isIChildWindowHost(value: unknown): value is IChildWindowHost {
    return (value as { [IChildWindowHost]?: true } | null | undefined)?.[IChildWindowHost] === true;
}
