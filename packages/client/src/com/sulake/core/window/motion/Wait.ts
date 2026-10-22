import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Motion } from '@/com/sulake/core/window/motion/Motion';

export class Wait extends Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Wait'); }

    constructor(param1: number) {
        super(null);
        this._SafeStr_6132 = param1;
    }

    declare private _SafeStr_6328: number;
    static { (this.prototype as any)._SafeStr_6328 = 0; }

    declare private _SafeStr_6132: number;
    static { (this.prototype as any)._SafeStr_6132 = 0; }

    public override get running(): boolean {
        return this._running;
    }

    public override start(): void {
        super.start();
        this._complete = false;
        this._SafeStr_6328 = getTimer();
    }

    public override tick(param1: number): void {
        this._complete = param1 - this._SafeStr_6328 >= this._SafeStr_6132;
        if (this._complete) {
            this.stop();
        }
        super.tick(param1);
    }
}
