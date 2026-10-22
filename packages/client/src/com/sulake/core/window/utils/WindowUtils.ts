import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';

export class WindowUtils {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowUtils'); }

    public static disableButton(param1: IWindow, param2: boolean): void {
        if (param2) {
            param1.disable();
        } else {
            param1.enable();
        }
    }

    public static disableSection(param1: IWindow, param2: boolean = true): void {
        let _loc3_: IWindowContainer = null;
        let _loc4_: number = 0;
        if (param1.tags.indexOf("DO_NOT_DISABLE") != -1) {
            return;
        }
        let _loc5_: number = param2 ? 0.5 : 1;
        if (!(isIButtonWindow(param1))) {
            if (isIWindowContainer(param1) || isIItemListWindow(param1) || isISelectorWindow(param1)) {
                if (isIChildWindowHost(param1)) {
                    for (const _loc6_ of (isIChildWindowHost(param1) ? param1 : null).children ?? []) {
                        WindowUtils.disableSection(_loc6_, param2);
                    }
                } else if (isIWindowContainer(param1)) {
                    _loc3_ = isIWindowContainer(param1) ? param1 : null;
                    _loc4_ = 0;
                    while (_loc4_ < _loc3_.numChildren) {
                        WindowUtils.disableSection(_loc3_.getChildAt(_loc4_), param2);
                        _loc4_++;
                    }
                }
            } else {
                param1.blend = _loc5_;
            }
        }
        if (param2) {
            param1.disable();
        } else {
            param1.enable();
        }
    }

    constructor() {
    }
}
