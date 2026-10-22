import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { IHabboActivityDetection } from '@/com/sulake/habbo/discord/habbo_activity/IHabboActivityDetection';
import type { HabboDiscordManager } from '@/com/sulake/habbo/discord/HabboDiscordManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { RoomEngineObjectPlacedEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import type { RoomSessionDanceEvent } from '@/com/sulake/habbo/session/events/RoomSessionDanceEvent';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { WiredSaveSuccessEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredSaveSuccessEvent';
import { WiredValidationErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredValidationErrorEvent';
import { HabboActivityState } from '@/com/sulake/habbo/discord/habbo_activity/HabboActivityState';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboUserDefinedRoomEvents } from '@/com/sulake/iid/IIDHabboUserDefinedRoomEvents';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';

export class HabboActivityDetection extends Component implements IHabboActivityDetection {
    static { registerClassName(this, 'com.sulake.habbo.discord.habbo_activity::HabboActivityDetection'); }

    private static readonly ACTIVITY_VOLUME_WINDOW_MS: number = 300000;
    private static readonly ACTIVITY_MIN_WINDOW_MS: number = 30000;
    private static readonly ACTIVITY_MAX_WINDOW_MS: number = 300000;
    private static readonly ACTIVITY_MAX_COUNT: number = 30;

    declare private _manager: HabboDiscordManager;

    declare private _navigator: IHabboNavigator;

    declare private _inventory: IHabboInventory;

    declare private _roomSession: IRoomSession;

    declare private _roomEngine: IRoomEngine;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _wired: IHabboUserDefinedRoomEvents;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _toolbar: IHabboToolbar;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_4071: number;

    declare private _isDancing: boolean;

    declare private _SafeStr_3942: number;

    declare private _SafeStr_3150: number;

    declare private _roomNameFast: string;

    declare private _inHiddenRoomFast: boolean;

    declare private _categoryFast: number;

    declare private _roomId: number;

    declare private _SafeStr_4611: any[];

    declare private _SafeStr_4098: any[];

    declare private _SafeStr_4701: any[];

    constructor(param1: HabboDiscordManager, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._manager = param1;
        this._messageEvents = [];
        this.addMessageEvent(new WiredValidationErrorEvent(this.onModifyingWired));
        this.addMessageEvent(new WiredSaveSuccessEvent(this.onModifyingWired));
        this.addMessageEvent(new GetGuestRoomResultEvent(this.onGetGuestRoomResult));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }, false), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false, [{ "type": "REOE_PLACED", "callback": this.onRoomEngineObjectPlaced }, { "type": "REOE_REQUEST_MOVE", "callback": this.onRoomEngineObjectActivity }, { "type": "REOE_REQUEST_ROTATE", "callback": this.onRoomEngineObjectActivity }]), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.onRoomSessionEvent }, { "type": "RSE_ENDED", "callback": this.onRoomSessionEvent }, { "type": "RSCE_CHAT_EVENT", "callback": this.onRoomSessionChat }, { "type": "RSDE_DANCE", "callback": this.onRoomSessionDance }]), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }), new ComponentDependency(new IIDHabboUserDefinedRoomEvents(), (param1: IHabboUserDefinedRoomEvents): void => {
             this._wired = param1;
         })]);
    }

    public isInRoom(): boolean {
        return this._roomNameFast != null && this._toolbar.getToolbarState() == "HTE_STATE_ROOM_VIEW";
    }

    public isInHiddenRoom(): boolean {
        return this._inHiddenRoomFast;
    }

    public getCurrentRoomActivity(): HabboActivityState {
        if (!this.isInRoom()) {
            return null;
        }
        let _loc3_: HabboActivityState = HabboActivityState.CHILLING;
        let _loc1_: HabboActivityState[] = this.getAllCurrentRoomActivities();
        for (const _loc2_ of _loc1_ ?? []) {
            if (_loc2_.rank > _loc3_.rank) {
                _loc3_ = _loc2_;
            }
        }
        return _loc3_;
    }

    public getCurrentRoomName(): string {
        if (!this.isInRoom()) {
            return null;
        }
        return this._roomNameFast;
    }

    private onGetGuestRoomResult(param1: GetGuestRoomResultEvent): void {
        let _loc2_: GetGuestRoomResultMessageParser = param1.getParser();
        if (_loc2_.openingConnection || _loc2_.enterRoom) {
            this._roomNameFast = _loc2_.data.roomName;
            this._inHiddenRoomFast = _loc2_.data.doorMode == 3;
            this._roomId = _loc2_.data.flatId;
            this._categoryFast = _loc2_.data.categoryId;
            this._manager.tryUpdatePresence(_loc2_.enterRoom);
        }
    }

    private getAllCurrentRoomActivities(): HabboActivityState[] {
        let _loc5_: HabboActivityState = null;
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        let _loc1_: HabboActivityState[] = new Array<HabboActivityState>(0).fill(null);
        if (this._roomSession == null || !this.isInRoom()) {
            return _loc1_;
        }
        if (this._roomSession.isGameSession) {
            _loc1_.push(HabboActivityState.GAMING);
        } else {
            _loc5_ = this.activityStateByRoomCategory(this._categoryFast);
            if (_loc5_ != null) {
                _loc1_.push(_loc5_);
            }
        }
        if (this._inventory != null && this._inventory.tradingActive) {
            _loc1_.push(HabboActivityState.TRADING);
        }
        if (this._roomSession.isUserDecorating) {
            _loc1_.push(HabboActivityState.BUILDING);
        } else {
            _loc6_ = getTimer();
            _loc4_ = this.getDynamicWindowMs(this._SafeStr_4098, _loc6_);
            if (this._SafeStr_3150 > 0 && _loc6_ - this._SafeStr_3150 <= _loc4_) {
                _loc1_.push(HabboActivityState.BUILDING);
            }
        }
        let _loc7_: number = getTimer();
        if (this._isDancing) {
            _loc1_.push(HabboActivityState.DANCING);
        }
        let _loc2_: number = this.getDynamicWindowMs(this._SafeStr_4611, _loc7_);
        if (this._SafeStr_4071 > 0 && _loc7_ - this._SafeStr_4071 <= _loc2_) {
            _loc1_.push(HabboActivityState.CHATTING);
        }
        let _loc3_: number = this.getDynamicWindowMs(this._SafeStr_4701, _loc7_);
        if (this._wired != null && this._wired.hasWiredUIOpen() || this._SafeStr_3942 > 0 && _loc7_ - this._SafeStr_3942 <= _loc3_) {
            _loc1_.push(HabboActivityState.CREATING_WIRED);
        }
        return _loc1_;
    }

    private onRoomSessionEvent(param1: RoomSessionEvent): void {
        switch (param1.type) {
            case "RSE_STARTED":
                this._roomSession = param1.session;
                this.resetRecents();
                this._manager.tryUpdatePresence(false, true);
                break;
            case "RSE_ENDED":
                this.resetRecents();
                this._manager.tryUpdatePresence(false, true);
        }
    }

    private onRoomSessionChat(param1: RoomSessionChatEvent): void {
        if (this._roomSession == null || param1 == null) {
            return;
        }
        if (param1.userId == this._roomSession.ownUserRoomId && !this._freeFlowChat.isNotificationStyle(param1.style)) {
            this._SafeStr_4071 = getTimer();
            this.recordActivity(this._SafeStr_4611, this._SafeStr_4071);
            this._manager.tryUpdatePresence();
        }
    }

    private onRoomSessionDance(param1: RoomSessionDanceEvent): void {
        if (this._roomSession == null || param1 == null) {
            return;
        }
        if (param1.userId == this._roomSession.ownUserRoomId) {
            this._isDancing = param1.danceStyle > 0;
            this._manager.tryUpdatePresence();
        }
    }

    private onModifyingWired(param1: IMessageEvent): void {
        if (param1 == null) {
            return;
        }
        this._SafeStr_3942 = getTimer();
        this.recordActivity(this._SafeStr_4701, this._SafeStr_3942);
        this._manager.tryUpdatePresence();
    }

    private onRoomEngineObjectPlaced(param1: RoomEngineObjectPlacedEvent): void {
        if (param1 == null) {
            return;
        }
        if (param1.type == "REOE_PLACED" && param1.placementSource == "inventory" && param1.placedInRoom) {
            this._SafeStr_3150 = getTimer();
            this.recordActivity(this._SafeStr_4098, this._SafeStr_3150);
            this._manager.tryUpdatePresence();
        }
    }

    private onRoomEngineObjectActivity(param1: RoomEngineObjectEvent): void {
        if (param1 == null) {
            return;
        }
        if (param1.type == "REOE_REQUEST_MOVE" || param1.type == "REOE_REQUEST_ROTATE") {
            this._SafeStr_3150 = getTimer();
            this.recordActivity(this._SafeStr_4098, this._SafeStr_3150);
            this._manager.tryUpdatePresence();
        }
    }

    private recordActivity(param1: any[], param2: number): void {
        if (!param1) {
            return;
        }
        param1.push(param2);
        this.pruneOld(param1, param2);
    }

    private pruneOld(param1: any[], param2: number): void {
        if (!param1) {
            return;
        }
        while (param1.length > 0 && param2 - (param1[0] | 0) > 300000) {
            param1.shift();
        }
    }

    private getDynamicWindowMs(param1: any[], param2: number): number {
        if (!param1) {
            return 0;
        }
        this.pruneOld(param1, param2);
        let _loc3_: number = param1.length | 0;
        if (_loc3_ <= 0) {
            return 0;
        }
        if (_loc3_ > 30) {
            _loc3_ = 30;
        }
        let _loc4_: number = (_loc3_ - 1) / (30 - 1);
        if (_loc4_ < 0) {
            _loc4_ = 0;
        }
        if (_loc4_ > 1) {
            _loc4_ = 1;
        }
        return 30000 + _loc4_ * (300000 - 30000) | 0;
    }

    private activityStateByRoomCategory(param1: number): HabboActivityState {
        if (this.isCategoryMatch(param1, "rpg")) {
            return HabboActivityState.RPG;
        }
        if (this.isCategoryMatch(param1, "agency")) {
            return HabboActivityState.WORKING;
        }
        if (this.isCategoryMatch(param1, "games")) {
            return HabboActivityState.GAMING;
        }
        return null;
    }

    private isCategoryMatch(param1: number, param2: string): boolean {
        let _loc4_: string = this.getProperty("discord.room_category." + param2);
        if (_loc4_ == null || _loc4_.length == 0) {
            return false;
        }
        let _loc3_: any[] = _loc4_.split(",");
        return _loc3_.indexOf(String(param1)) != -1;
    }

    private resetRecents(): void {
        this._SafeStr_4071 = 0;
        this._isDancing = false;
        this._SafeStr_3942 = 0;
        this._SafeStr_3150 = 0;
        this._SafeStr_4611 = [];
        this._SafeStr_4098 = [];
        this._SafeStr_4701 = [];
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
        super.dispose();
        this._navigator = null;
        this._inventory = null;
        this._roomSession = null;
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
    }

    public get roomId(): number {
        return this._roomId;
    }

    protected override initInstanceFields(): void {
        this.onGetGuestRoomResult = this.onGetGuestRoomResult.bind(this);
        this.onRoomSessionEvent = this.onRoomSessionEvent.bind(this);
        this.onRoomSessionChat = this.onRoomSessionChat.bind(this);
        this.onRoomSessionDance = this.onRoomSessionDance.bind(this);
        this.onModifyingWired = this.onModifyingWired.bind(this);
        this.onRoomEngineObjectPlaced = this.onRoomEngineObjectPlaced.bind(this);
        this.onRoomEngineObjectActivity = this.onRoomEngineObjectActivity.bind(this);
        this._SafeStr_4071 = 0;
        this._isDancing = false;
        this._SafeStr_3942 = 0;
        this._SafeStr_3150 = 0;
        this._roomNameFast = null;
        this._inHiddenRoomFast = false;
        this._categoryFast = 0;
        this._roomId = -1;
        this._SafeStr_4611 = [];
        this._SafeStr_4098 = [];
        this._SafeStr_4701 = [];
        super.initInstanceFields();
    }
}
