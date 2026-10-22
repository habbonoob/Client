import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectVisualization';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization {
    get assetCollection(): IGraphicAssetCollection;
    set assetCollection(param1: IGraphicAssetCollection);
    setExternalBaseUrls(param1: string, param2: string, param3: boolean): void;
}

export const IRoomObjectGraphicVisualization = Symbol('com.sulake.room.object.visualization::IRoomObjectGraphicVisualization');
registerClassName(IRoomObjectGraphicVisualization, 'com.sulake.room.object.visualization::IRoomObjectGraphicVisualization');

export function isIRoomObjectGraphicVisualization(value: unknown): value is IRoomObjectGraphicVisualization {
    return (value as { [IRoomObjectGraphicVisualization]?: true } | null | undefined)?.[IRoomObjectGraphicVisualization] === true;
}
