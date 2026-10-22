import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IPlaneDrawingData {
    set z(param1: number);
    get z(): number;
    set cornerPoints(param1: Point[]);
    get cornerPoints(): Point[];
    get color(): number;
    get maskAssetNames(): any[];
    get maskAssetLocations(): any[];
    get maskAssetFlipHs(): any[];
    get maskAssetFlipVs(): any[];
    isBottomAligned(): boolean;
    get assetNameColumns(): any[];
}
