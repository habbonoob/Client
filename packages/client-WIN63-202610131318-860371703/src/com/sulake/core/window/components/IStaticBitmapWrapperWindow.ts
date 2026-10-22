import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';

export interface IStaticBitmapWrapperWindow extends IWindow, IBitmapDataContainer {
    get assetUri(): string;
    set assetUri(param1: string);
}

export const IStaticBitmapWrapperWindow = Symbol('com.sulake.core.window.components::IStaticBitmapWrapperWindow');
registerClassName(IStaticBitmapWrapperWindow, 'com.sulake.core.window.components::IStaticBitmapWrapperWindow');

export function isIStaticBitmapWrapperWindow(value: unknown): value is IStaticBitmapWrapperWindow {
    return (value as { [IStaticBitmapWrapperWindow]?: true } | null | undefined)?.[IStaticBitmapWrapperWindow] === true;
}
