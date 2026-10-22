import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';

export class _SafeCls_6139 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::_SafeCls_6139'); }

    private static readonly STRENGTH_STEP: number = 5;

    constructor() {
    }

    public static quantizeStrength(param1: number): number {
        if (isNaN(param1) || param1 <= 0) {
            return 0;
        }
        if (param1 >= 100) {
            return 100;
        }
        return Math.max(5, Math.round(param1 / 5) * 5) | 0;
    }

    public static usesCompositeSilhouette(param1: number): boolean {
        return param1 == 0 || param1 == 1 || param1 == 5;
    }

    public static create(param1: number, param2: number, param3: number): any[] {
        if (param3 <= 0) {
            return null;
        }
        let _loc5_: number = Math.min(100, param3) / 100;
        let _loc4_: number = (param2 & 0xFFFFFF) >>> 0;
        switch (param1) {
            case 0:
                return [new GlowFilter(_loc4_, _loc5_, 2 + 2 * _loc5_, 2 + 2 * _loc5_, 2 + 5 * _loc5_, 1, false, true)];
            case 1:
                return [new GlowFilter(_loc4_, 0.75 * _loc5_, 6 + 6 * _loc5_, 6 + 6 * _loc5_, 1.5 + 1.5 * _loc5_, 1, false, true)];
            case 2:
                return [_SafeCls_6139.createDarkenFilter(_loc5_)];
            case 3:
                return [_SafeCls_6139.createColorTintFilter(_loc4_, _loc5_ * (_loc4_ == 0 ? 1 : 1.35))];
            case 4:
                return [_SafeCls_6139.createBrightenFilter(_loc5_)];
            case 5:
                return [new GlowFilter(_loc4_, 0.55 * _loc5_, 14 + 10 * _loc5_, 14 + 10 * _loc5_, 1.5 + 1.5 * _loc5_, 1, false, true), new GlowFilter(16777215, 0.9 * _loc5_, 2, 2, 6 + 6 * _loc5_, 1, false, true)];
            default:
                return null;
        }
    }

    private static createColorTintFilter(param1: number, param2: number): ColorMatrixFilter {
        let _loc3_: number = (param1 >> 16 & 0xFF) / 255;
        let _loc4_: number = (param1 >> 8 & 0xFF) / 255;
        let _loc5_: number = (param1 & 0xFF) / 255;
        let _loc8_: number = 0.65 * param2;
        let _loc7_: number = _loc8_ * 0.05;
        let _loc6_: number = 35 * param2;
        return new ColorMatrixFilter([1 - _loc8_ + _loc8_ * _loc3_, _loc7_ * _loc4_, _loc7_ * _loc5_, 0, _loc3_ * _loc6_, _loc7_ * _loc3_, 1 - _loc8_ + _loc8_ * _loc4_, _loc7_ * _loc5_, 0, _loc4_ * _loc6_, _loc7_ * _loc3_, _loc7_ * _loc4_, 1 - _loc8_ + _loc8_ * _loc5_, 0, _loc5_ * _loc6_, 0, 0, 0, 1, 0]);
    }

    private static createDarkenFilter(param1: number): ColorMatrixFilter {
        let _loc2_: number = 1 - 0.65 * param1;
        return new ColorMatrixFilter([_loc2_, 0, 0, 0, 0, 0, _loc2_, 0, 0, 0, 0, 0, _loc2_, 0, 0, 0, 0, 0, 1, 0]);
    }

    private static createBrightenFilter(param1: number): ColorMatrixFilter {
        let _loc3_: number = 1 + 0.78 * param1;
        let _loc2_: number = 36 * param1;
        return new ColorMatrixFilter([_loc3_, 0, 0, 0, _loc2_, 0, _loc3_, 0, 0, _loc2_, 0, 0, _loc3_, 0, _loc2_, 0, 0, 0, 1, 0]);
    }
}
