import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneVisualization } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Plane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/Plane';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FloorPlane extends Plane {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::FloorPlane'); }

    public static readonly DEFAULT_COLOR: number = 16777215;
    public static readonly HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static readonly VERTICAL_ANGLE_DEFAULT: number = 30;

    constructor() {
        super();
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: number, param5: IVector3d, param6: boolean, param7: number, param8: number): BitmapData {
        let _loc14_: number = NaN;
        let _loc10_: PlaneVisualization = this.getPlaneVisualization(param4 | 0);
        if (_loc10_ == null || _loc10_.geometry == null) {
            return null;
        }
        let _loc11_: Point = _loc10_.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        let _loc12_: Point = _loc10_.geometry.getScreenPoint(new Vector3d(0, param3 / _loc10_.geometry.scale, 0));
        let _loc13_: Point = _loc10_.geometry.getScreenPoint(new Vector3d(param2 / _loc10_.geometry.scale, 0, 0));
        let _loc9_: number = 0;
        let _loc15_: number = 0;
        if (_loc11_ != null && _loc12_ != null && _loc13_ != null) {
            param2 = Math.round(Math.abs(_loc11_.x - _loc13_.x));
            param3 = Math.round(Math.abs(_loc11_.x - _loc12_.x));
            _loc14_ = _loc11_.x - _loc10_.geometry.getScreenPoint(new Vector3d(1, 0, 0)).x;
            _loc9_ = param7 * (Math.abs(_loc14_) | 0) | 0;
            _loc15_ = param8 * (Math.abs(_loc14_) | 0) | 0;
        }
        return _loc10_.render(param1, param2 | 0, param3 | 0, param5, param6, _loc9_, _loc15_);
    }
}
