import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ITouchAwareWindow } from '@/com/sulake/core/window/utils/tablet/ITouchAwareWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ContainerButtonController } from '@/com/sulake/core/window/Classes.group';
import { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { IDropListItemWindow } from '@/com/sulake/core/window/components/IDropListItemWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';

export class DropListItemController extends ContainerButtonController implements IDropListItemWindow, ITouchAwareWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::DropListItemController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public get menu(): IDropMenuWindow {
        let _loc1_: IWindow = this.parent;
        while (_loc1_) {
            if (isIDropMenuWindow(_loc1_)) {
                break;
            }
            _loc1_ = _loc1_.parent;
        }
        return isIDropMenuWindow(_loc1_) ? _loc1_ : null;
    }

    public get value(): IWindow {
        return this.getChildAt(0);
    }

    public set value(param1: IWindow) {
        let _loc2_: IWindow = this.getChildAt(0);
        if (_loc2_ != param1) {
            this.removeChildAt(0);
            if (param1) {
                this.addChild(param1);
            }
        }
    }

    get [IDropListItemWindow](): true {
        return true;
    }

    get [IButtonWindow](): true {
        return true;
    }
}
