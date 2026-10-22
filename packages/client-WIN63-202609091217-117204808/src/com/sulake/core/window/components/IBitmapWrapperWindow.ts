import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IBitmapWrapperWindow extends IWindow, IBitmapDataContainer {
    set bitmap(param1: BitmapData);
    get bitmap(): BitmapData;
    get bitmapAssetName(): string;
    set bitmapAssetName(param1: string);
    set disposesBitmap(param1: boolean);
    get disposesBitmap(): boolean;
}

export const IBitmapWrapperWindow = Symbol('com.sulake.core.window.components::IBitmapWrapperWindow');
registerClassName(IBitmapWrapperWindow, 'com.sulake.core.window.components::IBitmapWrapperWindow');

export function isIBitmapWrapperWindow(value: unknown): value is IBitmapWrapperWindow {
    return (value as { [IBitmapWrapperWindow]?: true } | null | undefined)?.[IBitmapWrapperWindow] === true;
}
