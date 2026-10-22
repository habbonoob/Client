import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxColorType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxColorType';

export class VariableFxSegmentedProgress {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxSegmentedProgress'); }

    public static readonly _SafeStr_14665: number = 0;
    public static readonly MAX_SEGMENTS: number = 100;

    constructor() {
    }

    public static resolveSegmentOverride(param1: UtilsMap): any {
        let _loc2_: number = NaN;
        let _loc4_: number = 0;
        let _loc3_: string = VariableFxColorType.readExtra(param1, "segments");
        if (_loc3_ == null || _loc3_.length == 0) {
            return null;
        }
        _loc2_ = Number(_loc3_);
        if (!isFinite(_loc2_)) {
            return null;
        }
        _loc4_ = _loc2_ | 0;
        if (_loc4_ <= 0) {
            return null;
        }
        return Math.min(100, _loc4_);
    }

    public static resolveSegmentCount(param1: string, param2: UtilsMap, param3: (...args: any[]) => any): number {
        let _loc4_: any = VariableFxSegmentedProgress.resolveSegmentOverride(param2);
        return _loc4_ == null ? param3(param1) | 0 : _loc4_ | 0;
    }
}
