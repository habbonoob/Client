import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Motion } from '@/com/sulake/core/window/motion/Motion';

export class Callback extends Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Callback'); }

    declare protected _callback: (...args: any[]) => any;

    constructor(param1: (...args: any[]) => any) {
        super(null);
        this._callback = param1;
    }

    public override get running(): boolean {
        return this._running && this._callback != null;
    }

    public override tick(param1: number): void {
        super.tick(param1);
        if (this._callback != null) {
            this._callback(this);
            this._callback = null;
        }
    }
}
