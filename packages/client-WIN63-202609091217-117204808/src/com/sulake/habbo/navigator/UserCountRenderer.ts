import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class UserCountRenderer {
    static { registerClassName(this, 'com.sulake.habbo.navigator::UserCountRenderer'); }

    public static readonly USERCOUNT_ELEMENT_NAME: string = "usercount";

    declare private _navigator: IHabboTransitionalNavigator;

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    public dispose(): void {
        this._navigator = null;
    }

    public refreshUserCount(param1: number, param2: IWindowContainer, param3: number, param4: string, param5: number, param6: number): void {
        let _loc9_: IWindowContainer = castGuarded(param2.findChildByName("usercount"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc9_ == null) {
            _loc9_ = castGuarded(this._navigator.getXmlWindow("grs_usercount"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc9_.name = "usercount";
            _loc9_.x = param5;
            _loc9_.y = param6;
            param2.addChild(_loc9_);
        }
        castGuarded(_loc9_, isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow").toolTipCaption = param4;
        let _loc7_: ITextWindow = castGuarded(_loc9_.findChildByName("txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc7_.text = "" + param3;
        let _loc8_: string = this.getBgColor(param1, param3);
        this.refreshBg(_loc9_, _loc8_);
        _loc9_.visible = true;
    }

    private getBgColor(param1: number, param2: number): string {
        if (param2 == 0) {
            return "b";
        }
        if (this.isOverBgColorLimit(param1, param2, "red", 92)) {
            return "r";
        }
        if (this.isOverBgColorLimit(param1, param2, "orange", 80)) {
            return "o";
        }
        if (this.isOverBgColorLimit(param1, param2, "yellow", 50)) {
            return "y";
        }
        return "g";
    }

    private isOverBgColorLimit(param1: number, param2: number, param3: string, param4: number): boolean {
        let _loc7_: string = "navigator.colorlimit." + param3;
        let _loc6_: number = this._navigator.getInteger(_loc7_, param4);
        let _loc5_: number = param1 * _loc6_ / 100 | 0;
        return param2 >= _loc5_;
    }

    private refreshBg(param1: IWindowContainer, param2: string): void {
        let _loc3_: string = null;
        let _loc4_: IBitmapWrapperWindow = castGuarded(param1.findChildByName("usercount_bg"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        if (_loc4_.tags[0] != param2) {
            _loc4_.tags.splice(0, _loc4_.tags.length);
            _loc4_.tags.push(param2);
            _loc3_ = "usercount_fixed_" + param2;
            _loc4_.bitmap = this._navigator.getButtonImage(_loc3_);
            _loc4_.disposesBitmap = false;
            _loc4_.invalidate();
        }
    }

    private refreshIcon(param1: IWindowContainer, param2: string, param3: boolean): void {
        this._navigator.refreshButton(param1, param2, param3, null, 0);
    }
}
