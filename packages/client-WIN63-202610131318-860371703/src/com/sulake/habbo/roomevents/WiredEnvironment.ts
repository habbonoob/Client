import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredClickSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredClickSettingsMessageParser';
import type { WiredClickUserResponseMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredClickUserResponseMessageParser';
import type { WiredEnvironmentMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredEnvironmentMessageParser';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import { clearTimeout } from '@habbo-pixi/runtime/utils/clearTimeout';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WiredClickSettingsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredClickSettingsMessageEvent';
import { WiredClickUserResponseEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredClickUserResponseEvent';
import { WiredEnvironmentMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredEnvironmentMessageEvent';
import { isIRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import { WiredAchievementsUpdatedEvent } from '@/com/sulake/habbo/roomevents/events/WiredAchievementsUpdatedEvent';
import { WiredUserClickHandledEvent } from '@/com/sulake/habbo/roomevents/events/WiredUserClickHandledEvent';

export class WiredEnvironment implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents::WiredEnvironment'); }

    private static readonly _SafeStr_14268: string = "wired_env";
    public static readonly CLICK_USER_DEFAULT: number = 0;
    public static readonly CLICK_USER_CLICK_WALK_BEHIND: number = 1;
    public static readonly CLICK_USER_PASS_THROUGH: number = 2;
    public static readonly CLICK_FURNI_DEFAULT: number = 0;
    public static readonly CLICK_FURNI_PASS_THROUGH: number = 1;
    private static readonly CLICK_SETTINGS_NOTIFICATION_TOGGLE_ID: string = "wired_click_settings_toggle";

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _events: HabboUserDefinedRoomEvents;

    declare private _messageEvents: any[];

    private _hasClickUserWired: boolean = false;
    private _achievements: string[] = [];
    private _SafeStr_14269: number = 0;
    private _SafeStr_14270: number = 0;
    private _SafeStr_14271: boolean = false;
    private _SafeStr_14272: number = 4294967295;

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._events = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredEnvironmentMessageEvent(this.onWiredEnvironmentEvent));
        this._messageEvents.push(new WiredClickUserResponseEvent(this.onWiredClickUserResponseEvent));
        this._messageEvents.push(new WiredClickSettingsMessageEvent(this.onWiredClickSettingsEvent));
        for (const _loc2_ of this._messageEvents ?? []) {
            this._events.communication.addHabboConnectionMessageEvent(_loc2_);
        }
    }

    private hideClickSettingsIfInactive = (): void => {
        if (!this.hasActiveClickSettings()) {
            this._SafeStr_14271 = false;
            this._events.notifications.removeNotificationById("wired_click_settings_toggle");
        }
    };

    private onWiredClickSettingsEvent = (param1: WiredClickSettingsMessageEvent): void => {
        let _loc4_: string = null;
        let _loc3_: any = null;
        let _loc2_: WiredClickSettingsMessageParser = param1.getParser();
        let _loc5_: boolean = this._SafeStr_14269 != _loc2_.userOption || this._SafeStr_14270 != _loc2_.furniOption;
        if (this._SafeStr_14271 && !this._events.wiredMenu.hasWritePermission) {
            this._SafeStr_14271 = false;
            _loc5_ = true;
            this._events.notifications.removeNotificationById("wired_click_settings_toggle");
        }
        if (_loc5_) {
            this._SafeStr_14269 = _loc2_.userOption;
            this._SafeStr_14270 = _loc2_.furniOption;
            if (!this.hasActiveClickSettings()) {
                clearTimeout(this._SafeStr_14272);
                this._SafeStr_14272 = setTimeout(this.hideClickSettingsIfInactive, 3000);
            }
            if (this._SafeStr_14271) {
                _loc4_ = "${notification.click_settings}";
                if (this.hasActiveClickSettings()) {
                    _loc4_ = this._events.localization.getLocalization("notification.click_settings_ignored") + " " + this._events.localization.getLocalization("notification.click_settings");
                }
                this._events.notifications.addItem(_loc4_, "wired");
                return;
            }
            this.applyClickSettings(this._SafeStr_14269, this._SafeStr_14270);
            if (this._events.wiredMenu.hasWritePermission && this.hasActiveClickSettings()) {
                _loc3_ = {};
                _loc3_["id"] = "wired_click_settings_toggle";
                _loc3_["stay"] = true;
                _loc3_["toggle_callback"] = this.onToggleClickSettingsNotification;
                this._events.notifications.addItem("${notification.click_settings}", "wired", null, null, _loc3_);
                return;
            }
            this._events.notifications.addItem("${notification.click_settings}", "wired");
        }
    };

    public get achievements(): string[] {
        return this._achievements;
    }

    public leaveRoom(): void {
        this._events.notifications.removeNotificationById("wired_click_settings_toggle");
        this._SafeStr_14271 = false;
        clearTimeout(this._SafeStr_14272);
        if (this._SafeStr_14269 != 0 || this._SafeStr_14270 != 0 || this._SafeStr_14271) {
            this._SafeStr_14269 = 0;
            this._SafeStr_14270 = 0;
            this.applyClickSettings(0, 0);
        }
    }

    private onToggleClickSettingsNotification = (param1: boolean): void => {
        this._SafeStr_14271 = param1;
        if (param1) {
            this.applyClickSettings(0, 0);
        } else {
            this.applyClickSettings(this._SafeStr_14269, this._SafeStr_14270);
        }
    };

    private hasActiveClickSettings(): boolean {
        return this._SafeStr_14269 != 0 || this._SafeStr_14270 != 0;
    }

    private applyClickSettings(param1: number, param2: number): void {
        (asGuarded(this._events.roomEngine, isIRoomEngineServices)).setClickSettings("wired_env", param1 == 2, param2 == 1);
    }

    private onWiredEnvironmentEvent = (param1: WiredEnvironmentMessageEvent): void => {
        let _loc2_: WiredEnvironmentMessageParser = param1.getParser();
        this._hasClickUserWired = _loc2_.hasClickUserWired;
        this._achievements = _loc2_.enabledAchievements;
        this._events.events.dispatchEvent(new WiredAchievementsUpdatedEvent("WIRED_ACHIEVEMENTS_UPDATED", this._achievements));
    };

    private onWiredClickUserResponseEvent = (param1: WiredClickUserResponseEvent): void => {
        let _loc2_: WiredClickUserResponseMessageParser = param1.getParser();
        this._events.events.dispatchEvent(new WiredUserClickHandledEvent("WIRED_USER_CLICK_HANDLED", _loc2_.index, _loc2_.openMenu));
    };

    public clear(): void {
        this._hasClickUserWired = false;
    }

    public get hasClickUserWired(): boolean {
        return this._hasClickUserWired;
    }

    public get clickUserOption(): number {
        return this._SafeStr_14271 ? 0 : this._SafeStr_14269;
    }

    public get clickFurniOption(): number {
        return this._SafeStr_14270;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._hasClickUserWired = false;
        for (const _loc1_ of this._messageEvents ?? []) {
            this._events.communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._events = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
