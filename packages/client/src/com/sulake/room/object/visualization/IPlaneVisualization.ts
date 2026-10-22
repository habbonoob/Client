import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomPlane } from '@/com/sulake/room/object/visualization/IRoomPlane';

export interface IPlaneVisualization {
    get planes(): IRoomPlane[];
}

export const IPlaneVisualization = Symbol('com.sulake.room.object.visualization::IPlaneVisualization');
registerClassName(IPlaneVisualization, 'com.sulake.room.object.visualization::IPlaneVisualization');

export function isIPlaneVisualization(value: unknown): value is IPlaneVisualization {
    return (value as { [IPlaneVisualization]?: true } | null | undefined)?.[IPlaneVisualization] === true;
}
