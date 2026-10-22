import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Interval } from '@/com/sulake/core/window/motion/Interval';
import { Ease } from '@/com/sulake/core/window/motion/Ease';

export class EaseRate extends Ease {
    static { registerClassName(this, 'com.sulake.core.window.motion::EaseRate'); }

    constructor(param1: Interval, param2: number) {
        super(param1);
        this._SafeStr_6142 = param2;
    }

    declare protected _SafeStr_6142: number;
    static { (this.prototype as any)._SafeStr_6142 = NaN; }
}
