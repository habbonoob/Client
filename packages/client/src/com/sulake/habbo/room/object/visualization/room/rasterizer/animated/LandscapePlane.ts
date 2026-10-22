import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneVisualization } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Plane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/Plane';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class LandscapePlane extends Plane {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.animated::LandscapePlane'); }

    public static readonly DEFAULT_COLOR: number = 16777215;
    public static readonly HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static readonly VERTICAL_ANGLE_DEFAULT: number = 30;

    constructor() {
        super();
    }

    private _width: number = 0;
    private _height: number = 0;

    public override isStatic(param1: number): boolean {
        let _loc2_: PlaneVisualization = this.getPlaneVisualization(param1);
        if (_loc2_ != null) {
            return !_loc2_.hasAnimationLayers;
        }
        return super.isStatic(param1);
    }

    public initializeDimensions(param1: number, param2: number): void {
        if (param1 < 0) {
            param1 = 0;
        }
        if (param2 < 0) {
            param2 = 0;
        }
        if (param1 != this._width || param2 != this._height) {
            this._width = param1;
            this._height = param2;
        }
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: number, param5: IVector3d, param6: boolean, param7: number, param8: number, param9: number, param10: number, param11: number): BitmapData {
        let _loc12_: number = 0;
        let _loc20_: number = 0;
        let _loc19_: number = 0;
        let _loc18_: number = 0;
        let _loc17_: any = null;
        let _loc13_: PlaneVisualization = this.getPlaneVisualization(param4 | 0);
        if (_loc13_ == null || _loc13_.geometry == null) {
            return null;
        }
        let _loc14_: Point = _loc13_.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        let _loc15_: Point = _loc13_.geometry.getScreenPoint(new Vector3d(0, 0, 1));
        let _loc16_: Point = _loc13_.geometry.getScreenPoint(new Vector3d(0, 1, 0));
        if (_loc14_ != null && _loc15_ != null && _loc16_ != null) {
            param2 = Math.round(Math.abs((_loc14_.x - _loc16_.x) * param2 / _loc13_.geometry.scale));
            param3 = Math.round(Math.abs((_loc14_.y - _loc15_.y) * param3 / _loc13_.geometry.scale));
            _loc12_ = param7 * Math.abs(_loc14_.x - _loc16_.x) | 0;
            _loc20_ = param8 * Math.abs(_loc14_.y - _loc15_.y) | 0;
            _loc19_ = param9 * Math.abs(_loc14_.x - _loc16_.x) | 0;
            _loc18_ = param10 * Math.abs(_loc14_.y - _loc15_.y) | 0;
            return _loc13_.render(param1, param2 | 0, param3 | 0, param5, param6, _loc12_, _loc20_, _loc19_, _loc18_, param9, param10, param11);
        }
        return null;
    }
}
