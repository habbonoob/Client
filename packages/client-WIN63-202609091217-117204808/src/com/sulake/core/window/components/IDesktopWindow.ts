import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IDesktopWindow extends IWindowContainer, IDisplayObjectWrapper {
    get mouseX(): number;
    get mouseY(): number;
    getActiveWindow(): IWindow;
    setActiveWindow(param1: IWindow): IWindow;
    groupParameterFilteredChildrenUnderPoint(param1: Point, param2: any[], param3?: number): void;
}

export const IDesktopWindow = Symbol('com.sulake.core.window.components::IDesktopWindow');
registerClassName(IDesktopWindow, 'com.sulake.core.window.components::IDesktopWindow');

export function isIDesktopWindow(value: unknown): value is IDesktopWindow {
    return (value as { [IDesktopWindow]?: true } | null | undefined)?.[IDesktopWindow] === true;
}
