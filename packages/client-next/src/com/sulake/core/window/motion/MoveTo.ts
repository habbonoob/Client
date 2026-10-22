import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { Interval } from '@/com/sulake/core/window/motion/Interval';

export class MoveTo extends Interval {
    static { registerClassName(this, 'com.sulake.core.window.motion::MoveTo'); }

    declare protected _SafeStr_5559: number;
    static { (this.prototype as any)._SafeStr_5559 = NaN; }

    declare protected _SafeStr_5579: number;
    static { (this.prototype as any)._SafeStr_5579 = NaN; }

    declare protected _SafeStr_4258: number;
    static { (this.prototype as any)._SafeStr_4258 = NaN; }

    declare protected _SafeStr_4759: number;
    static { (this.prototype as any)._SafeStr_4759 = NaN; }

    declare protected _SafeStr_4082: number;
    static { (this.prototype as any)._SafeStr_4082 = NaN; }

    declare protected _SafeStr_4241: number;
    static { (this.prototype as any)._SafeStr_4241 = NaN; }

    constructor(param1: IWindow, param2: number, param3: number, param4: number) {
        super(param1, param2);
        this._SafeStr_4258 = param3;
        this._SafeStr_4759 = param4;
    }

    public override start(): void {
        super.start();
        this._SafeStr_5559 = this.target.x;
        this._SafeStr_5579 = this.target.y;
        this._SafeStr_4082 = this._SafeStr_4258 - this._SafeStr_5559;
        this._SafeStr_4241 = this._SafeStr_4759 - this._SafeStr_5579;
    }

    public override update(param1: number): void {
        this.target.x = this._SafeStr_5559 + this._SafeStr_4082 * param1 | 0;
        this.target.y = this._SafeStr_5579 + this._SafeStr_4241 * param1 | 0;
    }
}
