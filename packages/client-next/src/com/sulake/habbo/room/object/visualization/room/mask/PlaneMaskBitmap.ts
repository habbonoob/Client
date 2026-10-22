import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';

export class PlaneMaskBitmap {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.mask::PlaneMaskBitmap'); }

    public static readonly _SafeStr_5374: number = -1;
    public static readonly MAX_NORMAL_COORDINATE_VALUE: number = 1;
    private _asset: IGraphicAsset = null;
    private _normalMinX: number = -1;
    private _normalMaxX: number = 1;
    private _normalMinY: number = -1;
    private _normalMaxY: number = 1;

    constructor(param1: IGraphicAsset, param2: number = -1, param3: number = 1, param4: number = -1, param5: number = 1) {
        this._normalMinX = param2;
        this._normalMaxX = param3;
        this._normalMinY = param4;
        this._normalMaxY = param5;
        this._asset = param1;
    }

    public get asset(): IGraphicAsset {
        return this._asset;
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

    public dispose(): void {
        this._asset = null;
    }
}
