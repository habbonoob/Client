import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMouseScalingService } from '@/com/sulake/core/window/services/IMouseScalingService';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { WindowMouseOperator } from '@/com/sulake/core/window/Classes.group';

export class WindowMouseScaler extends WindowMouseOperator implements IMouseScalingService {
    static { registerClassName(this, 'com.sulake.core.window.services::WindowMouseScaler'); }

    constructor(param1: DisplayObject) {
        super(param1);
    }

    public override operate(param1: number, param2: number): void {
        let _loc3_: number = 0;
        if (!this._window.disposed) {
            _loc3_ = (this._flags & 0x1000 ? param1 - this._mouse.x : 0) | 0;
            let _loc4_: number = (this._flags & 0x2000 ? param2 - this._mouse.y : 0) | 0;
            this._window.scale(_loc3_, _loc4_);
        }
    }
}
