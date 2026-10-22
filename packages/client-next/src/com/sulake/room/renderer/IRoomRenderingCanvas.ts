import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';
import type { IRoomRenderingCanvasMouseListener } from '@/com/sulake/room/renderer/IRoomRenderingCanvasMouseListener';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IRoomRenderingCanvas {
    set useMask(param1: boolean);
    initialize(param1: number, param2: number): void;
    get width(): number;
    get height(): number;
    set screenOffsetX(param1: number);
    set screenOffsetY(param1: number);
    get screenOffsetX(): number;
    get screenOffsetY(): number;
    render(param1: number, param2?: boolean): void;
    get displayObject(): DisplayObject;
    get geometry(): IRoomGeometry;
    set fpsCounterEnabled(param1: boolean);
    set pingMs(param1: number);
    set mouseListener(param1: IRoomRenderingCanvasMouseListener);
    handleMouseEvent(param1: number, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean, param7: boolean): boolean;
    getSortableSpriteList(): RoomObjectSpriteData[];
    getPlaneSortableSprites(): any[];
    setScale(param1: number, param2?: Point, param3?: Point, param4?: boolean): void;
    get scale(): number;
    setFlip(param1: boolean, param2?: Point, param3?: Point): void;
    get isFlipped(): boolean;
    takeScreenShot(): BitmapData;
    skipSpriteVisibilityChecking(): void;
    resumeSpriteVisibilityChecking(): void;
    getId(): number;
}

export const IRoomRenderingCanvas = Symbol('com.sulake.room.renderer::IRoomRenderingCanvas');
registerClassName(IRoomRenderingCanvas, 'com.sulake.room.renderer::IRoomRenderingCanvas');

export function isIRoomRenderingCanvas(value: unknown): value is IRoomRenderingCanvas {
    return (value as { [IRoomRenderingCanvas]?: true } | null | undefined)?.[IRoomRenderingCanvas] === true;
}
