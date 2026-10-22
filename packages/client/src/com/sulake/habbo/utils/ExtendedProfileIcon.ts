import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ExtendedProfileIcon {
    static { registerClassName(this, 'com.sulake.habbo.utils::ExtendedProfileIcon'); }

    public static setup(param1: IWindowContainer, param2: (...args: any[]) => any): void {
        let _loc3_: IWindow = param1.findChildByName("user_info_region");
        _loc3_.addEventListener("WME_OVER", ExtendedProfileIcon.onUserInfoMouseOver);
        _loc3_.addEventListener("WME_OUT", ExtendedProfileIcon.onUserInfoMouseOut);
        _loc3_.addEventListener("WME_CLICK", param2);
    }

    public static setUserInfoState(param1: boolean, param2: IWindowContainer): void {
        param2.findChildByName("icon_eye_off").visible = !param1;
        param2.findChildByName("icon_eye_over").visible = param1;
    }

    public static onEntry(param1: WindowEvent, param2: IWindow): void {
        if (param1.type == "WME_OVER") {
            ExtendedProfileIcon.setUserInfoState(true, castGuarded(param2.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        } else if (param1.type == "WME_OUT") {
            ExtendedProfileIcon.setUserInfoState(false, castGuarded(param2.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
        }
    }

    private static onUserInfoMouseOver(param1: WindowEvent): void {
        let _loc2_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        ExtendedProfileIcon.setUserInfoState(true, _loc2_);
    }

    private static onUserInfoMouseOut(param1: WindowEvent): void {
        let _loc2_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        ExtendedProfileIcon.setUserInfoState(false, _loc2_);
    }

    constructor() {
    }
}
