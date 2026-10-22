import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { Motion } from '@/com/sulake/core/window/motion/Motion';

export class Dispose extends Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Dispose'); }

    constructor(param1: IWindow) {
        super(param1);
    }

    public override tick(param1: number): void {
        super.tick(param1);
        if (this.target && !this.target.disposed) {
            this.target.dispose();
            this.target = null;
        }
    }
}
