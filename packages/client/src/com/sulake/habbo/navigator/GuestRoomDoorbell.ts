import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
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
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { QuitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/QuitMessageComposer';

export class GuestRoomDoorbell {
    static { registerClassName(this, 'com.sulake.habbo.navigator::GuestRoomDoorbell'); }

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _window: IFrameWindow;

    declare private _SafeStr_3843: GuestRoomData;

    declare private _SafeStr_5869: boolean;
    static { (this.prototype as any)._SafeStr_5869 = false; }

    public show(param1: GuestRoomData, param2: Point = null, param3: boolean = false): void {
        if (param1 == null) {
            return;
        }
        this._SafeStr_3843 = param1;
        this._SafeStr_5869 = param3;
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
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName("room_name"), isITextWindow);
        if (_loc4_ != null) {
            _loc4_.text = param1.roomName;
        }
        if (this._SafeStr_5869) {
            this.setText("info", "${navigator.doorbell.waiting}");
            this.setText("cancel", "${navigator.doorbell.button.cancel.entering}");
            this.showButton("ring", false);
        } else {
            this.setText("info", "${navigator.doorbell.info}");
            this.setText("cancel", "${generic.cancel}");
            this.showButton("ring", true);
        }
    }

    public showWaiting(): void {
        this.show(this._SafeStr_3843, null, true);
    }

    public showNoAnswer(): void {
        if (this._window == null) {
            return;
        }
        this._window.visible = true;
        this._window.activate();
        this.setText("info", "${navigator.doorbell.no.answer}");
        this.showButton("ring", false);
    }

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
        }
        this._window = null;
        this._navigator = null;
        this._SafeStr_3843 = null;
    }

    public hide(): void {
        if (this._window == null) {
            return;
        }
        this._window.visible = false;
    }

    private showButton(param1: string, param2: boolean): void {
        let _loc3_: IButtonWindow = asGuarded(this._window.findChildByName(param1), isIButtonWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.visible = param2;
    }

    private createWindow(): void {
        if (this._window != null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._navigator.assets.getAssetByName("doorbell_xml"), XmlAsset);
        this._window = asGuarded(this._navigator.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML), 2), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        let _loc4_: IButtonWindow = asGuarded(this._window.findChildByName("ring"), isIButtonWindow);
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.ringDoorbell);
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

    private setText(param1: string, param2: string): void {
        if (this._window == null) {
            return;
        }
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.caption = param2;
    }

    private ringDoorbell = (param1: WindowMouseEvent): void => {
        this._navigator.goToRoom(this._SafeStr_3843.flatId, true);
        this.hide();
    };

    private close = (param1: WindowMouseEvent): void => {
        if (this._window == null) {
            return;
        }
        if (this._SafeStr_5869 && this._navigator != null) {
            this._navigator.send(new QuitMessageComposer());
        }
        this._window.dispose();
        this._window = null;
    };
}
