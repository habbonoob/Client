import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ErrorEvent } from '@/com/sulake/core/runtime/events/ErrorEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { AdEvent } from '@/com/sulake/habbo/advertisement/events/AdEvent';
import type { CatalogPageOpenedEvent } from '@/com/sulake/habbo/catalog/navigation/events/CatalogPageOpenedEvent';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { HabboAchievementNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboAchievementNotificationMessageParser';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomObjectRoomAdEvent } from '@/com/sulake/habbo/room/events/RoomObjectRoomAdEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { System } from '@habbo-pixi/runtime/system/System';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { AuthenticationOKMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/AuthenticationOKMessageEvent';
import { HabboAchievementNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboAchievementNotificationMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { LatencyPingResponseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/tracking/LatencyPingResponseMessageEvent';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { FramerateTracker } from '@/com/sulake/habbo/tracking/FramerateTracker';
import { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import { LagWarningLogger } from '@/com/sulake/habbo/tracking/LagWarningLogger';
import { LatencyTracker } from '@/com/sulake/habbo/tracking/LatencyTracker';
import { PerformanceTracker } from '@/com/sulake/habbo/tracking/PerformanceTracker';
import { ToolbarClickTracker } from '@/com/sulake/habbo/tracking/ToolbarClickTracker';
import { IIDHabboAdManager } from '@/com/sulake/iid/IIDHabboAdManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { SimpleLogger } from '@/debug/SimpleLogger';

const preSuperHabboTracking: ((self: HabboTracking) => void)[] = [];

export class HabboTracking extends Component implements IHabboTracking, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.tracking::HabboTracking'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboTracking.#initStatics();
        return HabboTracking._log;
    }

    private static readonly ERROR_DATA_FLAG_COUNT: number = 11;
    private static _instance: HabboTracking;

    public static getInstance(): HabboTracking {
        return HabboTracking._instance;
    }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        let _loc5_: any;
        _loc5_ = 0;
        preSuperHabboTracking.push((self: HabboTracking) => {
            self.onceTrackedEvents = new Array<string>(0).fill(null);
            if (HabboTracking._instance == null) {
                HabboTracking._instance = self;
            }
            self._SafeStr_5312 = new Array(11);
            while (_loc5_ < 11) {
                self._SafeStr_5312[_loc5_] = 0;
                _loc5_++;
            }
        });
        _loc5_ = 0;
        super(param1, param2, param3);
        let _loc6_: string = "WIN63-202603212315-320263584";
        let _loc4_: IContext = param1.root;
        if (_loc4_ != null) {
            _loc4_.events.addEventListener("COMPONENT_EVENT_ERROR", this.onError);
            ErrorReportStorage.setParameter("start_time", new Date().getTime().toString());
            ErrorReportStorage.setParameter("agent", _loc6_);
            ErrorReportStorage.setParameter("system", Capabilities.serverString);
            ErrorReportStorage.setParameter("in_room", "false");
            ErrorReportStorage.setParameter("last_room", "0");
        }
        this.registerUpdateReceiver(this, 1);
    }

    declare private _SafeStr_5312: any[];

    declare private _SafeStr_6054: boolean;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_3367: PerformanceTracker;

    declare private _SafeStr_3613: FramerateTracker;

    declare private _SafeStr_2879: LatencyTracker;

    declare private _SafeStr_5018: LagWarningLogger;

    declare private _SafeStr_3840: ToolbarClickTracker;

    declare private _roomEngine: IRoomEngine;

    declare private _SafeStr_6552: boolean;

    declare private _currentTime: number;

    declare private _SafeStr_5778: number;

    declare private _SafeStr_5618: number;

    declare private _SafeStr_2612: Timer;

    declare private _SafeStr_6767: number;

    declare private _SafeStr_4831: number;

    declare private onceTrackedEvents: string[];

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communication = param1;
            }), new ComponentDependency(new IIDHabboConfigurationManager(), (param1: ICoreConfiguration): void => {
                if (param1 != null) {
                    this.setErrorContextFlag(1, 0);
                }
            }, false, [{ "type": "complete", "callback": this.onConfigurationComplete }]), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                if (param1 != null) {
                    this.setErrorContextFlag(1, 1);
                }
            }, false), new ComponentDependency(new IIDHabboWindowManager(), null, false, [{ "type": "HABBO_WINDOW_TRACKING_EVENT_INPUT", "callback": this.onWindowTrackingEvent }, { "type": "HABBO_WINDOW_TRACKING_EVENT_RENDER", "callback": this.onWindowTrackingEvent }, { "type": "HABBO_WINDOW_TRACKING_EVENT_SLEEP", "callback": this.onWindowTrackingEvent }]), new ComponentDependency(new IIDHabboNavigator(), null, false, [{ "type": "HABBO_NAVIGATOR_TRACKING_EVENT_CLOSED", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_EVENTS", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_ROOMS", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_ME", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCH", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_OFFICIAL", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FAVOURITES", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FRIENDS_ROOMS", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_HISTORY", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_ROOMS", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_OFFICIALROOMS", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_POPULAR_ROOMS", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_TAG_SEARCH", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_TEXT_SEARCH", "callback": this.onNavigatorTrackingEvent }, { "type": "HABBO_ROOM_SETTINGS_TRACKING_EVENT_CLOSED", "callback": this.onRoomSettingsTrackingEvent }, { "type": "HABBO_ROOM_SETTINGS_TRACKING_EVENT_DEFAULT", "callback": this.onRoomSettingsTrackingEvent }, { "type": "HABBO_ROOM_SETTINGS_TRACKING_EVENT_ADVANCED", "callback": this.onRoomSettingsTrackingEvent }, { "type": "HABBO_ROOM_SETTINGS_TRACKING_EVENT_THUMBS", "callback": this.onRoomSettingsTrackingEvent }, { "type": "HTIE_ICON_ZOOM", "callback": this.onZoomToggle }]), new ComponentDependency(new IIDHabboCatalog(), null, false, [{ "type": "CATALOG_PAGE_OPENED", "callback": this.onCatalogPageOpened }, { "type": "HABBO_CATALOG_TRACKING_EVENT_OPEN", "callback": this.onCatalogTrackingEvent }, { "type": "HABBO_CATALOG_TRACKING_EVENT_CLOSE", "callback": this.onCatalogTrackingEvent }, { "type": "CATALOG_FURNI_PURCHASE", "callback": this.onCatalogTrackingEvent }]), new ComponentDependency(new IIDHabboInventory(), null, false, [{ "type": "HABBO_INVENTORY_TRACKING_EVENT_CLOSED", "callback": this.onInventoryTrackingEvent }, { "type": "HABBO_INVENTORY_TRACKING_EVENT_FURNI", "callback": this.onInventoryTrackingEvent }, { "type": "HABBO_INVENTORY_TRACKING_EVENT_POSTERS", "callback": this.onInventoryTrackingEvent }, { "type": "HABBO_INVENTORY_TRACKING_EVENT_BADGES", "callback": this.onInventoryTrackingEvent }, { "type": "HABBO_INVENTORY_TRACKING_EVENT_ACHIEVEMENTS", "callback": this.onInventoryTrackingEvent }, { "type": "HABBO_INVENTORY_TRACKING_EVENT_TRADING", "callback": this.onInventoryTrackingEvent }]), new ComponentDependency(new IIDHabboFriendList(), null, false, [{ "type": "HABBO_FRIENDLIST_TRACKING_EVENT_CLOSED", "callback": this.onFriendlistTrackingEvent }, { "type": "HABBO_FRIENDLIST_TRACKING_EVENT_FRIENDS", "callback": this.onFriendlistTrackingEvent }, { "type": "HABBO_FRIENDLIST_TRACKING_EVENT_SEARCH", "callback": this.onFriendlistTrackingEvent }, { "type": "HABBO_FRIENDLIST_TRACKING_EVENT_REQUEST", "callback": this.onFriendlistTrackingEvent }, { "type": "HABBO_FRIENDLIST_TRACKING_EVENT_MINIMZED", "callback": this.onFriendlistTrackingEvent }]), new ComponentDependency(new IIDHabboHelp(), null, false, [{ "type": "HABBO_HELP_TRACKING_EVENT_CLOSED", "callback": this.onHelpTrackingEvent }, { "type": "HABBO_HELP_TRACKING_EVENT_DEFAULT", "callback": this.onHelpTrackingEvent }]), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
                this._roomEngine = param1;
            }, false, [{ "type": "RORAE_ROOM_AD_FURNI_CLICK", "callback": this.onRoomAdClick }, { "type": "REE_INITIALIZED", "callback": this.onRoomAction }, { "type": "REE_DISPOSED", "callback": this.onRoomAction }]), new ComponentDependency(new IIDHabboAdManager(), null, false, [{ "type": "AE_ROOM_AD_SHOW", "callback": this.onRoomAdLoad }]), new ComponentDependency(new IIDHabboToolbar(), null, false, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.onToolbarClick }])]);
    }

    declare private _communication: IHabboCommunicationManager;

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    protected override initComponent(): void {
        this._SafeStr_2879 = new LatencyTracker(this);
        this._SafeStr_3367 = new PerformanceTracker(this);
        this._SafeStr_3613 = new FramerateTracker(this);
        this._SafeStr_5018 = new LagWarningLogger(this);
        this._SafeStr_3840 = new ToolbarClickTracker(this);
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new AuthenticationOKMessageEvent(this.onAuthOK));
        this.addMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        this.addMessageEvent(new HabboAchievementNotificationMessageEvent(this.onAchievementNotification));
        this.addMessageEvent(new LatencyPingResponseMessageEvent(this.onPingResponse));
        let _loc1_: IEventDispatcher = castTo(this.context, Component).events;
        _loc1_.addEventListener("HABBO_CONNECTION_EVENT_INIT", this.onConnectionEvent);
        _loc1_.addEventListener("HABBO_CONNECTION_EVENT_ESTABLISHED", this.onConnectionEvent);
        _loc1_.addEventListener("HABBO_CONNECTION_EVENT_HANDSHAKING", this.onConnectionEvent);
        _loc1_.addEventListener("HABBO_CONNECTION_EVENT_HANDSHAKED", this.onConnectionEvent);
        _loc1_.addEventListener("HABBO_CONNECTION_EVENT_HANDSHAKE_FAIL", this.onConnectionEvent);
        _loc1_.addEventListener("HABBO_CONNECTION_EVENT_AUTHENTICATED", this.onConnectionEvent);
        _loc1_.addEventListener("HHVE_START_LOAD", this.onHotelViewEvent);
        _loc1_.addEventListener("HHVE_ERROR", this.onHotelViewEvent);
        _loc1_.addEventListener("HHVE_LOADED", this.onHotelViewEvent);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (HabboTracking._instance == this) {
            HabboTracking._instance = null;
        }
        this.removeUpdateReceiver(this);
        if (this._messageEvents != null && this._communication != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communication.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        this._SafeStr_3367 = null;
        this._SafeStr_3613 = null;
        this._SafeStr_3840 = null;
        if (this._SafeStr_2879 != null) {
            this._SafeStr_2879.dispose();
            this._SafeStr_2879 = null;
        }
        if (this._SafeStr_2612) {
            this._SafeStr_2612.stop();
            this._SafeStr_2612.removeEventListener("timer", this.onRoomActionTimerEvent);
            this._SafeStr_2612 = null;
        }
        super.dispose();
    }

    public legacyTrackGoogle(param1: string, param2: string, param3: any[] = null): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.legacyTrack", param1, param2, param3 == null ? [] : param3);
            } else {
                HabboTracking._log.debug("ExternalInterface is not available, tracking is disabled");
            }
        } catch (e) {
        }
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        HabboTracking._log.debug("trackGoogle(" + param1 + ", " + param2 + ", " + param3 + ")");
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.track", param1, param2, param3);
            } else {
                HabboTracking._log.debug("ExternalInterface is not available, tracking is disabled");
            }
        } catch (e) {
        }
    }

    public trackLoginStep(param1: string, param2: string = null): void {
        HabboTracking._log.info("* Track Login Step: " + param1);
        if (!this.getBoolean(HabboProperty.PROCESSLOG_ENABLED_KEY)) {
            return;
        }
        try {
            if (ExternalInterface.available) {
                if (param2 != null) {
                    ExternalInterface.call("FlashExternalInterface.logLoginStep", param1, param2);
                } else {
                    ExternalInterface.call("FlashExternalInterface.logLoginStep", param1);
                }
            } else {
                HabboTracking._log.debug("ExternalInterface is not available, tracking is disabled");
            }
        } catch (e) {
        }
    }

    public trackEventLog(param1: string, param2: string, param3: string, param4: string = "", param5: number = 0): void {
        if (this._communication != null && this._communication.connection != null && this._communication.connection.connected) {
            this._communication.connection.send(new EventLogMessageComposer(param1, param2, param3, param4, param5));
        }
    }

    public trackEventLogOncePerSession(param1: string, param2: string, param3: string, param4: string = "", param5: number = 0): void {
        let _loc7_: any = 0;
        let _loc8_: string = param1 + param2 + param3;
        let _loc6_: boolean = false;
        _loc7_ = 0;
        while (_loc7_ < this.onceTrackedEvents.length) {
            if (this.onceTrackedEvents[_loc7_] == _loc8_) {
                _loc6_ = true;
                break;
            }
            _loc7_++;
        }
        if (!_loc6_) {
            this.trackEventLog(param1, param2, param3, param4, param5);
            this.onceTrackedEvents.push(_loc8_);
        }
    }

    public trackTalentTrackOpen(param1: string, param2: string): void {
        this.trackEventLog("Talent", param1, "talent.open", param2);
    }

    public logError(param1: string): void {
        HabboTracking._log.error("logError(" + param1 + ")");
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.logError", param1);
            } else {
                HabboTracking._log.debug("ExternalInterface is not available, tracking is disabled");
            }
        } catch (e) {
        }
    }

    public chatLagDetected(param1: number): void {
        this._SafeStr_5018.chatLagDetected(param1);
    }

    public update(param1: number): void {
        let _loc2_: number = getTimer();
        if (this._currentTime > -1 && _loc2_ < this._currentTime) {
            this._SafeStr_5778 = this._SafeStr_5778 + 1;
            ErrorReportStorage.addDebugData("Invalid time counter", "Invalid times: " + this._SafeStr_5778);
        }
        if (this._currentTime > -1 && _loc2_ - this._currentTime > 15000) {
            this._SafeStr_5618 = this._SafeStr_5618 + 1;
            ErrorReportStorage.addDebugData("Time leap counter", "Time leaps: " + this._SafeStr_5618);
        }
        this._currentTime = _loc2_;
        if (this._SafeStr_3367 != null) {
            this._SafeStr_3367.update(param1, this._currentTime);
        }
        if (this._SafeStr_2879 != null) {
            this._SafeStr_2879.update(param1, this._currentTime);
        }
        if (this._SafeStr_3613 != null) {
            this._SafeStr_3613.trackUpdate(param1, this._currentTime);
        }
        if (this._SafeStr_5018 != null) {
            this._SafeStr_5018.update(this._currentTime);
        }
    }

    public send(param1: IMessageComposer): void {
        if (this._communication != null && this._communication.connection != null && this._communication.connection.connected) {
            this._communication.connection.send(param1);
        }
    }

    private addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(this._communication.addHabboConnectionMessageEvent(param1));
    }

    private setErrorContextFlag(param1: number, param2: number): void {
        this._SafeStr_5312[param2] = param1;
    }

    private onAchievementNotification(param1: HabboAchievementNotificationMessageEvent): void {
        let _loc2_: HabboAchievementNotificationMessageParser = param1.getParser();
        this.legacyTrackGoogle("achievement", "achievement", [_loc2_.data.badgeCode]);
    }

    private onAuthOK(param1: IMessageEvent): void {
        this.legacyTrackGoogle("authentication", "authok");
    }

    private onPingResponse(param1: LatencyPingResponseMessageEvent): void {
        if (this._SafeStr_2879 != null) {
            this._SafeStr_2879.onPingResponse(param1);
        }
    }

    private onRoomEnter(param1: IMessageEvent): void {
        if (!this._SafeStr_6552) {
            this.trackLoginStep("client.init.room.enter");
            this._SafeStr_6552 = true;
        }
        let _loc2_: RoomEntryInfoMessageParser = castTo(param1, RoomEntryInfoMessageEvent).getParser();
        ErrorReportStorage.setParameter("last_room", String(_loc2_.guestRoomId));
        ErrorReportStorage.setParameter("in_room", "true");
        this.legacyTrackGoogle("navigator", "private", [_loc2_.guestRoomId]);
    }

    private getAliasFromAdTechUrl(param1: string): string {
        let _loc2_: any[] = param1.match(/;alias=([^;]+)/);
        if (_loc2_ != null && _loc2_.length > 1) {
            return stringOrNull(_loc2_[1]);
        }
        return "unknown";
    }

    private loadConversionTrackingFrame(): void {
        try {
            if (ExternalInterface.available) {
                ExternalInterface.call("FlashExternalInterface.loadConversionTrackingFrame");
            } else {
                HabboTracking._log.warn("ExternalInterface is not available!");
            }
        } catch (e) {
        }
    }

    private onHotelViewEvent(param1: Event): void {
        switch (param1.type) {
            case "HHVE_START_LOAD":
                this.trackLoginStep("client.init.hotelview.start");
                break;
            case "HHVE_LOADED":
                this.trackLoginStep("client.init.hotelview.ok");
                break;
            case "HHVE_ERROR":
                this.trackLoginStep("client.init.hotelview.fail");
        }
    }

    private onConnectionEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_CONNECTION_EVENT_INIT":
                this.trackLoginStep("client.init.socket.init");
                break;
            case "HABBO_CONNECTION_EVENT_ESTABLISHED":
                this.trackLoginStep("client.init.socket.ok", String(this._communication.port));
                break;
            case "HABBO_CONNECTION_EVENT_HANDSHAKING":
                this.trackLoginStep("client.init.handshake.start");
                break;
            case "HABBO_CONNECTION_EVENT_HANDSHAKE_FAIL":
                this.trackLoginStep("client.init.handshake.fail");
                break;
            case "HABBO_CONNECTION_EVENT_HANDSHAKED":
                this.setErrorContextFlag(2, 0);
                this.trackLoginStep("client.init.handshake.ok");
                break;
            case "HABBO_CONNECTION_EVENT_AUTHENTICATED":
                this.setErrorContextFlag(3, 0);
                this.loadConversionTrackingFrame();
                this.trackLoginStep("client.init.auth.ok");
        }
        castTo(this.context, Component).events.removeEventListener(param1.type, this.onConnectionEvent);
    }

    private onWindowTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_WINDOW_TRACKING_EVENT_SLEEP":
                this.setErrorContextFlag(0, 3);
                break;
            case "HABBO_WINDOW_TRACKING_EVENT_RENDER":
                this.setErrorContextFlag(1, 3);
                break;
            case "HABBO_WINDOW_TRACKING_EVENT_INPUT":
                this.setErrorContextFlag(2, 3);
        }
    }

    private onError(param1: ErrorEvent): void {
        this.storeErrorDetails(param1);
        if (param1.critical) {
            this._SafeStr_6054 = true;
        }
        this.logError(this.context.root.getLastErrorMessage());
    }

    private storeErrorDetails(param1: ErrorEvent): void {
        let _loc3_: string = null;
        ErrorReportStorage.setParameter("is_fatal", param1.critical.toString());
        ErrorReportStorage.setParameter("crash_time", new Date().getTime().toString());
        let _loc4_: string = "";
        for (const _loc2_ of this._SafeStr_5312 ?? []) {
            _loc4_ += String(_loc2_);
        }
        ErrorReportStorage.setParameter("error_ctx", _loc4_);
        if (this._SafeStr_3367 != null) {
            ErrorReportStorage.setParameter("flash_version", this._SafeStr_3367.flashVersion);
            ErrorReportStorage.setParameter("avg_update", String(this._SafeStr_3367.averageUpdateInterval));
        }
        ErrorReportStorage.setParameter("error_desc", param1.message);
        ErrorReportStorage.setParameter("error_cat", String(param1.category));
        if (param1.error != null) {
            _loc3_ = Exception.getChainedStackTrace(param1.error);
            if (_loc3_ != null) {
                ErrorReportStorage.setParameter("error_data", _loc3_);
            }
        }
        this._communication.setMessageQueueErrorDebugData();
        ErrorReportStorage.addDebugData("Flash memory usage", "Memory usage: " + Math.round(System.totalMemory / 1048576) + " MB");
    }

    private onNavigatorTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_NAVIGATOR_TRACKING_EVENT_CLOSED":
                this.setErrorContextFlag(0, 4);
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_EVENTS":
                this.setErrorContextFlag(1, 4);
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_ROOMS":
                this.setErrorContextFlag(2, 4);
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_ME":
                this.setErrorContextFlag(3, 4);
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_OFFICIAL":
                this.setErrorContextFlag(4, 4);
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCH":
                this.setErrorContextFlag(5, 4);
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FAVOURITES":
                this.legacyTrackGoogle("navigator", "my_favorites");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_FRIENDS_ROOMS":
                this.legacyTrackGoogle("navigator", "my_friends_rooms");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_HISTORY":
                this.legacyTrackGoogle("navigator", "my_history");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_MY_ROOMS":
                this.legacyTrackGoogle("navigator", "my_rooms");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_OFFICIALROOMS":
                this.legacyTrackGoogle("navigator", "official_rooms");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_POPULAR_ROOMS":
                this.legacyTrackGoogle("navigator", "popular_rooms");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE":
                this.legacyTrackGoogle("navigator", "rooms_where_my_friends_are");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE":
                this.legacyTrackGoogle("navigator", "highest_score");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_TAG_SEARCH":
                this.legacyTrackGoogle("navigator", "tag_search");
                break;
            case "HABBO_NAVIGATOR_TRACKING_EVENT_SEARCHTYPE_TEXT_SEARCH":
                this.legacyTrackGoogle("navigator", "text_search");
        }
    }

    private onRoomSettingsTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_ROOM_SETTINGS_TRACKING_EVENT_CLOSED":
                this.setErrorContextFlag(0, 7);
                break;
            case "HABBO_ROOM_SETTINGS_TRACKING_EVENT_DEFAULT":
                this.setErrorContextFlag(1, 7);
                break;
            case "HABBO_ROOM_SETTINGS_TRACKING_EVENT_ADVANCED":
                this.setErrorContextFlag(2, 7);
        }
    }

    private onInventoryTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_INVENTORY_TRACKING_EVENT_CLOSED":
                this.setErrorContextFlag(0, 5);
                break;
            case "HABBO_INVENTORY_TRACKING_EVENT_FURNI":
                this.setErrorContextFlag(1, 5);
                break;
            case "HABBO_INVENTORY_TRACKING_EVENT_POSTERS":
                this.setErrorContextFlag(2, 5);
                break;
            case "HABBO_INVENTORY_TRACKING_EVENT_BADGES":
                this.setErrorContextFlag(3, 5);
                break;
            case "HABBO_INVENTORY_TRACKING_EVENT_ACHIEVEMENTS":
                this.setErrorContextFlag(4, 5);
                break;
            case "HABBO_INVENTORY_TRACKING_EVENT_TRADING":
                this.setErrorContextFlag(5, 5);
        }
    }

    private onCatalogPageOpened(param1: CatalogPageOpenedEvent): void {
        this.legacyTrackGoogle("catalogue", "page", [param1.pageLocalization]);
    }

    private onCatalogTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_CATALOG_TRACKING_EVENT_OPEN":
                this.setErrorContextFlag(1, 9);
                break;
            case "HABBO_CATALOG_TRACKING_EVENT_CLOSE":
                this.setErrorContextFlag(0, 9);
        }
    }

    private onFriendlistTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_FRIENDLIST_TRACKING_EVENT_CLOSED":
                this.setErrorContextFlag(0, 6);
                break;
            case "HABBO_FRIENDLIST_TRACKING_EVENT_FRIENDS":
                this.setErrorContextFlag(1, 6);
                break;
            case "HABBO_FRIENDLIST_TRACKING_EVENT_SEARCH":
                this.setErrorContextFlag(2, 6);
                break;
            case "HABBO_FRIENDLIST_TRACKING_EVENT_REQUEST":
                this.setErrorContextFlag(3, 6);
                break;
            case "HABBO_FRIENDLIST_TRACKING_EVENT_MINIMZED":
                this.setErrorContextFlag(4, 6);
        }
    }

    private onHelpTrackingEvent(param1: Event): void {
        switch (param1.type) {
            case "HABBO_HELP_TRACKING_EVENT_CLOSED":
                this.setErrorContextFlag(0, 10);
                break;
            case "HABBO_HELP_TRACKING_EVENT_DEFAULT":
                this.setErrorContextFlag(1, 10);
        }
    }

    private onConfigurationComplete(param1: Event): void {
        if (this._SafeStr_2879 != null) {
            this._SafeStr_2879.init();
        }
    }

    private onRoomAdLoad(param1: AdEvent): void {
        this.legacyTrackGoogle("room_ad", "show", [this.getAliasFromAdTechUrl(param1.clickUrl)]);
    }

    private onRoomAdClick(param1: RoomObjectRoomAdEvent): void {
        this.legacyTrackGoogle("room_ad", "click", [this.getAliasFromAdTechUrl(param1.clickUrl)]);
    }

    private onRoomAction(param1: RoomEngineEvent): void {
        if (param1.type == "REE_INITIALIZED") {
            if (!this._SafeStr_2612) {
                this._SafeStr_4831 = param1.roomId;
                this._SafeStr_2612 = new Timer(60000, 1);
                this._SafeStr_2612.addEventListener("timer", this.onRoomActionTimerEvent);
                this._SafeStr_2612.start();
            }
        } else if (param1.type == "REE_DISPOSED") {
            if (this._SafeStr_2612) {
                this._SafeStr_2612.removeEventListener("timer", this.onRoomActionTimerEvent);
                this._SafeStr_2612.stop();
                this._SafeStr_2612 = null;
                this._SafeStr_4831 = -1;
            }
        }
    }

    private onRoomActionTimerEvent(param1: TimerEvent): void {
        let _loc2_: string = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (!this.disposed && !this._SafeStr_6054 && this._communication != null && this._SafeStr_3613) {
            _loc2_ = null;
            if (this._roomEngine != null) {
                _loc3_ = this._roomEngine.getRoomObjectCount(this._roomEngine.activeRoomId, 100);
                _loc4_ = this._roomEngine.getRoomObjectCount(this._roomEngine.activeRoomId, 10) + this._roomEngine.getRoomObjectCount(this._roomEngine.activeRoomId, 20);
                _loc2_ = "Avatars: " + _loc3_ + ", Objects: " + _loc4_;
            }
            this.trackEventLog("ClientPerformance", String(this._SafeStr_3613.frameRate), "fps", _loc2_, this._SafeStr_4831);
            this._SafeStr_6767 = this._SafeStr_6767 + 1;
        }
    }

    private onToolbarClick(param1: HabboToolbarEvent): void {
        if (this._SafeStr_3840) {
            this._SafeStr_3840.track(param1.iconName);
        }
    }

    private onZoomToggle(param1: HabboToolbarEvent): void {
        if (this._SafeStr_3840) {
            this._SafeStr_3840.track(param1.type);
        }
    }

    protected override initInstanceFields(): void {
        this.onAchievementNotification = this.onAchievementNotification.bind(this);
        this.onAuthOK = this.onAuthOK.bind(this);
        this.onPingResponse = this.onPingResponse.bind(this);
        this.onRoomEnter = this.onRoomEnter.bind(this);
        this.onHotelViewEvent = this.onHotelViewEvent.bind(this);
        this.onConnectionEvent = this.onConnectionEvent.bind(this);
        this.onWindowTrackingEvent = this.onWindowTrackingEvent.bind(this);
        this.onError = this.onError.bind(this);
        this.onNavigatorTrackingEvent = this.onNavigatorTrackingEvent.bind(this);
        this.onRoomSettingsTrackingEvent = this.onRoomSettingsTrackingEvent.bind(this);
        this.onInventoryTrackingEvent = this.onInventoryTrackingEvent.bind(this);
        this.onCatalogPageOpened = this.onCatalogPageOpened.bind(this);
        this.onCatalogTrackingEvent = this.onCatalogTrackingEvent.bind(this);
        this.onFriendlistTrackingEvent = this.onFriendlistTrackingEvent.bind(this);
        this.onHelpTrackingEvent = this.onHelpTrackingEvent.bind(this);
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.onRoomAdLoad = this.onRoomAdLoad.bind(this);
        this.onRoomAdClick = this.onRoomAdClick.bind(this);
        this.onRoomAction = this.onRoomAction.bind(this);
        this.onRoomActionTimerEvent = this.onRoomActionTimerEvent.bind(this);
        this.onToolbarClick = this.onToolbarClick.bind(this);
        this.onZoomToggle = this.onZoomToggle.bind(this);
        this._SafeStr_6054 = false;
        this._SafeStr_3367 = null;
        this._SafeStr_3613 = null;
        this._SafeStr_2879 = null;
        this._SafeStr_5018 = null;
        this._SafeStr_3840 = null;
        this._roomEngine = null;
        this._SafeStr_6552 = false;
        this._currentTime = -1;
        this._SafeStr_5778 = 0;
        this._SafeStr_5618 = 0;
        this._SafeStr_6767 = 0;
        this._SafeStr_4831 = -1;
        preSuperHabboTracking.pop()!(this);
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboTracking.#staticsReady) return;
        HabboTracking.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboTracking, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.tracking.HabboTracking"));
    }

    get [IHabboTracking](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
