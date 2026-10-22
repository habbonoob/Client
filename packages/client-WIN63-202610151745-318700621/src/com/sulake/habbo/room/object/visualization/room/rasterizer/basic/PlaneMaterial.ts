import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { PlaneMaterialCellMatrix } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterialCellMatrix';

export class PlaneMaterial {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneMaterial'); }

    public static readonly _SafeStr_5374: number = -1;
    public static readonly MAX_NORMAL_COORDINATE_VALUE: number = 1;
    private _planeMaterialItems: any[] = [];
    private _SafeStr_4870: boolean = false;

    constructor() {
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneMaterialCellMatrix = null;
        if (this._planeMaterialItems != null) {
            _loc2_ = 0;
            while (_loc2_ < this._planeMaterialItems.length) {
                _loc1_ = asInstanceOf(this._planeMaterialItems[_loc2_], PlaneMaterialCellMatrix);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._planeMaterialItems = null;
        }
    }

    public clearCache(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneMaterialCellMatrix = null;
        if (!this._SafeStr_4870) {
            return;
        }
        if (this._planeMaterialItems != null) {
            _loc2_ = 0;
            while (_loc2_ < this._planeMaterialItems.length) {
                _loc1_ = asInstanceOf(this._planeMaterialItems[_loc2_], PlaneMaterialCellMatrix);
                if (_loc1_ != null) {
                    _loc1_.clearCache();
                }
                _loc2_++;
            }
        }
        this._SafeStr_4870 = false;
    }

    public addMaterialCellMatrix(param1: number, param2: number, param3: number, param4: number = -1, param5: number = 1, param6: number = -1, param7: number = 1): PlaneMaterialCellMatrix {
        let _loc8_: PlaneMaterialCellMatrix = null;
        _loc8_ = new PlaneMaterialCellMatrix(param1, param2, param3, param4, param5, param6, param7);
        this._planeMaterialItems.push(_loc8_);
        return _loc8_;
    }

    public getMaterialCellMatrix(param1: IVector3d): PlaneMaterialCellMatrix {
        let _loc2_: number = 0;
        let _loc3_: PlaneMaterialCellMatrix = null;
        if (param1 == null) {
            return null;
        }
        _loc2_ = 0;
        while (_loc2_ < this._planeMaterialItems.length) {
            _loc3_ = asInstanceOf(this._planeMaterialItems[_loc2_], PlaneMaterialCellMatrix);
            if (_loc3_ != null) {
                if (param1.x >= _loc3_.normalMinX && param1.x <= _loc3_.normalMaxX && param1.y >= _loc3_.normalMinY && param1.y <= _loc3_.normalMaxY) {
                    return _loc3_;
                }
            }
            _loc2_++;
        }
        return null;
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: IVector3d, param5: boolean, param6: number, param7: number, param8: boolean): BitmapData {
        if (param2 < 1) {
            param2 = 1;
        }
        if (param3 < 1) {
            param3 = 1;
        }
        let _loc9_: PlaneMaterialCellMatrix = this.getMaterialCellMatrix(param4);
        if (_loc9_ != null) {
            this._SafeStr_4870 = true;
            return _loc9_.render(param1, param2, param3, param4, param5, param6, param7, param8);
        }
        return null;
    }
}
