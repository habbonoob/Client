import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { PlaneMaskBitmap } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMaskBitmap';

export class PlaneMaskVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.mask::PlaneMaskVisualization'); }

    public static readonly _SafeStr_5374: number = -1;
    public static readonly MAX_NORMAL_COORDINATE_VALUE: number = 1;
    private _bitmaps: any[] = [];

    constructor() {
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneMaskBitmap = null;
        if (this._bitmaps != null) {
            _loc2_ = 0;
            while (_loc2_ < this._bitmaps.length) {
                _loc1_ = asInstanceOf(this._bitmaps[_loc2_], PlaneMaskBitmap);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._bitmaps = null;
        }
    }

    public addBitmap(param1: IGraphicAsset, param2: number = -1, param3: number = 1, param4: number = -1, param5: number = 1): void {
        let _loc6_: PlaneMaskBitmap = new PlaneMaskBitmap(param1, param2, param3, param4, param5);
        this._bitmaps.push(_loc6_);
    }

    public getAsset(param1: IVector3d): IGraphicAsset {
        let _loc3_: number = 0;
        let _loc2_: PlaneMaskBitmap = null;
        if (param1 == null) {
            return null;
        }
        _loc3_ = 0;
        while (_loc3_ < this._bitmaps.length) {
            _loc2_ = asInstanceOf(this._bitmaps[_loc3_], PlaneMaskBitmap);
            if (_loc2_ != null) {
                if (param1.x >= _loc2_.normalMinX && param1.x <= _loc2_.normalMaxX && param1.y >= _loc2_.normalMinY && param1.y <= _loc2_.normalMaxY) {
                    return _loc2_.asset;
                }
            }
            _loc3_++;
        }
        return null;
    }
}
