import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPlaneDrawingData } from '@/com/sulake/room/object/visualization/IPlaneDrawingData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export class PlaneDrawingData implements IPlaneDrawingData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room::PlaneDrawingData'); }

    declare private _z: number;
    static { (this.prototype as any)._z = NaN; }

    declare private _SafeStr_5536: Point[];

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _maskAssetNames: any[];

    declare private _maskAssetLocations: any[];

    declare private _maskAssetFlipHs: any[];

    declare private _maskAssetFlipVs: any[];

    private _SafeStr_7125: boolean = false;
    private _assetNames: any[] = [];

    constructor(param1: PlaneDrawingData = null, param2: number = 0, param3: boolean = false) {
        this._maskAssetNames = [];
        this._maskAssetLocations = [];
        this._maskAssetFlipHs = [];
        this._maskAssetFlipVs = [];
        if (param1 != null) {
            this._maskAssetNames = param1._maskAssetNames;
            this._maskAssetLocations = param1._maskAssetLocations;
            this._maskAssetFlipHs = param1._maskAssetFlipHs;
            this._maskAssetFlipVs = param1._maskAssetFlipVs;
        }
        this._color = param2;
        this._SafeStr_7125 = param3;
    }

    public addMask(param1: string, param2: Point, param3: boolean, param4: boolean): void {
        this._maskAssetNames.push(param1);
        this._maskAssetLocations.push(param2);
        this._maskAssetFlipHs.push(param3);
        this._maskAssetFlipVs.push(param4);
    }

    public addAssetColumn(param1: any[]): void {
        this._assetNames.push(param1);
    }

    public set z(param1: number) {
        this._z = param1;
    }

    public get z(): number {
        return this._z;
    }

    public set cornerPoints(param1: Point[]) {
        this._SafeStr_5536 = param1;
    }

    public get cornerPoints(): Point[] {
        return this._SafeStr_5536;
    }

    public get color(): number {
        return this._color;
    }

    public get maskAssetNames(): any[] {
        return this._maskAssetNames;
    }

    public get maskAssetLocations(): any[] {
        return this._maskAssetLocations;
    }

    public get maskAssetFlipHs(): any[] {
        return this._maskAssetFlipHs;
    }

    public get maskAssetFlipVs(): any[] {
        return this._maskAssetFlipVs;
    }

    public isBottomAligned(): boolean {
        return this._SafeStr_7125;
    }

    public get assetNameColumns(): any[] {
        return this._assetNames;
    }
}
