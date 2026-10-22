import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneVisualization } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Plane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/Plane';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class WallPlane extends Plane {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::WallPlane'); }

    public static readonly DEFAULT_COLOR: number = 16777215;
    public static readonly HORIZONTAL_ANGLE_DEFAULT: number = 45;
    public static readonly VERTICAL_ANGLE_DEFAULT: number = 30;

    constructor() {
        super();
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: number, param5: IVector3d, param6: boolean): BitmapData {
        let _loc7_: PlaneVisualization = this.getPlaneVisualization(param4 | 0);
        if (_loc7_ == null || _loc7_.geometry == null) {
            return null;
        }
        let _loc8_: Point = _loc7_.geometry.getScreenPoint(new Vector3d(0, 0, 0));
        let _loc9_: Point = _loc7_.geometry.getScreenPoint(new Vector3d(0, 0, param3 / _loc7_.geometry.scale));
        let _loc10_: Point = _loc7_.geometry.getScreenPoint(new Vector3d(0, param2 / _loc7_.geometry.scale, 0));
        if (_loc8_ != null && _loc9_ != null && _loc10_ != null) {
            param2 = Math.round(Math.abs(_loc8_.x - _loc10_.x));
            param3 = Math.round(Math.abs(_loc8_.y - _loc9_.y));
        }
        return _loc7_.render(param1, param2 | 0, param3 | 0, param5, param6);
    }
}
