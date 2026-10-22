import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IScrollableWindow extends IWindow {
    get scrollH(): number;
    set scrollH(param1: number);
    get scrollV(): number;
    set scrollV(param1: number);
    get scrollStepH(): number;
    set scrollStepH(param1: number);
    get scrollStepV(): number;
    set scrollStepV(param1: number);
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
