import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { AchievementCategory } from '@/com/sulake/habbo/quest/AchievementCategory';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { isIHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import { ActivateQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/ActivateQuestMessageComposer';
import { GetQuestsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetQuestsMessageComposer';
import { GetSeasonalQuestsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetSeasonalQuestsMessageComposer';
import { isIHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import { isIHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { Logger } from '@/com/sulake/habbo/Logger';
import { isIHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import { isIHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import { AchievementController } from '@/com/sulake/habbo/quest/AchievementController';
import { AchievementsResolutionController } from '@/com/sulake/habbo/quest/AchievementsResolutionController';
import { Animation } from '@/com/sulake/habbo/quest/Animation';
import { DailyTasksController } from '@/com/sulake/habbo/quest/dailytasks/DailyTasksController';
import { IncomingMessages } from '@/com/sulake/habbo/quest/IncomingMessages';
import { QuestController } from '@/com/sulake/habbo/quest/QuestController';
import { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import { RoomCompetitionController } from '@/com/sulake/habbo/quest/RoomCompetitionController';
import { Twinkle } from '@/com/sulake/habbo/quest/Twinkle';
import { TwinkleImages } from '@/com/sulake/habbo/quest/TwinkleImages';
import { isIRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { isIHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import { isISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { isIHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import { isIHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import { isIHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IIDDailyTasks } from '@/com/sulake/iid/IIDDailyTasks';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNewNavigator } from '@/com/sulake/iid/IIDHabboNewNavigator';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboUserDefinedRoomEvents } from '@/com/sulake/iid/IIDHabboUserDefinedRoomEvents';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRewardTrackController } from '@/com/sulake/iid/IIDRewardTrackController';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboQuestEngine extends Component implements IHabboQuestEngine, IUpdateReceiver, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.quest::HabboQuestEngine'); }

    private static readonly _log: number = 5;
    private static readonly TWINKLE_ANIMATION_START_TIME: number = 800;
    private static readonly TWINKLE_ANIMATION_OBJECT_COUNT: number = 15;
    private static readonly DELAY_BETWEEN_TWINKLE_STARTS: number = 300;
    private static readonly _SafeStr_7065: any[] = ["MOVEITEM", "ENTEROTHERSROOM", "CHANGEFIGURE", "FINDLIFEGUARDTOWER", "SCRATCHAPET"];

    declare private _windowManager: IHabboWindowManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _configuration: ICoreConfiguration;

    declare private _incomingMessages: IncomingMessages;

    declare private _questController: QuestController;

    declare private _achievementController: AchievementController;

    declare private _roomCompetitionController: RoomCompetitionController;

    declare private _toolbar: IHabboToolbar;

    declare private _catalog: IHabboCatalog;

    declare private _navigator: IHabboNewNavigator;

    declare private _notifications: IHabboNotifications;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _habboHelp: IHabboHelp;

    declare private _tracking: IHabboTracking;

    declare private _twinkleImages: TwinkleImages;

    private _currentlyInRoom: boolean = false;

    declare private _roomEngine: IRoomEngine;

    private _isFirstLoginOfDay: boolean = false;

    declare private _wired: IHabboUserDefinedRoomEvents;

    declare private _SafeStr_14357: DailyTasksController;

    declare private _rewardTrack: RewardTrackController;

    declare private _SafeStr_14358: AchievementsResolutionController;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._questController = new QuestController(this);
        this._achievementController = new AchievementController(this);
        this._SafeStr_14358 = new AchievementsResolutionController(this);
        this._roomCompetitionController = new RoomCompetitionController(this);
        this.queueInterface(new IIDHabboCommunicationManager(), this.onCommunicationComponentInit);
        this.queueInterface(new IIDHabboWindowManager(), this.onWindowManagerReady);
        this.queueInterface(new IIDHabboLocalizationManager(), this.onLocalizationReady);
        this.queueInterface(new IIDHabboConfigurationManager(), this.onConfigurationReady);
        this.queueInterface(new IIDHabboToolbar(), this.onToolbarReady);
        this.queueInterface(new IIDHabboCatalog(), this.onCatalogReady);
        this.queueInterface(new IIDHabboNotifications(), this.onNotificationsReady);
        this.queueInterface(new IIDHabboHelp(), this.onHabboHelpReady);
        this.queueInterface(new IIDHabboNewNavigator(), this.onHabboNavigatorReady);
        this.queueInterface(new IIDSessionDataManager(), this.onSessionDataManagerReady);
        this.queueInterface(new IIDRoomEngine(), this.onRoomEngineReady);
        this.queueInterface(new IIDHabboTracking(), this.onTrackingReady);
        this.queueInterface(new IIDHabboUserDefinedRoomEvents(), this.onWiredReady);
        param1.addLinkEventTracker(this);
        this._SafeStr_14357 = new DailyTasksController(this, param1, 0, param3);
        param1.attachComponent(this._SafeStr_14357, [new IIDDailyTasks()]);
        this._rewardTrack = new RewardTrackController(this, param1, 0, param3);
        param1.attachComponent(this._rewardTrack, [new IIDRewardTrackController()]);
        this.registerUpdateReceiver(this, 5);
    }

    public static moveChildrenToRow(param1: IWindowContainer, param2: any[], param3: number, param4: number): void {
        let _loc6_: IWindow = null;
        for (const _loc5_ of param2 ?? []) {
            _loc6_ = param1.getChildByName(stringOrNull(_loc5_));
            if (_loc6_ != null && _loc6_.visible) {
                _loc6_.x = param3;
                param3 += _loc6_.width + param4;
            }
        }
    }

    public override dispose(): void {
        this.removeUpdateReceiver(this);
        this.context.removeLinkEventTracker(this);
        if (this._toolbar) {
            this._toolbar.release(new IIDHabboToolbar());
            this._toolbar = null;
        }
        if (this._catalog != null) {
            this._catalog.release(new IIDHabboCatalog());
            this._catalog = null;
        }
        if (this._notifications != null) {
            this._notifications.release(new IIDHabboNotifications());
            this._notifications = null;
        }
        if (this._wired != null) {
            this._wired.release(new IIDHabboUserDefinedRoomEvents());
            this._wired = null;
        }
        if (this._windowManager != null) {
            this._windowManager.release(new IIDHabboWindowManager());
            this._windowManager = null;
        }
        if (this._localization != null) {
            this._localization.release(new IIDHabboLocalizationManager());
            this._localization = null;
        }
        if (this._configuration != null) {
            this._configuration.release(new IIDHabboConfigurationManager());
            this._configuration = null;
        }
        if (this._communication != null) {
            this._communication.release(new IIDHabboCommunicationManager());
            this._communication = null;
        }
        if (this._sessionDataManager != null) {
            this._sessionDataManager.events.removeEventListener("BIRE_BADGE_IMAGE_READY", this._achievementController.onBadgeImageReady);
            this._sessionDataManager.release(new IIDSessionDataManager());
            this._sessionDataManager = null;
        }
        if (this._incomingMessages) {
            this._incomingMessages.dispose();
        }
        if (this._habboHelp != null) {
            this._habboHelp.release(new IIDHabboHelp());
            this._habboHelp = null;
        }
        if (this._navigator != null) {
            this._navigator.release(new IIDHabboNewNavigator());
            this._navigator = null;
        }
        if (this._tracking != null) {
            this._tracking.release(new IIDHabboTracking());
            this._tracking = null;
        }
        if (this._twinkleImages) {
            this._twinkleImages.dispose();
            this._twinkleImages = null;
        }
        if (this._roomEngine) {
            this._roomEngine.release(new IIDRoomEngine());
            this._roomEngine = null;
        }
        if (this._SafeStr_14358) {
            this._SafeStr_14358.dispose();
            this._SafeStr_14358 = null;
        }
        if (this._rewardTrack) {
            this._rewardTrack.dispose();
            this._rewardTrack = null;
        }
        super.dispose();
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        let _loc5_: IAsset = null;
        let _loc3_: XmlAsset = null;
        let _loc4_: IWindow = null;
        try {
            _loc5_ = this.assets.getAssetByName(param1);
            _loc3_ = castTo(_loc5_, XmlAsset);
            _loc4_ = this._windowManager.buildFromXML(XML.from(_loc3_.content), param2 >>> 0);
        } catch (e) {
        }
        return _loc4_;
    }

    private onCommunicationComponentInit = (param1: IID = null, param2: IUnknown = null): void => {
        this._communication = castGuarded(param2, isIHabboCommunicationManager, "com.sulake.habbo.communication.IHabboCommunicationManager");
        this._incomingMessages = new IncomingMessages(this);
    };

    private onWindowManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._windowManager = castGuarded(param2, isIHabboWindowManager, "com.sulake.habbo.window.IHabboWindowManager");
    };

    private onLocalizationReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._localization = castGuarded(param2, isIHabboLocalizationManager, "com.sulake.habbo.localization.IHabboLocalizationManager");
    };

    private onConfigurationReady = (param1: IID, param2: IUnknown): void => {
        if (param2 == null) {
            return;
        }
        this._configuration = isICoreConfiguration(param2) ? param2 : null;
    };

    private onCatalogReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._catalog = isIHabboCatalog(param2) ? param2 : null;
    };

    private onNotificationsReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._notifications = isIHabboNotifications(param2) ? param2 : null;
    };

    private onSessionDataManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._sessionDataManager = isISessionDataManager(param2) ? param2 : null;
        this._sessionDataManager.events.addEventListener("BIRE_BADGE_IMAGE_READY", this._achievementController.onBadgeImageReady);
    };

    private onHabboHelpReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._habboHelp = isIHabboHelp(param2) ? param2 : null;
    };

    private onHabboNavigatorReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._navigator = isIHabboNewNavigator(param2) ? param2 : null;
    };

    private onRoomEngineReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._roomEngine = isIRoomEngine(param2) ? param2 : null;
    };

    private onTrackingReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._tracking = isIHabboTracking(param2) ? param2 : null;
    };

    private onWiredReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._wired = isIHabboUserDefinedRoomEvents(param2) ? param2 : null;
    };

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get questController(): QuestController {
        return this._questController;
    }

    public get roomCompetitionController(): RoomCompetitionController {
        return this._roomCompetitionController;
    }

    public get achievementController(): AchievementController {
        return this._achievementController;
    }

    public get achievementsResolutionController(): AchievementsResolutionController {
        return this._SafeStr_14358;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get tracking(): IHabboTracking {
        return this._tracking;
    }

    public get wired(): IHabboUserDefinedRoomEvents {
        return this._wired;
    }

    public openCatalog(param1: QuestMessageData): void {
        let _loc2_: string = param1.catalogPageName;
        if (_loc2_ != "") {
            Logger.log("Questing->Open Catalog: " + _loc2_);
            this._catalog.openCatalogPage(_loc2_);
        } else {
            Logger.log("Questing->Open Catalog: Quest Catalog page name not defined");
            this._catalog.openCatalog();
        }
    }

    public openNavigator(param1: QuestMessageData): void {
        let _loc3_: string = null;
        let _loc2_: boolean = this.hasLocalizedValue(param1.getQuestLocalizationKey() + ".searchtag");
        if (_loc2_) {
            _loc3_ = param1.getQuestLocalizationKey() + ".searchtag";
        } else {
            _loc3_ = param1.getCampaignLocalizationKey() + ".searchtag";
        }
        let _loc4_: string = this._localization.getLocalization(_loc3_);
        Logger.log("Questing->Open Navigator: " + _loc4_);
        this._navigator.performTagSearch(_loc4_);
    }

    public hasQuestRoomsIds(): boolean {
        let _loc1_: string = this.getQuestRoomIds();
        return _loc1_ != null && _loc1_ != "";
    }

    private getQuestRoomIds(): string {
        return this._localization.getLocalization("quests." + this.getSeasonalCampaignCodePrefix() + ".roomids");
    }

    public goToQuestRooms(): void {
        if (!this.hasQuestRoomsIds()) {
            return;
        }
        let _loc4_: string = this.getQuestRoomIds();
        let _loc2_: any[] = _loc4_.split(",");
        if (_loc2_.length == 0) {
            return;
        }
        let _loc3_: number = Math.max(0, Math.min(_loc2_.length - 1, Math.floor(Math.random() * _loc2_.length))) | 0;
        let _loc1_: string = stringOrNull(_loc2_[_loc3_]);
        let _loc5_: number = Number(_loc1_) | 0;
        Logger.log("Forwarding to a guest room: " + _loc5_);
        this._navigator.goToRoom(_loc5_);
    }

    private onToolbarReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._toolbar = asGuarded(castGuarded(param2, isIHabboToolbar, "com.sulake.habbo.toolbar.IHabboToolbar"), isIHabboToolbar);
        this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onHabboToolbarEvent);
    };

    private onHabboToolbarEvent = (param1: HabboToolbarEvent): void => {
        if (param1.type == "HTE_TOOLBAR_CLICK") {
            if (param1.iconId == "HTIE_ICON_ACHIEVEMENTS") {
                this._achievementController.onToolbarClick();
            }
        }
    };

    public ensureAchievementsInitialized(): void {
        if (this._achievementController != null) {
            this._achievementController.ensureAchievementsInitialized();
        }
    }

    public showAchievements(): void {
        if (this._achievementController != null) {
            this._achievementController.show();
        }
    }

    public showQuests(): void {
        if (this._questController != null && !this._questController.questsList.isVisible()) {
            this._questController.onToolbarClick();
        }
    }

    public getAchievementLevel(param1: string, param2: string): number {
        if (this._achievementController != null) {
            return this._achievementController.getAchievementLevel(param1, param2);
        }
        return 0;
    }

    public reenableRoomCompetitionWindow(): void {
        this._roomCompetitionController.dontShowAgain = false;
    }

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get rewardTrack(): RewardTrackController {
        return this._rewardTrack;
    }

    public send(param1: IMessageComposer): void {
        this.communication.connection.send(param1);
    }

    public getQuestRowTitle(param1: QuestMessageData): string {
        let _loc2_: string = param1.waitPeriodSeconds < 1 ? param1.getQuestLocalizationKey() + ".name" : "quests.list.questdelayed";
        return this._localization.getLocalization(_loc2_, _loc2_);
    }

    public getQuestName(param1: QuestMessageData): string {
        let _loc2_: string = param1.getQuestLocalizationKey() + ".name";
        return this._localization.getLocalization(_loc2_, _loc2_);
    }

    public getQuestDesc(param1: QuestMessageData): string {
        let _loc2_: string = param1.getQuestLocalizationKey() + ".desc";
        return this._localization.getLocalization(_loc2_, _loc2_);
    }

    public getQuestHint(param1: QuestMessageData): string {
        let _loc2_: string = param1.getQuestLocalizationKey() + ".hint";
        return this._localization.getLocalization(_loc2_, _loc2_);
    }

    public getCampaignNameByCode(param1: string): string {
        let _loc2_: string = param1 + ".name";
        return this._localization.getLocalization(_loc2_, _loc2_);
    }

    public getCampaignName(param1: QuestMessageData): string {
        return this.getCampaignNameByCode(param1.getCampaignLocalizationKey());
    }

    public getAchievementCategoryName(param1: string): string {
        let _loc2_: string = "quests." + param1 + ".name";
        return this._localization.getLocalization(_loc2_, _loc2_);
    }

    public setupQuestImage(param1: IWindowContainer, param2: QuestMessageData): void {
        let _loc3_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("quest_pic_bitmap"), isIStaticBitmapWrapperWindow);
        let _loc4_: string = param2.waitPeriodSeconds > 0 ? "quest_timer_questionmark" : (param2.campaignCode + "_" + param2.localizationCode + param2.imageVersion + (this.isQuestWithPrompts(param2) ? "_a" : "")).toLowerCase();
        _loc3_.assetUri = "${image.library.questing.url}" + _loc4_ + ".png";
    }

    public setupPromptFrameImage(param1: IWindowContainer, param2: QuestMessageData, param3: string): void {
        let _loc4_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("prompt_pic_" + param3), isIStaticBitmapWrapperWindow);
        _loc4_.assetUri = "${image.library.questing.url}" + (param2.campaignCode + "_" + param2.localizationCode + param2.imageVersion + "_" + param3).toLowerCase() + ".png";
    }

    public setupRewardImage(param1: IWindowContainer, param2: number): void {
        let _loc3_: IWindow = param1.findChildByName("currency_icon");
        _loc3_.style = ActivityPointTypeEnum.getIconStyleFor(param2, this, true) >>> 0;
    }

    public setupCampaignImage(param1: IWindowContainer, param2: QuestMessageData, param3: boolean): void {
        let _loc4_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("campaign_pic_bitmap"), isIStaticBitmapWrapperWindow);
        if (!param3) {
            _loc4_.visible = false;
            return;
        }
        _loc4_.visible = true;
        let _loc5_: string = param2.campaignCode;
        if (this.isSeasonalQuest(param2)) {
            _loc5_ = this.getSeasonalCampaignCodePrefix() + "_campaign_icon";
        }
        _loc4_.assetUri = "${image.library.questing.url}" + _loc5_ + ".png";
    }

    public setupAchievementCategoryImage(param1: IWindowContainer, param2: AchievementCategory, param3: boolean): void {
        let _loc4_: IStaticBitmapWrapperWindow = asGuarded(param1.findChildByName("category_pic_bitmap"), isIStaticBitmapWrapperWindow);
        _loc4_.assetUri = "";
        _loc4_.assetUri = "${image.library.questing.url}" + (param3 ? "ach_category_" + param2.code : "achicon_" + param2.code) + ".png";
    }

    public isQuestWithPrompts(param1: QuestMessageData): boolean {
        return HabboQuestEngine._SafeStr_7065.indexOf(param1.localizationCode) > -1;
    }

    public refreshReward(param1: boolean, param2: IWindowContainer, param3: number, param4: number): void {
        param1 = param3 < 0 || param4 < 1 ? false : param1;
        let _loc5_: IWindow = param2.findChildByName("reward_caption_txt");
        let _loc6_: IWindow = param2.findChildByName("reward_amount_txt");
        let _loc7_: IWindow = param2.findChildByName("currency_icon");
        _loc6_.visible = param1;
        _loc5_.visible = param1;
        _loc7_.visible = param1;
        if (!param1) {
            return;
        }
        _loc6_.caption = "" + param4;
        HabboQuestEngine.moveChildrenToRow(param2, ["reward_caption_txt", "reward_amount_txt", "currency_icon"], _loc5_.x, 3);
        this.setupRewardImage(param2, param3);
    }

    public update(param1: number): void {
        this._questController.update(param1);
        this._achievementController.update(param1);
        this._SafeStr_14357.update(param1);
        this._rewardTrack.update(param1);
    }

    public getTwinkleAnimation(param1: IWindowContainer): Animation {
        let _loc3_: number = 0;
        if (this._twinkleImages == null) {
            this._twinkleImages = new TwinkleImages(this);
        }
        let _loc4_: number = 800;
        let _loc2_: Animation = new Animation(castGuarded(param1.findChildByName("twinkle_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow"));
        _loc3_ = 0;
        while (_loc3_ < 15) {
            _loc2_.addObject(new Twinkle(this._twinkleImages, _loc4_));
            _loc4_ += 300;
            _loc3_++;
        }
        return _loc2_;
    }

    public get currentlyInRoom(): boolean {
        return this._currentlyInRoom;
    }

    public set currentlyInRoom(param1: boolean) {
        this._currentlyInRoom = param1;
    }

    public isSeasonalCalendarEnabled(): boolean {
        return this._configuration.getBoolean("seasonalQuestCalendar.enabled");
    }

    public isSeasonalQuest(param1: QuestMessageData): boolean {
        let _loc2_: string = this.getSeasonalCampaignCodePrefix();
        return _loc2_ != "" && param1.campaignCode.indexOf(_loc2_) == 0;
    }

    public getSeasonalCampaignCodePrefix(): string {
        return this.getProperty("seasonalQuestCalendar.campaignPrefix");
    }

    public setIsFirstLoginOfDay(param1: boolean): void {
        this._isFirstLoginOfDay = param1;
    }

    public get isFirstLoginOfDay(): boolean {
        return this._isFirstLoginOfDay;
    }

    public get configuration(): ICoreConfiguration {
        return this._configuration;
    }

    public hasLocalizedValue(param1: string): boolean {
        return this._localization.getLocalization(param1, "") != "";
    }

    public get navigator(): IHabboNewNavigator {
        return this._navigator;
    }

    public requestSeasonalQuests = (): void => {
        this.send(new GetSeasonalQuestsMessageComposer());
    };

    public requestQuests = (): void => {
        this.send(new GetQuestsMessageComposer());
    };

    public activateQuest(param1: number): void {
        this.send(new ActivateQuestMessageComposer(param1));
    }

    public get linkPattern(): string {
        return "questengine/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        switch (_loc2_[1]) {
            case "gotorooms":
                this.goToQuestRooms();
                break;
            case "achievements":
                if (_loc2_.length == 3) {
                    this._achievementController.show();
                    this._achievementController.selectCategoryInternalLink(stringOrNull(_loc2_[2]));
                } else {
                    this.showAchievements();
                }
                break;
            case "calendar":
                this._questController.seasonalCalendarWindow.onToolbarClick();
                break;
            case "quests":
                this._questController.onToolbarClick();
                break;
            default:
                Logger.log("QuestEngine unknown link-type received: " + _loc2_[1]);
        }
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
