import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { Interval } from '@/com/sulake/core/window/motion/Interval';

export class ResizeTo extends Interval {
    static { registerClassName(this, 'com.sulake.core.window.motion::ResizeTo'); }

    declare protected _SafeStr_5874: number;
    static { (this.prototype as any)._SafeStr_5874 = NaN; }

    declare protected _SafeStr_5875: number;
    static { (this.prototype as any)._SafeStr_5875 = NaN; }

    declare protected _SafeStr_6787: number;
    static { (this.prototype as any)._SafeStr_6787 = NaN; }

    declare protected _SafeStr_6709: number;
    static { (this.prototype as any)._SafeStr_6709 = NaN; }

    declare protected _SafeStr_5963: number;
    static { (this.prototype as any)._SafeStr_5963 = NaN; }

    declare protected _SafeStr_6937: number;
    static { (this.prototype as any)._SafeStr_6937 = NaN; }

    constructor(param1: IWindow, param2: number, param3: number, param4: number) {
        super(param1, param2);
        this._SafeStr_6787 = param3;
        this._SafeStr_6709 = param4;
    }

    public override start(): void {
        super.start();
        this._SafeStr_5874 = this.target.width;
        this._SafeStr_5875 = this.target.height;
        this._SafeStr_5963 = this._SafeStr_6787 - this._SafeStr_5874;
        this._SafeStr_6937 = this._SafeStr_6709 - this._SafeStr_5875;
    }

    public override update(param1: number): void {
        this.target.width = this._SafeStr_5874 + this._SafeStr_5963 * param1 | 0;
        this.target.height = this._SafeStr_5875 + this._SafeStr_6937 * param1 | 0;
    }
}
