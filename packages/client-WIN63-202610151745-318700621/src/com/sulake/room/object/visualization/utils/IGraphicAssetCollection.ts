import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IGraphicAssetCollection {
    dispose(): void;
    set assetLibrary(param1: IAssetLibrary);
    get assetLibrary(): IAssetLibrary;
    addReference(): void;
    removeReference(): void;
    getReferenceCount(): number;
    getLastReferenceTimeStamp(): number;
    define(param1: XML): boolean;
    getAsset(param1: string): IGraphicAsset;
    getAssetWithPalette(param1: string, param2: string): IGraphicAsset;
    getPaletteNames(): any[];
    getPaletteColors(param1: string): any[];
    getPaletteXML(param1: string): XML;
    addAsset(param1: string, param2: BitmapData, param3: boolean, param4?: number, param5?: number, param6?: boolean, param7?: boolean): boolean;
    disposeAsset(param1: string): void;
}

export const IGraphicAssetCollection = Symbol('com.sulake.room.object.visualization.utils::IGraphicAssetCollection');
registerClassName(IGraphicAssetCollection, 'com.sulake.room.object.visualization.utils::IGraphicAssetCollection');

export function isIGraphicAssetCollection(value: unknown): value is IGraphicAssetCollection {
    return (value as { [IGraphicAssetCollection]?: true } | null | undefined)?.[IGraphicAssetCollection] === true;
}
