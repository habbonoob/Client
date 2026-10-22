import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IGetImageListener {
    imageReady(param1: number, param2: BitmapData): void;
    imageFailed(param1: number): void;
}

export const IGetImageListener = Symbol('com.sulake.habbo.room::IGetImageListener');
registerClassName(IGetImageListener, 'com.sulake.habbo.room::IGetImageListener');

export function isIGetImageListener(value: unknown): value is IGetImageListener {
    return (value as { [IGetImageListener]?: true } | null | undefined)?.[IGetImageListener] === true;
}
