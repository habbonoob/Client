import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Motion } from '@/com/sulake/core/window/motion/Motion';

export class Interval extends Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Interval'); }

    constructor(param1: IWindow, param2: number) {
        super(param1);
        this._complete = false;
        this._duration = param2;
    }

    declare private _SafeStr_6328: number;
    static { (this.prototype as any)._SafeStr_6328 = 0; }

    declare private _duration: number;
    static { (this.prototype as any)._duration = 0; }

    public get duration(): number {
        return this._duration;
    }

    public override start(): void {
        super.start();
        this._complete = false;
        this._SafeStr_6328 = getTimer();
    }

    public override tick(param1: number): void {
        let _loc2_: number = (param1 - this._SafeStr_6328) / this._duration;
        if (_loc2_ < 1) {
            this.update(_loc2_);
        } else {
            this.update(1);
            this._complete = true;
        }
    }
}
