import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Interval } from '@/com/sulake/core/window/motion/Interval';
import { EaseRate } from '@/com/sulake/core/window/motion/EaseRate';

export class EaseOut extends EaseRate {
    static { registerClassName(this, 'com.sulake.core.window.motion::EaseOut'); }

    constructor(param1: Interval, param2: number) {
        super(param1, param2);
    }

    public override update(param1: number): void {
        this._SafeStr_4756.update(Math.pow(param1, 1 / this._SafeStr_6142));
    }
}
