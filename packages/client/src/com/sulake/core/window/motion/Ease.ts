import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Interval } from '@/com/sulake/core/window/motion/Interval';

export class Ease extends Interval {
    static { registerClassName(this, 'com.sulake.core.window.motion::Ease'); }

    constructor(param1: Interval) {
        super(param1.target, param1.duration);
        this._SafeStr_4756 = param1;
    }

    declare protected _SafeStr_4756: Interval;

    public override start(): void {
        super.start();
        this._SafeStr_4756.start();
    }

    public override update(param1: number): void {
        super.update(param1);
        this._SafeStr_4756.update(param1);
    }

    public override stop(): void {
        super.stop();
        this._SafeStr_4756.stop();
    }
}
