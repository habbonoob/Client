import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IPlaneDrawingData {
    get z(): number;
    set z(param1: number);
    get cornerPoints(): Point[];
    set cornerPoints(param1: Point[]);
    get color(): number;
    get maskAssetNames(): any[];
    get maskAssetLocations(): any[];
    get maskAssetFlipHs(): any[];
    get maskAssetFlipVs(): any[];
    get assetNameColumns(): any[];
    isBottomAligned(): boolean;
}
