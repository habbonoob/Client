import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IScrollableWindow extends IWindow {
    get scrollH(): number;
    get scrollV(): number;
    set scrollH(param1: number);
    set scrollV(param1: number);
    get maxScrollH(): number;
    get maxScrollV(): number;
    get visibleRegion(): Rectangle;
    get scrollableRegion(): Rectangle;
}

export const IScrollableWindow = Symbol('com.sulake.core.window.components::IScrollableWindow');
registerClassName(IScrollableWindow, 'com.sulake.core.window.components::IScrollableWindow');

export function isIScrollableWindow(value: unknown): value is IScrollableWindow {
    return (value as { [IScrollableWindow]?: true } | null | undefined)?.[IScrollableWindow] === true;
}
