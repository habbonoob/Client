import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IWindowContainer extends IWindow, IIterable {
    get numChildren(): number;
    addChild(param1: IWindow): IWindow;
    addChildAt(param1: IWindow, param2: number): IWindow;
    removeChild(param1: IWindow): IWindow;
    removeChildAt(param1: number): IWindow;
    setChildIndex(param1: IWindow, param2: number): void;
    swapChildren(param1: IWindow, param2: IWindow): void;
    swapChildrenAt(param1: number, param2: number): void;
    groupChildrenWithID(param1: number, param2: any[], param3?: number): number;
    groupChildrenWithTag(param1: string, param2: any[], param3?: number): number;
    getChildUnderPoint(param1: Point): IWindow;
    groupChildrenUnderPoint(param1: Point, param2: any[]): void;
}

export const IWindowContainer = Symbol('com.sulake.core.window::IWindowContainer');
registerClassName(IWindowContainer, 'com.sulake.core.window::IWindowContainer');

export function isIWindowContainer(value: unknown): value is IWindowContainer {
    return (value as { [IWindowContainer]?: true } | null | undefined)?.[IWindowContainer] === true;
}
