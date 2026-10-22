import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMouseDraggingService } from '@/com/sulake/core/window/services/IMouseDraggingService';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { WindowMouseOperator } from '@/com/sulake/core/window/Classes.group';

export class WindowMouseDragger extends WindowMouseOperator implements IMouseDraggingService {
    static { registerClassName(this, 'com.sulake.core.window.services::WindowMouseDragger'); }

    constructor(param1: DisplayObject) {
        super(param1);
    }

    public override operate(param1: number, param2: number): void {
        this._mouse.x = param1;
        this._mouse.y = param2;
        this.getMousePositionRelativeTo(this._window, this._mouse, this._SafeStr_2472);
        this._window.offset(this._SafeStr_2472.x - this._offset.x, this._SafeStr_2472.y - this._offset.y);
    }
}
