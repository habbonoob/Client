import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IRoomContentLoader {
    dispose(): void;
    getPlaceHolderType(param1: string): string;
    getPlaceHolderTypes(): any[];
    getContentType(param1: string): string;
    hasInternalContent(param1: string): boolean;
    loadObjectContent(param1: string, param2: IEventDispatcher): boolean;
    insertObjectContent(param1: number, param2: number, param3: IAssetLibrary): boolean;
    getVisualizationType(param1: string): string;
    getLogicType(param1: string): string;
    hasVisualizationXML(param1: string): boolean;
    getVisualizationXML(param1: string): XML;
    hasAssetXML(param1: string): boolean;
    getAssetXML(param1: string): XML;
    hasLogicXML(param1: string): boolean;
    getLogicXML(param1: string): XML;
    getGraphicAssetCollection(param1: string): IGraphicAssetCollection;
    roomObjectCreated(param1: IRoomObject, param2: string): void;
}
