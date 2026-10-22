import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { Interval } from '@/com/sulake/core/window/motion/Interval';

export class DropBounce extends Interval {
    static { registerClassName(this, 'com.sulake.core.window.motion::DropBounce'); }

    constructor(param1: IWindow, param2: number, param3: number) {
        super(param1, param2);
        this._height = param3;
    }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _offset: number;
    static { (this.prototype as any)._offset = 0; }

    public override start(): void {
        super.start();
        this._offset = this.target.y;
        this.target.y = this._offset - this._height;
    }

    public override update(param1: number): void {
        super.update(param1);
        this.target.y = this._offset - this._height + this.getBounceOffset(param1) * this._height | 0;
    }

    public override stop(): void {
        this.target.y = this._offset;
        super.stop();
    }

    protected getBounceOffset(param1: number): number {
        if (param1 < 0.364) {
            return 7.5625 * param1 * param1;
        }
        if (param1 < 0.727) {
            param1 -= 0.545;
            return 7.5625 * param1 * param1 + 0.75;
        }
        if (param1 < 0.909) {
            param1 -= 0.9091;
            return 7.5625 * param1 * param1 + 0.9375;
        }
        param1 -= 0.955;
        return 7.5625 * param1 * param1 + 0.984375;
    }
}
