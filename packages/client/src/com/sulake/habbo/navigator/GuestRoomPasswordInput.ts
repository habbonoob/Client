import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IPasswordFieldWindow } from '@/com/sulake/core/window/components/IPasswordFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIPasswordFieldWindow } from '@/com/sulake/core/window/components/IPasswordFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class GuestRoomPasswordInput {
    static { registerClassName(this, 'com.sulake.habbo.navigator::GuestRoomPasswordInput'); }

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _window: IFrameWindow;

    declare private _SafeStr_3843: GuestRoomData;

    public show(param1: GuestRoomData, param2: Point = null): void {
        this._SafeStr_3843 = param1;
        if (this._SafeStr_3843 == null) {
            return;
        }
        this.createWindow();
        if (this._window == null) {
            return;
        }
        if (param2 != null) {
            param2.offset(-this._window.width / 2, -this._window.height / 2);
            this._window.setGlobalPosition(param2);
        }
        this._window.visible = true;
        this._window.activate();
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName("room_name"), isITextWindow);
        if (_loc3_ != null && param1 != null) {
            _loc3_.text = param1.roomName;
        }
        let _loc4_: IPasswordFieldWindow = asGuarded(this._window.findChildByName("password_input"), isIPasswordFieldWindow);
        if (_loc4_ != null) {
            _loc4_.text = "";
        }
        this.setInfoText("${navigator.password.info}");
    }

    public showRetry(): void {
        this.show(this._SafeStr_3843);
        this.setInfoText("${navigator.password.retryinfo}");
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
        }
        this._window = null;
        this._navigator = null;
        this._SafeStr_3843 = null;
    }

    private createWindow(): void {
        if (this._window != null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._navigator.assets.getAssetByName("password_input_xml"), XmlAsset);
        this._window = asGuarded(this._navigator.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 2), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        let _loc4_: IButtonWindow = asGuarded(this._window.findChildByName("try"), isIButtonWindow);
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onTry);
        }
        let _loc3_: IWindow = this._window.findChildByName("cancel_region");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.close);
        }
        let _loc1_: IWindow = this._window.findChildByTag("close");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.close);
        }
    }

    private setInfoText(param1: string): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("info"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.caption = param1;
    }

    private onTry = (param1: WindowMouseEvent): void => {
        let _loc3_: IPasswordFieldWindow = asGuarded(this._window.findChildByName("password_input"), isIPasswordFieldWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: string = _loc3_.text;
        this._navigator.goToRoom(this._SafeStr_3843.flatId, true, _loc2_);
        this.hide();
    };

    private close = (param1: WindowMouseEvent): void => {
        if (this._window == null) {
            return;
        }
        this._window.dispose();
        this._window = null;
    };

    private hide(param1: WindowMouseEvent = null): void {
        if (this._window == null) {
            return;
        }
        this._window.visible = false;
    }
}
