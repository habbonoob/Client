import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboTalent } from '@/com/sulake/habbo/friendbar/talent/HabboTalent';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';

export class CitizenshipPopupController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.talent::CitizenshipPopupController'); }

    constructor(param1: HabboTalent) {
        this._habboTalent = param1;
        this._SafeStr_4659 = new RoomEntryInfoMessageEvent(this.onRoomEnter);
        this._habboTalent.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_4659);
    }

    declare private _habboTalent: HabboTalent;

    declare private _SafeStr_2492: IModalDialog;

    declare private _SafeStr_4659: RoomEntryInfoMessageEvent;

    declare private _SafeStr_6208: boolean;
    static { (this.prototype as any)._SafeStr_6208 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        this.hide();
        this._SafeStr_2492 = this._habboTalent.getModalXmlWindow("citizenship_welcome");
        this._SafeStr_2492.rootWindow.procedure = this.onWindowEvent;
        castGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("header_button_close").visible = false;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.hide();
            this.removeRoomEnterListener();
            this._habboTalent = null;
        }
    }

    private onRoomEnter = (param1: IMessageEvent): void => {
        let _loc2_: Timer = null;
        if (this._habboTalent.newIdentity && !this._SafeStr_6208 && this._habboTalent.getBoolean("new.user.citizenship.popup.enabled")) {
            _loc2_ = new Timer(10000, 1);
            _loc2_.addEventListener("timer", this.onCitizenshipPopup);
            _loc2_.start();
        }
    };

    private removeRoomEnterListener(): void {
        if (this._habboTalent != null && !this._habboTalent.disposed) {
            this._habboTalent.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_4659);
        }
        this._SafeStr_4659 = null;
    }

    private hide(): void {
        if (this._SafeStr_2492 != null && !this._SafeStr_2492.disposed) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this._SafeStr_2492 == null || Boolean(this._SafeStr_2492.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "postpone_citizenship":
                this.hide();
                break;
            case "show_citizenship":
                this.hide();
                this._habboTalent.tracking.trackTalentTrackOpen("citizenship", "citizenshippopup");
                this._habboTalent.send(new GetTalentTrackMessageComposer("citizenship"));
        }
    };

    private onCitizenshipPopup = (param1: TimerEvent): void => {
        this.removeRoomEnterListener();
        this.show();
        this._SafeStr_6208 = true;
    };

    get [IDisposable](): true {
        return true;
    }
}
