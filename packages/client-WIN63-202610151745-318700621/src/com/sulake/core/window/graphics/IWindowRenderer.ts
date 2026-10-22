import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IWindowRenderer extends IDisposable {
    set debug(param1: boolean);
    render(): void;
    addToRenderQueue(param1: IWindow, param2: Rectangle, param3: number): void;
    flushRenderQueue(): void;
    invalidate(param1: IWindowContext, param2: Rectangle): void;
    getDrawBufferForRenderable(param1: IWindow): BitmapData;
    purge(param1?: IWindow, param2?: boolean): void;
}
