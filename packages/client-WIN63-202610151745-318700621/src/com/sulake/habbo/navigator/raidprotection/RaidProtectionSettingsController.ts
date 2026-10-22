import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { _SafeCls_6057 } from '@/com/sulake/habbo/communication/messages/parser/raidprotection/_SafeCls_6057';
import type { IHabboConfigurationManager } from '@/com/sulake/habbo/configuration/IHabboConfigurationManager';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RaidProtectionCapabilityEvent } from '@/com/sulake/habbo/communication/messages/incoming/raidprotection/RaidProtectionCapabilityEvent';
import { RaidProtectionSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/raidprotection/RaidProtectionSettingsEvent';
import { RaidProtectionSettingsResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/raidprotection/RaidProtectionSettingsResultEvent';
import { GetRaidProtectionSettingsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/raidprotection/GetRaidProtectionSettingsComposer';
import { SaveRaidProtectionSettingsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/raidprotection/SaveRaidProtectionSettingsComposer';
import { RaidProtectionSettingsData } from '@/com/sulake/habbo/navigator/raidprotection/RaidProtectionSettingsData';
import { RaidProtectionSettingsView } from '@/com/sulake/habbo/navigator/raidprotection/RaidProtectionSettingsView';

export class RaidProtectionSettingsController extends EventDispatcher implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.raidprotection::RaidProtectionSettingsController'); }

    public static readonly STATE_CHANGED: string = "RPSE_STATE_CHANGED";
    private static readonly SENSITIVITY_VALUES: number[] = Array.from([0, 1, 2]);
    private static readonly ACTION_VALUES: number[] = Array.from([0, 1]);
    private static readonly BAN_DURATION_VALUES: number[] = Array.from([300, 900, 1800, 3600, 10800, 21600, 43200, 86400, 259200, 604800]);
    private static readonly GUARD_DURATION_VALUES: number[] = Array.from([300, 900, 1800, 3600, 10800]);

    declare private _navigator: HabboNavigator;

    declare private _configuration: IHabboConfigurationManager;

    declare private _events: IMessageEvent[];

    private _capabilities: Map<any, any> = new Dictionary();
    private _SafeStr_3112: Map<any, any> = new Dictionary();

    declare private _SafeStr_14273: number;
    static { (this.prototype as any)._SafeStr_14273 = 0; }

    declare private _SafeStr_14274: number;
    static { (this.prototype as any)._SafeStr_14274 = 0; }

    declare private _SafeStr_14275: RaidProtectionSettingsData;

    declare private _SafeStr_14276: RaidProtectionSettingsData;

    declare private _SafeStr_3939: IConfirmDialog;

    declare private _view: RaidProtectionSettingsView;

    declare private _SafeStr_14277: boolean;
    static { (this.prototype as any)._SafeStr_14277 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabboNavigator, param2: IHabboConfigurationManager) {
        super();
        this._navigator = param1;
        this._configuration = param2;
        this._SafeStr_14277 = this._configuration.getBoolean("raid.protection.enabled");
        this._events = Array.from([new RaidProtectionCapabilityEvent(this.onCapability), new RaidProtectionSettingsEvent(this.onSettings), new RaidProtectionSettingsResultEvent(this.onResult)]);
        for (const _loc3_ of this._events ?? []) {
            this._navigator.communication.addHabboConnectionMessageEvent(_loc3_);
        }
        this._navigator.roomSessionManager.events.addEventListener("RSE_CREATED", this.onSession);
        this._navigator.roomSessionManager.events.addEventListener("RSE_STARTED", this.onSession);
        this._navigator.roomSessionManager.events.addEventListener("RSE_ENDED", this.onSession);
        this._configuration.events.addEventListener("HCE_CONFIGURATION_LOADED", this.onConfigurationLoaded);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isFeatureEnabled(): boolean {
        return this._SafeStr_14277;
    }

    public canManage(param1: number): boolean {
        return this._SafeStr_14277 && this.isLiveCurrentRoom(param1) && this._capabilities.get(param1) === true;
    }

    public openFromLink(param1: string): void {
        if (param1 == null || !/^\d+$/.test(param1)) {
            return;
        }
        let _loc2_: number = Number(param1);
        if (_loc2_ <= 0 || _loc2_ > 2147483647) {
            return;
        }
        let _loc3_: number = _loc2_ | 0;
        if (!this._SafeStr_14277 || !this.isCurrentEnteredRoom(_loc3_) || !this.canManage(_loc3_) || this._SafeStr_14273 == _loc3_) {
            return;
        }
        this._SafeStr_14273 = _loc3_;
        if (this._view) {
            this._view.hide();
        }
        this.send(new GetRaidProtectionSettingsComposer(_loc3_));
    }

    public requestSave(param1: RaidProtectionSettingsData): void {
        let _loc3_: string = null;
        let _loc2_: RaidProtectionSettingsData = param1 == null ? null : asInstanceOf(this._SafeStr_3112.get(param1.roomId), RaidProtectionSettingsData);
        if (_loc2_ == null || !this.valid(param1)) {
            return;
        }
        if (!this._SafeStr_14277 || !this.isCurrentEnteredRoom(param1.roomId) || !this.canManage(param1.roomId)) {
            this.clearRoom(param1.roomId);
            return;
        }
        if (this._SafeStr_14274 != 0) {
            return;
        }
        if (!_loc2_.enabled && param1.enabled) {
            this._SafeStr_14275 = param1;
            this._SafeStr_14276 = _loc2_;
            this._view.setSaveOutstanding(true);
            _loc3_ = this._navigator.localization.getLocalization(_loc2_.incidentActive ? "raid.protection.settings.confirm.active" : "raid.protection.settings.confirm.inactive");
            this._SafeStr_3939 = this._navigator.windowManager.confirm("${raid.protection.settings.confirm.title}", _loc3_, 0, this.onConfirmation);
            return;
        }
        this.sendSave(param1, false);
    }

    public close(): void {
        this._SafeStr_14273 = 0;
        this.cancelConfirmation();
        if (this._view) {
            this._view.hide();
        }
    }

    private onConfirmation = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        this._SafeStr_3939 = null;
        let _loc3_: RaidProtectionSettingsData = this._SafeStr_14275;
        let _loc4_: RaidProtectionSettingsData = this._SafeStr_14276;
        this._SafeStr_14275 = null;
        this._SafeStr_14276 = null;
        if (param2.type == "WE_OK" && _loc3_ != null && _loc4_ != null && this._SafeStr_3112.get(_loc3_.roomId) === _loc4_ && !_loc4_.enabled && this._SafeStr_14277 && this.isCurrentEnteredRoom(_loc3_.roomId) && this.canManage(_loc3_.roomId) && this._SafeStr_14274 == 0) {
            this.sendSave(_loc3_, true);
        } else if (this._view && this._SafeStr_14274 == 0) {
            this._view.setSaveOutstanding(false);
        }
    };

    private sendSave(param1: RaidProtectionSettingsData, param2: boolean): void {
        this._SafeStr_14274 = param1.roomId;
        if (this._view) {
            this._view.setSaveOutstanding(true);
        }
        this.send(new SaveRaidProtectionSettingsComposer(param1.roomId, param1.enabled, param1.detectionSensitivity, param1.actionType, param1.banDurationSeconds, param1.guardEnabled, param1.guardDurationSeconds, param1.guardSensitivity, param2));
    }

    private onCapability = (param1: RaidProtectionCapabilityEvent): void => {
        let _loc2_: _SafeCls_6057 = param1.getParser();
        let _loc3_: number = _loc2_.roomId;
        if (!this._SafeStr_14277 || !this.isLiveCurrentRoom(_loc3_)) {
            return;
        }
        this.clearOtherRooms(_loc3_);
        if (_loc2_.canManage) {
            this._capabilities.set(_loc3_, true);
        } else {
            this.clearRoom(_loc3_);
        }
        this.dispatchEvent(new Event("RPSE_STATE_CHANGED"));
    };

    private onSettings = (param1: RaidProtectionSettingsEvent): void => {
        let _loc2_: RaidProtectionSettingsData = RaidProtectionSettingsData.fromSnapshot(param1.getParser().settings);
        if (!this._SafeStr_14277 || !this.isCurrentEnteredRoom(_loc2_.roomId) || !this.canManage(_loc2_.roomId)) {
            return;
        }
        this.cancelConfirmation();
        this._SafeStr_3112.set(_loc2_.roomId, _loc2_);
        if (this._SafeStr_14273 == _loc2_.roomId) {
            this._SafeStr_14273 = 0;
            if (this._view == null) {
                this._view = new RaidProtectionSettingsView(this, this._navigator);
            }
            this._view.update(_loc2_);
            this._view.show();
        } else if (this._view && this._view.isShowingRoom(_loc2_.roomId)) {
            this._view.update(_loc2_);
        }
    };

    private onResult = (param1: RaidProtectionSettingsResultEvent): void => {
        let _loc3_: number = param1.getParser().resultCode;
        let _loc2_: RaidProtectionSettingsData = RaidProtectionSettingsData.fromSnapshot(param1.getParser().settings);
        if (_loc2_.roomId != this._SafeStr_14274 || !this._SafeStr_14277 || !this.isCurrentEnteredRoom(_loc2_.roomId) || !this.canManage(_loc2_.roomId)) {
            return;
        }
        this.completePendingSave();
        this._SafeStr_3112.set(_loc2_.roomId, _loc2_);
        if (this._view && this._view.isShowingRoom(_loc2_.roomId)) {
            this._view.update(_loc2_);
            if (_loc3_ == 0) {
                this.close();
            }
        }
    };

    private onSession = (param1: RoomSessionEvent): void => {
        if (param1.type == "RSE_ENDED") {
            this.clearRoom(param1.session.roomId);
        } else {
            this.clearOtherRooms(param1.session.roomId);
            this.cancelConfirmation();
            if (this._view) {
                this._view.hide();
            }
        }
        this.dispatchEvent(new Event("RPSE_STATE_CHANGED"));
    };

    private onConfigurationLoaded = (param1: Event): void => {
        let _loc2_: boolean = Boolean(this._configuration.getBoolean("raid.protection.enabled"));
        if (_loc2_ == this._SafeStr_14277) {
            return;
        }
        this._SafeStr_14277 = _loc2_;
        this.clearAll();
        this.dispatchEvent(new Event("RPSE_STATE_CHANGED"));
    };

    private valid(param1: RaidProtectionSettingsData): boolean {
        return param1 != null && RaidProtectionSettingsController.SENSITIVITY_VALUES.indexOf(param1.detectionSensitivity) != -1 && RaidProtectionSettingsController.ACTION_VALUES.indexOf(param1.actionType) != -1 && RaidProtectionSettingsController.BAN_DURATION_VALUES.indexOf(param1.banDurationSeconds) != -1 && RaidProtectionSettingsController.GUARD_DURATION_VALUES.indexOf(param1.guardDurationSeconds) != -1 && RaidProtectionSettingsController.SENSITIVITY_VALUES.indexOf(param1.guardSensitivity) != -1;
    }

    private isLiveCurrentRoom(param1: number): boolean {
        let _loc2_: IRoomSession = this._navigator.roomSessionManager.getSession(param1);
        return param1 > 0 && this._navigator.data.currentRoomId == param1 && _loc2_ != null && _loc2_.state == "RSE_STARTED";
    }

    private isCurrentEnteredRoom(param1: number): boolean {
        return this.isLiveCurrentRoom(param1) && this._navigator.data.enteredGuestRoom != null && this._navigator.data.enteredGuestRoom.flatId == param1;
    }

    private clearOtherRooms(param1: number): void {
        let _loc2_: any;
        for (_loc2_ of this._capabilities?.keys() ?? []) {
            if ((_loc2_ | 0) != param1) {
                this.clearRoom(_loc2_ | 0);
            }
        }
        for (_loc2_ of this._SafeStr_3112?.keys() ?? []) {
            if ((_loc2_ | 0) != param1) {
                this.clearRoom(_loc2_ | 0);
            }
        }
        if (this._SafeStr_14273 != 0 && this._SafeStr_14273 != param1) {
            this._SafeStr_14273 = 0;
        }
        if (this._SafeStr_14274 != 0 && this._SafeStr_14274 != param1) {
            this.completePendingSave();
        }
        if (this._SafeStr_14275 && this._SafeStr_14275.roomId != param1) {
            this.cancelConfirmation();
        }
    }

    private clearRoom(param1: number): void {
        this._capabilities.delete(param1);
        this._SafeStr_3112.delete(param1);
        if (this._SafeStr_14273 == param1) {
            this._SafeStr_14273 = 0;
        }
        if (this._SafeStr_14274 == param1) {
            this.completePendingSave();
        }
        if (this._SafeStr_14275 && this._SafeStr_14275.roomId == param1) {
            this.cancelConfirmation();
        }
        if (this._view && this._view.isShowingRoom(param1)) {
            this._view.hide();
        }
    }

    private clearAll(): void {
        this._capabilities = new Dictionary();
        this._SafeStr_3112 = new Dictionary();
        this._SafeStr_14273 = 0;
        this.completePendingSave();
        this.cancelConfirmation();
        if (this._view) {
            this._view.hide();
        }
    }

    private completePendingSave(): void {
        this._SafeStr_14274 = 0;
        if (this._view) {
            this._view.setSaveOutstanding(false);
        }
    }

    private cancelConfirmation(): void {
        if (this._SafeStr_3939) {
            this._SafeStr_3939.dispose();
            this._SafeStr_3939 = null;
        }
        this._SafeStr_14275 = null;
        this._SafeStr_14276 = null;
        if (this._view && this._SafeStr_14274 == 0) {
            this._view.setSaveOutstanding(false);
        }
    }

    private send(param1: IMessageComposer): void {
        this._navigator.send(param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        for (const _loc1_ of this._events ?? []) {
            this._navigator.communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._navigator.roomSessionManager.events.removeEventListener("RSE_CREATED", this.onSession);
        this._navigator.roomSessionManager.events.removeEventListener("RSE_STARTED", this.onSession);
        this._navigator.roomSessionManager.events.removeEventListener("RSE_ENDED", this.onSession);
        this._configuration.events.removeEventListener("HCE_CONFIGURATION_LOADED", this.onConfigurationLoaded);
        this.cancelConfirmation();
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._events = null;
        this._capabilities = null;
        this._SafeStr_3112 = null;
        this._configuration = null;
        this._navigator = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
