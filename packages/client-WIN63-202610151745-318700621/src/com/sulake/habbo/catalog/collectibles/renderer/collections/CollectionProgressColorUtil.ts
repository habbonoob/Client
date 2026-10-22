import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CollectionProgressColorUtil {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.collections::CollectionProgressColorUtil'); }

    public static NO_DISPLAY: number = 0;
    private static _SafeStr_7316: number = 1;
    private static _SafeStr_5672: number = 50;
    private static endPercentage: number = 99;
    private static startColor: number = 12278528;
    private static midColor: number = 12952320;
    private static endColor: number = 8958976;
    private static notStartedColor: number = 8912917;
    private static completionColor: number = 37130;

    constructor() {
    }

    public static getColor(param1: number, param2: number): number {
        let _loc4_: number = NaN;
        if (param1 == param2) {
            return CollectionProgressColorUtil.completionColor;
        }
        if (param1 == 0) {
            return CollectionProgressColorUtil.notStartedColor;
        }
        let _loc3_: number = param1 * 100 / param2;
        if (_loc3_ <= CollectionProgressColorUtil._SafeStr_5672) {
            _loc4_ = (_loc3_ - CollectionProgressColorUtil._SafeStr_7316) / (CollectionProgressColorUtil._SafeStr_5672 - CollectionProgressColorUtil._SafeStr_7316);
            return CollectionProgressColorUtil.interpolate(CollectionProgressColorUtil.startColor, CollectionProgressColorUtil.midColor, _loc4_);
        }
        _loc4_ = (_loc3_ - CollectionProgressColorUtil._SafeStr_5672) / (CollectionProgressColorUtil.endPercentage - CollectionProgressColorUtil._SafeStr_5672);
        return CollectionProgressColorUtil.interpolate(CollectionProgressColorUtil.midColor, CollectionProgressColorUtil.endColor, _loc4_);
    }

    private static interpolate(param1: number, param2: number, param3: number): number {
        let _loc5_: any = CollectionProgressColorUtil.hexToRGB(param1);
        let _loc4_: any = CollectionProgressColorUtil.hexToRGB(param2);
        let _loc6_: any = { "r": _loc5_.r + param3 * (_loc4_.r - _loc5_.r), "g": _loc5_.g + param3 * (_loc4_.g - _loc5_.g), "b": _loc5_.b + param3 * (_loc4_.b - _loc5_.b) };
        return CollectionProgressColorUtil.RGBToHex(Number(_loc6_.r), Number(_loc6_.g), Number(_loc6_.b));
    }

    private static hexToRGB(param1: number): any {
        return { "r": param1 >> 16 & 0xFF, "g": param1 >> 8 & 0xFF, "b": param1 & 0xFF };
    }

    private static RGBToHex(param1: number, param2: number, param3: number): number {
        return (param1 << 16 | param2 << 8 | param3) >>> 0;
    }
}
