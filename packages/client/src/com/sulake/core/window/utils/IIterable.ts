import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';

export interface IIterable {
    get iterator(): IIterator;
}

export const IIterable = Symbol('com.sulake.core.window.utils::IIterable');
registerClassName(IIterable, 'com.sulake.core.window.utils::IIterable');

export function isIIterable(value: unknown): value is IIterable {
    return (value as { [IIterable]?: true } | null | undefined)?.[IIterable] === true;
}
