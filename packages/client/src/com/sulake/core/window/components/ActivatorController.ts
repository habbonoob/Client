import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ContainerController } from '@/com/sulake/core/window/Classes.group';
import { isIWindow } from '@/com/sulake/core/window/IWindow';

export class ActivatorController extends ContainerController {
    static { registerClassName(this, 'com.sulake.core.window.components::ActivatorController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    declare protected _SafeStr_3572: IWindow;

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (param2.type == "WE_CHILD_ACTIVATED") {
            this.setActiveChild(isIWindow(param1) ? param1 : null);
        } else if (param2.type == "WE_PARENT_ACTIVATED") {
            return true;
        }
        return super.update(param1, param2);
    }

    public getActiveChild(): IWindow {
        return this._SafeStr_3572;
    }

    public setActiveChild(param1: IWindow): IWindow {
        if (param1.parent != this) {
            do {
                param1 = param1.parent;
                if (param1 == null) {
                    throw new Error("Window passed to activator is not a child!");
                }
            } while (param1.parent != this);
        }
        let _loc2_: IWindow = this._SafeStr_3572;
        if (this._SafeStr_3572 != param1) {
            if (this._SafeStr_3572 != null) {
                if (!this._SafeStr_3572.disposed) {
                    this._SafeStr_3572.deactivate();
                }
            }
            this._SafeStr_3572 = param1;
            if (this.getChildIndex(param1) != this.numChildren - 1) {
                this.setChildIndex(param1, this.numChildren - 1);
            }
        }
        return _loc2_;
    }
}
