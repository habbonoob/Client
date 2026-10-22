import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IID } from '@/com/sulake/core/runtime/IID';

export interface IUnknown extends IDisposable {
    queueInterface(param1: IID, param2?: (...args: any[]) => any): IUnknown;
    release(param1: IID): number;
}

export const IUnknown = Symbol('com.sulake.core.runtime::IUnknown');
registerClassName(IUnknown, 'com.sulake.core.runtime::IUnknown');

export function isIUnknown(value: unknown): value is IUnknown {
    return (value as { [IUnknown]?: true } | null | undefined)?.[IUnknown] === true;
}
