import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IBitmapDataContainer {
    get bitmapData(): BitmapData;
    get pivotPoint(): number;
    set pivotPoint(param1: number);
    get stretchedX(): boolean;
    set stretchedX(param1: boolean);
    get stretchedY(): boolean;
    set stretchedY(param1: boolean);
    get zoomX(): number;
    set zoomX(param1: number);
    get zoomY(): number;
    set zoomY(param1: number);
    get greyscale(): boolean;
    set greyscale(param1: boolean);
    get etchingColor(): number;
    set etchingColor(param1: number);
    get etchingPoint(): Point;
    get fitSizeToContents(): boolean;
    set fitSizeToContents(param1: boolean);
    get wrapX(): boolean;
    set wrapX(param1: boolean);
    get wrapY(): boolean;
    set wrapY(param1: boolean);
    get flipX(): boolean;
    set flipX(param1: boolean);
    get flipY(): boolean;
    set flipY(param1: boolean);
    get rotation(): number;
    set rotation(param1: number);
}

export const IBitmapDataContainer = Symbol('com.sulake.core.window.utils::IBitmapDataContainer');
registerClassName(IBitmapDataContainer, 'com.sulake.core.window.utils::IBitmapDataContainer');

export function isIBitmapDataContainer(value: unknown): value is IBitmapDataContainer {
    return (value as { [IBitmapDataContainer]?: true } | null | undefined)?.[IBitmapDataContainer] === true;
}
