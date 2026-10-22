import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IRoomObjectVisualizationData {
    initialize(param1: XML): boolean;
    dispose(): void;
}

export const IRoomObjectVisualizationData = Symbol('com.sulake.room.object.visualization::IRoomObjectVisualizationData');
registerClassName(IRoomObjectVisualizationData, 'com.sulake.room.object.visualization::IRoomObjectVisualizationData');

export function isIRoomObjectVisualizationData(value: unknown): value is IRoomObjectVisualizationData {
    return (value as { [IRoomObjectVisualizationData]?: true } | null | undefined)?.[IRoomObjectVisualizationData] === true;
}
