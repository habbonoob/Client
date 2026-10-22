import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class PlaneTextureBitmap {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneTextureBitmap'); }

    public static readonly _SafeStr_5374: number = -1;
    public static readonly MAX_NORMAL_COORDINATE_VALUE: number = 1;
    private _bitmap: BitmapData = null;
    private _normalMinX: number = -1;
    private _normalMaxX: number = 1;
    private _normalMinY: number = -1;
    private _normalMaxY: number = 1;
    private _assetName: string = null;

    constructor(param1: BitmapData, param2: number = -1, param3: number = 1, param4: number = -1, param5: number = 1, param6: string = null) {
        this._normalMinX = param2;
        this._normalMaxX = param3;
        this._normalMinY = param4;
        this._normalMaxY = param5;
        this._assetName = param6;
        this._bitmap = param1;
    }

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    public get normalMinX(): number {
        return this._normalMinX;
    }

    public get normalMaxX(): number {
        return this._normalMaxX;
    }

    public get normalMinY(): number {
        return this._normalMinY;
    }

    public get normalMaxY(): number {
        return this._normalMaxY;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public dispose(): void {
        this._bitmap = null;
    }
}
