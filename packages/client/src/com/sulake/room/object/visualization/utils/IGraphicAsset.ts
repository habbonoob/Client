import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';

export interface IGraphicAsset {
    get flipV(): boolean;
    get flipH(): boolean;
    get width(): number;
    get height(): number;
    get asset(): IAsset;
    get assetName(): string;
    get libraryAssetName(): string;
    get offsetX(): number;
    get offsetY(): number;
    get originalOffsetX(): number;
    get originalOffsetY(): number;
    get usesPalette(): boolean;
}

export const IGraphicAsset = Symbol('com.sulake.room.object.visualization.utils::IGraphicAsset');
registerClassName(IGraphicAsset, 'com.sulake.room.object.visualization.utils::IGraphicAsset');

export function isIGraphicAsset(value: unknown): value is IGraphicAsset {
    return (value as { [IGraphicAsset]?: true } | null | undefined)?.[IGraphicAsset] === true;
}
