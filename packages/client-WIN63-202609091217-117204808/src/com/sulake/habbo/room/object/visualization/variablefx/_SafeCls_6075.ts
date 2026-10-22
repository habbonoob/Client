import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';
import type { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { is_SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';

export class _SafeCls_6075 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6075'); }

    constructor() {
    }

    public static getOrCreate(param1: VariableFxConfigData, param2: (...args: any[]) => any): _SafeCls_6078 {
        if (param1._SafeStr_14484 != null) {
            return param1._SafeStr_14484;
        }
        param1._SafeStr_14484 = asGuarded(param2(), is_SafeCls_6078);
        return param1._SafeStr_14484;
    }

    public static disposeConfigPrebake(param1: VariableFxConfigData): void {
        if (param1._SafeStr_14484 != null) {
            param1._SafeStr_14484.dispose();
            param1._SafeStr_14484 = null;
        }
    }
}
