import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export class MathUtils {
    static { registerClassName(this, 'com.sulake.habbo.utils::MathUtils'); }

    constructor() {
    }

    public static normalize(param1: number, param2: number, param3: number): number {
        return (param1 - param2) / (param3 - param2);
    }

    public static lerp(param1: number, param2: number, param3: number): number {
        return param1 * (param3 - param2) + param2;
    }

    public static clamp(param1: number, param2: number = 0, param3: number = 1): number {
        return Math.max(param2, Math.min(param3, param1));
    }

    public static map(param1: number, param2: number, param3: number, param4: number, param5: number): number {
        return MathUtils.lerp(MathUtils.normalize(param1, param2, param3), param4, param5);
    }

    public static rectangleTransformMatrix(param1: Rectangle, param2: Rectangle): Matrix {
        let _loc3_: Matrix = new Matrix();
        _loc3_.a = param2.width / param1.width;
        _loc3_.d = param2.height / param1.height;
        _loc3_.tx = param2.x - param1.x * _loc3_.a;
        _loc3_.ty = param2.y - param1.y * _loc3_.d;
        return _loc3_;
    }
}
