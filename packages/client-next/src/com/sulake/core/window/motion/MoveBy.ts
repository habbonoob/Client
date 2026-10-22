import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { MoveTo } from '@/com/sulake/core/window/motion/MoveTo';

export class MoveBy extends MoveTo {
    static { registerClassName(this, 'com.sulake.core.window.motion::MoveBy'); }

    constructor(param1: IWindow, param2: number, param3: number, param4: number) {
        super(param1, param2, param3, param4);
    }

    public override start(): void {
        this._SafeStr_4258 = this.target.x + this._SafeStr_4258;
        this._SafeStr_4759 = this.target.y + this._SafeStr_4759;
        super.start();
    }
}
