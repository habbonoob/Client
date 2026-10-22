import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class OpenedToWebPopup {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::OpenedToWebPopup'); }

    declare private _friendList: HabboFriendList;

    declare private _SafeStr_2763: IWindowContainer;

    declare private _SafeStr_2458: Timer;

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
    }

    public show(param1: number, param2: number): void {
        if (this._SafeStr_2763 != null) {
            this.close(null);
        }
        this._SafeStr_2763 = this.getOpenedToWebAlert();
        if (this._SafeStr_2458 != null) {
            this._SafeStr_2458.stop();
        }
        this._SafeStr_2458 = new Timer(2000, 1);
        this._SafeStr_2458.addEventListener("timer", this.close);
        this._SafeStr_2458.start();
        this._SafeStr_2763.x = param1;
        this._SafeStr_2763.y = param2;
    }

    private close = (param1: Event): void => {
        this._SafeStr_2763.destroy();
        this._SafeStr_2763 = null;
    };

    private getOpenedToWebAlert(): IWindowContainer {
        let _loc1_: IWindowContainer = castGuarded(this._friendList.getXmlWindow("opened_to_web_popup"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._friendList.refreshButton(_loc1_, "opened_to_web", true, null, 0);
        return _loc1_;
    }
}
