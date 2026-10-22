import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ResetPhoneNumberStateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/ResetPhoneNumberStateMessageComposer';
import { SetIgnoreRoomInvitesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetIgnoreRoomInvitesMessageComposer';
import { SetRoomCameraPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetRoomCameraPreferencesMessageComposer';

export class OtherSettingsView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.settings::OtherSettingsView'); }

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this.createWindow();
    }

    declare private _toolbar: HabboToolbar;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._window == null) {
            return;
        }
        this._window.dispose();
        this._window = null;
    }

    private createWindow(): void {
        let _loc3_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("me_menu_other_settings_xml"), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        this._window.procedure = this.onButtonClicked;
        if (this._toolbar.getBoolean("chat.disable_old_chat")) {
            this._window.findChildByName("prefer_old_chat").visible = false;
        }
        castGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.freeFlowChat.isDisabledInPreferences;
        castGuarded(this._window.findChildByName("ignore_room_invites_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.messenger.getRoomInvitesIgnored();
        castGuarded(this._window.findChildByName("disable_wired_whisper_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.roomEvents.wiredWhisperDisabled;
        this._window.findChildByName("disable_room_camera_follow").visible = this._toolbar.getBoolean("room.camera.follow_user");
        if (this._toolbar.getBoolean("room.camera.follow_user")) {
            castGuarded(this._window.findChildByName("disable_room_camera_follow_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._toolbar.sessionDataManager.isRoomCameraFollowDisabled;
        }
        let _loc1_: boolean = this._toolbar.getBoolean("sms.identity.verification.enabled");
        let _loc5_: any = this._toolbar.getInteger("phone.verification.status", 0) == 2;
        let _loc2_: any = this._toolbar.getInteger("phone.collection.status", 0) == 2;
        let _loc6_: boolean = this._toolbar.getBoolean("sms.identity.verification.button.enabled");
        let _loc4_: any = this._toolbar.getInteger("phone.collection.status", 0) == 0;
        let _loc7_: boolean = !!(_loc1_ && !_loc5_ && (_loc2_ || _loc6_ && _loc4_));
        this._window.findChildByName("btn_reset_phone_number_collection").visible = _loc7_;
    }

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
            case "prefer_old_chat_checkbox":
                this._toolbar.freeFlowChat.isDisabledInPreferences = castGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected;
                if (!this._toolbar.freeFlowChat.isDisabledInPreferences) {
                    if (this._toolbar.roomUI.chatContainer != null && this._toolbar.freeFlowChat.displayObject != null) {
                        this._toolbar.roomUI.chatContainer.setDisplayObject(this._toolbar.freeFlowChat.displayObject);
                    }
                    break;
                }
                this._toolbar.freeFlowChat.clear();
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
}
