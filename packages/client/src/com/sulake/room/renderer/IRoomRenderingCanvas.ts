import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';
import type { IRoomRenderingCanvasMouseListener } from '@/com/sulake/room/renderer/IRoomRenderingCanvasMouseListener';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IRoomRenderingCanvas {
    set useMask(param1: boolean);
    get width(): number;
    get height(): number;
    get screenOffsetX(): number;
    set screenOffsetX(param1: number);
    get screenOffsetY(): number;
    set screenOffsetY(param1: number);
    get displayObject(): DisplayObject;
    get geometry(): IRoomGeometry;
    set fpsCounterEnabled(param1: boolean);
    set mouseListener(param1: IRoomRenderingCanvasMouseListener);
    get scale(): number;
    initialize(param1: number, param2: number): void;
    render(param1: number, param2?: boolean): void;
    handleMouseEvent(param1: number, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean, param7: boolean): boolean;
    getSortableSpriteList(): RoomObjectSpriteData[];
    getPlaneSortableSprites(): any[];
    setScale(param1: number, param2?: Point, param3?: Point, param4?: boolean): void;
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
