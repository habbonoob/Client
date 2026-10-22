import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PlaneMaskVisualization } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMaskVisualization';

export class PlaneMask {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.mask::PlaneMask'); }

    declare private _SafeStr_3106: UtilsMap;

    private _sizes: any[] = [];

    declare private _assetNames: UtilsMap;

    private _SafeStr_3594: PlaneMaskVisualization = null;
    private _SafeStr_5873: number = -1;

    constructor() {
        this._SafeStr_3106 = new UtilsMap();
        this._assetNames = new UtilsMap();
    }

    public dispose(): void {
        let _loc2_: PlaneMaskVisualization = null;
        let _loc1_: number = 0;
        if (this._SafeStr_3106 != null) {
            _loc2_ = null;
            _loc1_ = 0;
            while (_loc1_ < this._SafeStr_3106.length) {
                _loc2_ = asInstanceOf(this._SafeStr_3106.getWithIndex(_loc1_), PlaneMaskVisualization);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._SafeStr_3106.dispose();
            this._SafeStr_3106 = null;
        }
        this._SafeStr_3594 = null;
        this._sizes = null;
    }

    public createMaskVisualization(param1: number): PlaneMaskVisualization {
        if (this._SafeStr_3106.getValue(String(param1)) != null) {
            return null;
        }
        let _loc2_: PlaneMaskVisualization = new PlaneMaskVisualization();
        this._SafeStr_3106.add(String(param1), _loc2_);
        this._sizes.push(param1);
        this._sizes.sort();
        return _loc2_;
    }

    private getSizeIndex(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: any = 0;
        _loc3_ = 1;
        while (_loc3_ < this._sizes.length) {
            if (this._sizes[_loc3_] > param1) {
                if (this._sizes[_loc3_] - param1 < param1 - this._sizes[_loc3_ - 1]) {
                    _loc2_ = _loc3_;
                }
                break;
            }
            _loc2_ = _loc3_;
            _loc3_++;
        }
        return _loc2_ | 0;
    }

    protected getMaskVisualization(param1: number): PlaneMaskVisualization {
        if (param1 == this._SafeStr_5873) {
            return this._SafeStr_3594;
        }
        let _loc2_: number = this.getSizeIndex(param1);
        if (_loc2_ < this._sizes.length) {
            this._SafeStr_3594 = asInstanceOf(this._SafeStr_3106.getValue(String(this._sizes[_loc2_])), PlaneMaskVisualization);
        } else {
            this._SafeStr_3594 = null;
        }
        this._SafeStr_5873 = param1;
        return this._SafeStr_3594;
    }

    public getGraphicAsset(param1: number, param2: IVector3d): IGraphicAsset {
        let _loc3_: PlaneMaskVisualization = this.getMaskVisualization(param1 | 0);
        if (_loc3_ == null) {
            return null;
        }
        return _loc3_.getAsset(param2);
    }

    public getAssetName(param1: number): string {
        return stringOrNull(this._assetNames.getValue(param1));
    }

    public setAssetName(param1: number, param2: string): void {
        this._assetNames.add(param1, param2);
    }
}
