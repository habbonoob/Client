import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { PlaneTextureBitmap } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneTextureBitmap';

export class PlaneTexture {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneTexture'); }

    public static readonly _SafeStr_5374: number = -1;
    public static readonly MAX_NORMAL_COORDINATE_VALUE: number = 1;

    constructor() {
    }

    private _bitmaps: any[] = [];

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneTextureBitmap = null;
        if (this._bitmaps != null) {
            _loc2_ = 0;
            while (_loc2_ < this._bitmaps.length) {
                _loc1_ = asInstanceOf(this._bitmaps[_loc2_], PlaneTextureBitmap);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._bitmaps = null;
        }
    }

    public addBitmap(param1: BitmapData, param2: number = -1, param3: number = 1, param4: number = -1, param5: number = 1, param6: string = null): void {
        let _loc7_: PlaneTextureBitmap = new PlaneTextureBitmap(param1, param2, param3, param4, param5, param6);
        this._bitmaps.push(_loc7_);
    }

    public getBitmap(param1: IVector3d): BitmapData {
        let _loc2_: PlaneTextureBitmap = this.getPlaneTextureBitmap(param1);
        return _loc2_ != null ? _loc2_.bitmap : null;
    }

    public getPlaneTextureBitmap(param1: IVector3d): PlaneTextureBitmap {
        let _loc3_: number = 0;
        let _loc2_: PlaneTextureBitmap = null;
        if (param1 == null) {
            return null;
        }
        _loc3_ = 0;
        while (_loc3_ < this._bitmaps.length) {
            _loc2_ = asInstanceOf(this._bitmaps[_loc3_], PlaneTextureBitmap);
            if (_loc2_ != null) {
                if (param1.x >= _loc2_.normalMinX && param1.x <= _loc2_.normalMaxX && param1.y >= _loc2_.normalMinY && param1.y <= _loc2_.normalMaxY) {
                    return _loc2_;
                }
            }
            _loc3_++;
        }
        return null;
    }

    public getAssetName(param1: IVector3d): string {
        let _loc2_: PlaneTextureBitmap = this.getPlaneTextureBitmap(param1);
        return _loc2_ != null ? _loc2_.assetName : null;
    }
}
