import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class ConfirmDialogView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::ConfirmDialogView'); }

    declare private _window: IFrameWindow;

    declare private _SafeStr_5909: (...args: any[]) => any;

    constructor(param1: IHabboTransitionalNavigator, param2: (...args: any[]) => any, param3: string, param4: string) {
        this._window = castGuarded(param1.getXmlWindow("ros_confirm"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._SafeStr_5909 = param2;
        this._window.findChildByTag("close").addEventListener("WME_CLICK", this.onCancel);
        this._window.findChildByName("ok").addEventListener("WME_CLICK", this.onOk);
        this._window.caption = param3;
        this._window.findChildByName("message").caption = param4;
        let _loc5_: Rectangle = Util.getLocationRelativeTo(this._window.desktop, this._window.width, this._window.height);
        this._window.x = _loc5_.x | 0;
        this._window.y = _loc5_.y | 0;
        this._window.visible = true;
        this._window.activate();
    }

    private onCancel = (param1: WindowMouseEvent): void => {
        this.dispose();
    };

    private onOk = (param1: WindowMouseEvent): void => {
        this._SafeStr_5909();
        this.dispose();
    };

    public dispose(): void {
        if (this._window != null) {
            this._window.destroy();
            this._window = null;
        }
        this._SafeStr_5909 = null;
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    get [IDisposable](): true {
        return true;
    }
}
