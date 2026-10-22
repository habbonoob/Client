import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class PointMath {
    static { registerClassName(this, 'com.sulake.room.utils::PointMath'); }

    public static sum(param1: Point, param2: Point): Point {
        return new Point(param1.x + param2.x, param1.y + param2.y);
    }

    public static sub(param1: Point, param2: Point): Point {
        return new Point(param1.x - param2.x, param1.y - param2.y);
    }

    public static mul(param1: Point, param2: number): Point {
        return new Point(param1.x * param2, param1.y * param2);
    }

    constructor() {
    }
}
