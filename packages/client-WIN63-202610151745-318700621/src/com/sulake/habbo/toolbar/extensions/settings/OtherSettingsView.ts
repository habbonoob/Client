import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ResetPhoneNumberStateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/ResetPhoneNumberStateMessageComposer';
import { SetIgnoreRoomInvitesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetIgnoreRoomInvitesMessageComposer';
import { SetOnlineIndicatorPreferenceMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetOnlineIndicatorPreferenceMessageComposer';
import { SetRoomCameraPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetRoomCameraPreferencesMessageComposer';

export class OtherSettingsView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.settings::OtherSettingsView'); }

    declare private _window: IWindowContainer;

    declare private _toolbar: HabboToolbar;

    declare private _SafeStr_14253: IDropMenuWindow;

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this.createWindow();
    }

    public dispose(): void {
        if (this._window == null) {
            return;
        }
        if (this._SafeStr_14253 != null) {
            this._SafeStr_14253.removeEventListener("WE_SELECTED", this.onOnlineIndicatorPreferenceChanged);
            this._SafeStr_14253 = null;
        }
        this._window.dispose();
        this._window = null;
    }

    private createWindow(): void {
        let _loc3_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("me_menu_other_settings_xml"), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        this._window.procedure = this.onButtonClicked;
        castGuarded(this._window.findChildByName("ignore_room_invites_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.messenger.getRoomInvitesIgnored();
        castGuarded(this._window.findChildByName("disable_wired_whisper_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.roomEvents.wiredWhisperDisabled;
        this._SafeStr_14253 = asGuarded(this._window.findChildByName("online_indicator_preference"), isIDropMenuWindow);
        this._SafeStr_14253.populate([this._toolbar.localization.getLocalization("memenu.settings.other.friend.online.notification.0", "Everyone"), this._toolbar.localization.getLocalization("memenu.settings.other.friend.online.notification.1", "Users in my relationship status"), this._toolbar.localization.getLocalization("memenu.settings.other.friend.online.notification.2", "Nobody")]);
        this._SafeStr_14253.selection = this._toolbar.messenger.getOnlineIndicatorPreference();
        this._SafeStr_14253.addEventListener("WE_SELECTED", this.onOnlineIndicatorPreferenceChanged);
        this._window.findChildByName("disable_room_camera_follow").visible = this._toolbar.getBoolean("room.camera.follow_user");
        if (this._toolbar.getBoolean("room.camera.follow_user")) {
            castGuarded(this._window.findChildByName("disable_room_camera_follow_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.sessionDataManager.isRoomCameraFollowDisabled;
        }
        let _loc1_: boolean = this._toolbar.getBoolean("sms.identity.verification.enabled");
        let _loc5_: boolean = this._toolbar.getInteger("phone.verification.status", 0) == 2;
        let _loc2_: boolean = this._toolbar.getInteger("phone.collection.status", 0) == 2;
        let _loc6_: boolean = this._toolbar.getBoolean("sms.identity.verification.button.enabled");
        let _loc4_: boolean = this._toolbar.getInteger("phone.collection.status", 0) == 0;
        let _loc7_: boolean = _loc1_ && !_loc5_ && (_loc2_ || _loc6_ && _loc4_);
        this._window.findChildByName("btn_reset_phone_number_collection").visible = _loc7_;
    }

    private onOnlineIndicatorPreferenceChanged = (param1: WindowEvent): void => {
        let _loc2_: number = this._SafeStr_14253.selection;
        if (_loc2_ < 0) {
            return;
        }
        this._toolbar.messenger.setOnlineIndicatorPreference(_loc2_);
        this._toolbar.connection.send(new SetOnlineIndicatorPreferenceMessageComposer(_loc2_));
    };

    private onButtonClicked = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: boolean = false;
        let _loc4_: boolean = false;
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: string = param2.name;
        switch (_loc3_) {
            case "back_btn":
                this.dispose();
                break;
            case "ignore_room_invites_checkbox":
                this._toolbar.messenger.setRoomInvitesIgnored(castGuarded(this._window.findChildByName("ignore_room_invites_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                this._toolbar.connection.send(new SetIgnoreRoomInvitesMessageComposer(this._toolbar.messenger.getRoomInvitesIgnored()));
                break;
            case "disable_wired_whisper_checkbox":
                _loc5_ = Boolean(castGuarded(this._window.findChildByName("disable_wired_whisper_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                this._toolbar.roomEvents.wiredWhisperDisabled = _loc5_;
                break;
            case "disable_room_camera_follow_checkbox":
                _loc4_ = Boolean(castGuarded(this._window.findChildByName("disable_room_camera_follow_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected);
                this._toolbar.connection.send(new SetRoomCameraPreferencesMessageComposer(_loc4_));
                this._toolbar.sessionDataManager.setRoomCameraFollowDisabled(_loc4_);
                break;
            case "btn_reset_phone_number_collection":
                this._window.findChildByName("btn_reset_phone_number_collection").visible = false;
                this._toolbar.connection.send(new ResetPhoneNumberStateMessageComposer());
        }
    };

    public get window(): IWindowContainer {
        return this._window;
    }
}
