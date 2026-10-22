import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { Interval } from '@/com/sulake/core/window/motion/Interval';

export class JumpBy extends Interval {
    static { registerClassName(this, 'com.sulake.core.window.motion::JumpBy'); }

    constructor(param1: IWindow, param2: number, param3: number, param4: number, param5: number, param6: number) {
        super(param1, param2);
        this._SafeStr_4082 = param3;
        this._SafeStr_4241 = param4;
        this._height = -param5;
        this._SafeStr_6125 = param6;
    }

    declare protected _SafeStr_5559: number;
    static { (this.prototype as any)._SafeStr_5559 = 0; }

    declare protected _SafeStr_5579: number;
    static { (this.prototype as any)._SafeStr_5579 = 0; }

    declare protected _SafeStr_4082: number;
    static { (this.prototype as any)._SafeStr_4082 = NaN; }

    declare protected _SafeStr_4241: number;
    static { (this.prototype as any)._SafeStr_4241 = NaN; }

    declare protected _height: number;
    static { (this.prototype as any)._height = NaN; }

    declare protected _SafeStr_6125: number;
    static { (this.prototype as any)._SafeStr_6125 = 0; }

    public override start(): void {
        super.start();
        this._SafeStr_5559 = this.target.x;
        this._SafeStr_5579 = this.target.y;
    }

    public override update(param1: number): void {
        super.update(param1);
        this.target.x = this._SafeStr_5559 + this._SafeStr_4082 * param1 | 0;
        this.target.y = this._SafeStr_5579 + this._height * Math.abs(Math.sin(param1 * 3.141592653589793 * this._SafeStr_6125)) + this._SafeStr_4241 * param1 | 0;
    }
}
