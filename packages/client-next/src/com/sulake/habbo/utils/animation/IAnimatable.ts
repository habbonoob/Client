import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IAnimatable {
    advanceTime(param1: number): void;
}

export const IAnimatable = Symbol('com.sulake.habbo.utils.animation::IAnimatable');
registerClassName(IAnimatable, 'com.sulake.habbo.utils.animation::IAnimatable');

export function isIAnimatable(value: unknown): value is IAnimatable {
    return (value as { [IAnimatable]?: true } | null | undefined)?.[IAnimatable] === true;
}
