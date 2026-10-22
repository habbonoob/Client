import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PlaneVisualization } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualization';

export class Plane {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::Plane'); }

    constructor() {
        this._SafeStr_2751 = new UtilsMap();
    }

    declare private _SafeStr_2751: UtilsMap;

    private _sizes: any[] = [];
    private _SafeStr_3740: PlaneVisualization = null;
    private _SafeStr_5873: number = -1;

    public isStatic(param1: number): boolean {
        return true;
    }

    public dispose(): void {
        let _loc1_: PlaneVisualization = null;
        let _loc2_: number = 0;
        if (this._SafeStr_2751 != null) {
            _loc1_ = null;
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2751.length) {
                _loc1_ = asInstanceOf(this._SafeStr_2751.getWithIndex(_loc2_), PlaneVisualization);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._SafeStr_2751.dispose();
            this._SafeStr_2751 = null;
        }
        this._SafeStr_3740 = null;
        this._sizes = null;
    }

    public clearCache(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneVisualization = null;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2751.length) {
            _loc1_ = asInstanceOf(this._SafeStr_2751.getWithIndex(_loc2_), PlaneVisualization);
            if (_loc1_ != null) {
                _loc1_.clearCache();
            }
            _loc2_++;
        }
    }

    public createPlaneVisualization(param1: number, param2: number, param3: IRoomGeometry): PlaneVisualization {
        if (this._SafeStr_2751.getValue(String(param1)) != null) {
            return null;
        }
        let _loc4_: PlaneVisualization = new PlaneVisualization(param1, param2, param3);
        this._SafeStr_2751.add(String(param1), _loc4_);
        this._sizes.push(param1);
        this._sizes.sort();
        return _loc4_;
    }

    public getLayers(): any[] {
        return this.getPlaneVisualization(this._SafeStr_5873).getLayers();
    }

    protected getPlaneVisualization(param1: number): PlaneVisualization {
        if (param1 == this._SafeStr_5873) {
            return this._SafeStr_3740;
        }
        let _loc2_: number = this.getSizeIndex(param1);
        if (_loc2_ < this._sizes.length) {
            this._SafeStr_3740 = asInstanceOf(this._SafeStr_2751.getValue(String(this._sizes[_loc2_])), PlaneVisualization);
        } else {
            this._SafeStr_3740 = null;
        }
        this._SafeStr_5873 = param1;
        return this._SafeStr_3740;
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
}
