import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';

export class Util {
    static { registerClassName(this, 'com.sulake.habbo.inventory::Util'); }

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
                        Util.disableSection(_loc6_, param2);
                    }
                } else if (isIWindowContainer(param1)) {
                    _loc3_ = isIWindowContainer(param1) ? param1 : null;
                    _loc4_ = 0;
                    while (_loc4_ < _loc3_.numChildren) {
                        Util.disableSection(_loc3_.getChildAt(_loc4_), param2);
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

    public static moveAllChildrenToColumn(param1: IWindowContainer, param2: number, param3: boolean = false, param4: number = 0): void {
        let _loc5_: number = 0;
        let _loc6_: IWindow = null;
        _loc5_ = 0;
        while (_loc5_ < param1.numChildren) {
            _loc6_ = param1.getChildAt(_loc5_);
            if (_loc6_ != null && _loc6_.visible && _loc6_.height > 0) {
                if (param4 < _loc6_.y && param3) {
                    param4 = _loc6_.y;
                } else {
                    _loc6_.y = param4;
                }
                param4 += _loc6_.height + param2;
            }
            _loc5_++;
        }
    }

    public static getLowestPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible && _loc4_.height > 0) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    constructor() {
    }
}
