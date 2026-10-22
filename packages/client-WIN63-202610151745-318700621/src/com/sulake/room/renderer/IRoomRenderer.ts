import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomRendererBase } from '@/com/sulake/room/renderer/IRoomRendererBase';
import type { IRoomRenderingCanvas } from '@/com/sulake/room/renderer/IRoomRenderingCanvas';

export interface IRoomRenderer extends IRoomRendererBase {
    set roomObjectVariableAccurateZ(param1: string);
    createCanvas(param1: number, param2: number, param3: number, param4: number): IRoomRenderingCanvas;
    getCanvas(param1: number): IRoomRenderingCanvas;
    disposeCanvas(param1: number): boolean;
}

export const IRoomRenderer = Symbol('com.sulake.room.renderer::IRoomRenderer');
registerClassName(IRoomRenderer, 'com.sulake.room.renderer::IRoomRenderer');

export function isIRoomRenderer(value: unknown): value is IRoomRenderer {
    return (value as { [IRoomRenderer]?: true } | null | undefined)?.[IRoomRenderer] === true;
}
