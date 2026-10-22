import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIChildWindowHost } from '@/com/sulake/core/window/utils/IChildWindowHost';

export class WindowUtils {
    static { registerClassName(this, 'com.sulake.core.window.utils::WindowUtils'); }

    constructor() {
    }

    public static disableButton(param1: IWindow, param2: boolean): void {
        if (param2) {
            param1.disable();
        } else {
            param1.enable();
        }
    }

    private static getBlend(param1: IWindow): number {
        if (isIBackgroundWindow(param1)) {
            return (param1.color >>> 24 & 0xFF) / 255;
        }
        return param1.blend;
    }

    private static setBlend(param1: IWindow, param2: number): void {
        let _loc3_: any = 0;
        if (isIBackgroundWindow(param1)) {
            _loc3_ = Math.max(0, Math.min(255, param2 * 255 | 0)) >>> 0;
            param1.color = (param1.color & 0xFFFFFF | _loc3_ << 24) >>> 0;
        } else {
            param1.blend = param2;
        }
    }

    public static disableSection(param1: IWindow, param2: boolean = true, param3: number = 0.5): void {
        let _loc9_: string = null;
        let _loc10_: number = NaN;
        let _loc5_: IWindowContainer = null;
        let _loc7_: number = 0;
        if (param1.tags.indexOf("DO_NOT_DISABLE") != -1) {
            return;
        }
        let _loc4_: number = -1;
        for (_loc9_ of param1.tags ?? []) {
            if (_loc9_.indexOf("BLEND=") == 0) {
                _loc4_ = Number(_loc9_.substring(6, _loc9_.length));
            }
        }
        if (_loc4_ == -1) {
            _loc4_ = WindowUtils.getBlend(param1);
            _loc9_ = "BLEND=" + _loc4_;
            if (param1.tags.indexOf(_loc9_) == -1) {
                param1.tags.push(_loc9_);
            }
        }
        if (param2 && param1.tags.indexOf("INVIS_ON_DISABLE") != -1) {
            _loc10_ = 0;
        } else {
            _loc10_ = param2 ? _loc4_ * param3 : _loc4_;
        }
        let _loc6_: boolean = param1.tags.indexOf("#icon") != -1;
        let _loc8_: boolean = !param1.getParamFlag(16);
        if (!(isIButtonWindow(param1))) {
            if (isIWindowContainer(param1) || isIItemListWindow(param1) || isISelectorWindow(param1)) {
                if (isIChildWindowHost(param1)) {
                    for (const _loc11_ of (isIChildWindowHost(param1) ? param1 : null).children ?? []) {
                        WindowUtils.disableSection(_loc11_, param2, _loc8_ ? 1 : param3);
                    }
                } else if (isIWindowContainer(param1)) {
                    _loc5_ = isIWindowContainer(param1) ? param1 : null;
                    _loc7_ = 0;
                    while (_loc7_ < _loc5_.numChildren) {
                        WindowUtils.disableSection(_loc5_.getChildAt(_loc7_), param2, _loc8_ ? 1 : param3);
                        _loc7_++;
                    }
                }
                if (isIBorderWindow(param1) || isIBackgroundWindow(param1) || _loc8_) {
                    WindowUtils.setBlend(param1, _loc10_);
                }
            } else if (!_loc6_) {
                WindowUtils.setBlend(param1, _loc10_);
            }
        }
        if (param2) {
            param1.disable();
        } else {
            param1.enable();
        }
    }
}
