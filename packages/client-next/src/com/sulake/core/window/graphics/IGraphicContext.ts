import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import type { IBitmapDrawable } from '@habbo-pixi/runtime/display/IBitmapDrawable';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IGraphicContext extends IBitmapDrawable, IEventDispatcher, IDisposable {
    get parent(): DisplayObjectContainer;
    set parent(param1: DisplayObjectContainer);
    get filters(): any[];
    set filters(param1: any[]);
    get visible(): boolean;
    set visible(param1: boolean);
    get blend(): number;
    set blend(param1: number);
    get mouse(): boolean;
    set mouse(param1: boolean);
    offSet(param1: Point): void;
    getDrawRegion(): Rectangle;
    setDrawRegion(param1: Rectangle, param2: boolean, param3: Rectangle): BitmapData;
    getDisplayObject(): DisplayObject;
    setDisplayObject(param1: DisplayObject): DisplayObject;
    getAbsoluteMousePosition(param1: Point): void;
    getRelativeMousePosition(param1: Point): void;
    fetchDrawBuffer(): IBitmapDrawable;
    showRedrawRegion(param1: Rectangle): void;
    get numChildContexts(): number;
    addChildContext(param1: IGraphicContext): IGraphicContext;
    addChildContextAt(param1: IGraphicContext, param2: number): IGraphicContext;
    getChildContextAt(param1: number): IGraphicContext;
    getChildContextIndex(param1: IGraphicContext): number;
    removeChildContext(param1: IGraphicContext): IGraphicContext;
    removeChildContextAt(param1: number): IGraphicContext;
    setChildContextIndex(param1: IGraphicContext, param2: number): void;
    swapChildContexts(param1: IGraphicContext, param2: IGraphicContext): void;
    swapChildContextsAt(param1: number, param2: number): void;
}

export const IGraphicContext = Symbol('com.sulake.core.window.graphics::IGraphicContext');
registerClassName(IGraphicContext, 'com.sulake.core.window.graphics::IGraphicContext');

export function isIGraphicContext(value: unknown): value is IGraphicContext {
    return (value as { [IGraphicContext]?: true } | null | undefined)?.[IGraphicContext] === true;
}
