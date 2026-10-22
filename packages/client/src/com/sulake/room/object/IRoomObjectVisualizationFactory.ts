import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IRoomObjectVisualizationFactory extends IUnknown {
    createRoomObjectVisualization(param1: string): IRoomObjectGraphicVisualization;
    createGraphicAssetCollection(): IGraphicAssetCollection;
    getRoomObjectVisualizationData(param1: string, param2: string, param3: XML): IRoomObjectVisualizationData;
}
