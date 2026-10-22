import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IUpdateReceiver extends IDisposable {
    update(param1: number): void;
}

export const IUpdateReceiver = Symbol('com.sulake.core.runtime::IUpdateReceiver');
registerClassName(IUpdateReceiver, 'com.sulake.core.runtime::IUpdateReceiver');

export function isIUpdateReceiver(value: unknown): value is IUpdateReceiver {
    return (value as { [IUpdateReceiver]?: true } | null | undefined)?.[IUpdateReceiver] === true;
}
