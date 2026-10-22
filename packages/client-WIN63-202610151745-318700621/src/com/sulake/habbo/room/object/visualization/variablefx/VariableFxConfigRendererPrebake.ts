import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import type { VariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';
import { isVariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';

export class VariableFxConfigRendererPrebake {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxConfigRendererPrebake'); }

    constructor() {
    }

    public static getOrCreate(param1: VariableFxConfigData, param2: (...args: any[]) => any): VariableFxRendererPrebake {
        if (param1._SafeStr_14655 != null) {
            return param1._SafeStr_14655;
        }
        param1._SafeStr_14655 = asGuarded(param2(), isVariableFxRendererPrebake);
        return param1._SafeStr_14655;
    }

    public static disposeConfigPrebake(param1: VariableFxConfigData): void {
        if (param1._SafeStr_14655 != null) {
            param1._SafeStr_14655.dispose();
            param1._SafeStr_14655 = null;
        }
    }
}
