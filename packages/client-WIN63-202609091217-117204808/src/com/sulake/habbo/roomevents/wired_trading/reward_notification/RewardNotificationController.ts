import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredTransactionSuccessContents } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessContents';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IRewardNotification } from '@/com/sulake/habbo/roomevents/wired_trading/reward_notification/IRewardNotification';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { WiredTransactionSuccessMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessMessageEvent';
import { RewardNotificationView } from '@/com/sulake/habbo/roomevents/wired_trading/reward_notification/RewardNotificationView';
import { UbuntuPresetManager } from '@/com/sulake/habbo/roomevents/wired_trading/UbuntuPresetManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';

export class RewardNotificationController extends Component implements ILinkEventTracker, IRewardNotification, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.reward_notification::RewardNotificationController'); }

    private static readonly MAX_OPEN_REWARD_NOTIFICATIONS: number = 10;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_4434: UtilsMap;

    declare private _SafeStr_2488: RewardNotificationView[];

    declare private _presetManager: PresetManager;

    declare private _disposed_RewardNotificationController: boolean;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._messageEvents = [];
        this._messageEvents.push(new WiredTransactionSuccessMessageEvent(this.onTransactionSuccess));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
        this._SafeStr_4434 = new UtilsMap();
        this._SafeStr_2488 = [];
        this._presetManager = new UbuntuPresetManager(param1);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false, [{ "type": "REE_DISPOSED", "callback": this.roomEventHandler }])]);
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
    }

    public get linkPattern(): string {
        return "wiredrewards/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: number = 0;
        let _loc3_: any[] = param1.split("/");
        if (_loc3_.length < 2) {
            return;
        }
        if (_loc3_[1] == "open") {
            if (_loc3_.length < 3) {
                return;
            }
            _loc2_ = _loc3_[2] | 0;
            this.openRewardView(_loc2_);
        }
    }

    private onTransactionSuccess(param1: WiredTransactionSuccessMessageEvent): void {
        let _loc2_: WiredTransactionSuccessContents = param1.getParser().contents;
        if (_loc2_.rewardContents == null) {
            return;
        }
        this._SafeStr_4434.add(_loc2_.internalId, _loc2_);
        if (_loc2_.openByDefault) {
            this.openRewardView(_loc2_.internalId);
        }
    }

    public openRewardView(param1: number): void {
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        if (this._disposed_RewardNotificationController) {
            return;
        }
        for (const _loc4_ of this._SafeStr_2488 ?? []) {
            if (_loc4_.contents != null && _loc4_.contents.internalId == param1) {
                _loc4_.window.activate();
                return;
            }
        }
        while (this._SafeStr_2488.length >= 10) {
            this.closeRewardView(this._SafeStr_2488[0]);
        }
        let _loc7_: WiredTransactionSuccessContents = this._SafeStr_4434[param1];
        let _loc2_: RewardNotificationView = new RewardNotificationView(this, this._presetManager);
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc9_: number = 0;
        if (this._SafeStr_2488.length > 0) {
            _loc9_ = (this._SafeStr_2488[this._SafeStr_2488.length - 1].viewIndex + 1) % 10;
        }
        if (_loc9_ > 0) {
            _loc6_ = 25;
            _loc8_ = (_loc9_ + 1) / 2 | 0;
            if ((_loc9_ + 1) % 2 == 0) {
                _loc5_ = _loc6_ * _loc8_;
                _loc3_ = _loc6_ * _loc8_;
            } else {
                _loc5_ = -_loc6_ * _loc8_;
                _loc3_ = -_loc6_ * _loc8_;
            }
        }
        _loc2_.show(_loc7_, _loc5_, _loc3_, _loc9_);
        this._SafeStr_2488.push(_loc2_);
    }

    public closeRewardView(param1: RewardNotificationView): void {
        let _loc2_: number = this._SafeStr_2488.indexOf(param1);
        if (_loc2_ != -1) {
            this._SafeStr_2488.splice(_loc2_, 1);
        }
        param1.dispose();
    }

    private roomEventHandler(param1: RoomEngineEvent): void {
        let _loc2_: any = undefined;
        if (this._roomEngine == null) {
            return;
        }
        let _loc5_: string = param1.type;
        if ("REE_DISPOSED" === _loc5_) {
            _loc2_ = this._SafeStr_2488;
            this._SafeStr_2488 = [];
            for (const _loc3_ of valuesOf(_loc2_)) {
                _loc3_.dispose();
            }
        }
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public override dispose(): void {
        if (this._disposed_RewardNotificationController) {
            return;
        }
        this._disposed_RewardNotificationController = true;
        for (const _loc2_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc2_);
        }
        this._messageEvents = null;
        for (const _loc1_ of this._SafeStr_2488 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_2488 = null;
        this._SafeStr_4434 = null;
        this._communicationManager = null;
        this._windowManager = null;
        this._localizationManager = null;
        this._roomEngine = null;
        this._presetManager = null;
        super.dispose();
    }

    public override get disposed(): boolean {
        return this._disposed_RewardNotificationController;
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    protected override initInstanceFields(): void {
        this.onTransactionSuccess = this.onTransactionSuccess.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this._disposed_RewardNotificationController = false;
        super.initInstanceFields();
    }
}
