import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { UnseenForumsCountUpdatedEvent } from '@/com/sulake/habbo/friendbar/groupforums/UnseenForumsCountUpdatedEvent';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { HabboInventoryHabboClubEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryHabboClubEvent';
import type { HabboUnseenItemsUpdatedEvent } from '@/com/sulake/habbo/inventory/events/HabboUnseenItemsUpdatedEvent';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { MiniMailMessageEvent } from '@/com/sulake/habbo/messenger/events/MiniMailMessageEvent';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import type { UnseenAchievementsCountUpdateEvent } from '@/com/sulake/habbo/quest/events/UnseenAchievementsCountUpdateEvent';
import type { UnseenDailyTasksCountUpdateEvent } from '@/com/sulake/habbo/quest/events/UnseenDailyTasksCountUpdateEvent';
import type { UnseenRewardTrackRewardsCountUpdateEvent } from '@/com/sulake/habbo/quest/events/UnseenRewardTrackRewardsCountUpdateEvent';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { WiredMenuEvent } from '@/com/sulake/habbo/roomevents/events/WiredMenuEvent';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { PerksUpdatedEvent } from '@/com/sulake/habbo/session/events/PerksUpdatedEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IExtensionView } from '@/com/sulake/habbo/toolbar/IExtensionView';
import type { IRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component, CoreComponentContext } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCampaigns } from '@/com/sulake/habbo/campaign/HabboCampaigns';
import { PurseEvent } from '@/com/sulake/habbo/catalog/purse/PurseEvent';
import { UserRightsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserRightsMessageEvent';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboNuxDialogs } from '@/com/sulake/habbo/nux/HabboNuxDialogs';
import { HabboPhoneNumber } from '@/com/sulake/habbo/phonenumber/HabboPhoneNumber';
import { BottomBackgroundBorder } from '@/com/sulake/habbo/toolbar/BottomBackgroundBorder';
import { BottomBarLeft } from '@/com/sulake/habbo/toolbar/BottomBarLeft';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { CitizenshipVipDiscountPromoExtension } from '@/com/sulake/habbo/toolbar/extensions/CitizenshipVipDiscountPromoExtension';
import { CitizenshipVipQuestsPromoExtension } from '@/com/sulake/habbo/toolbar/extensions/CitizenshipVipQuestsPromoExtension';
import { ClubDiscountPromoExtension } from '@/com/sulake/habbo/toolbar/extensions/ClubDiscountPromoExtension';
import { SeasonalCurrencyIndicator } from '@/com/sulake/habbo/toolbar/extensions/purse/indicators/SeasonalCurrencyIndicator';
import { PurseAreaExtension } from '@/com/sulake/habbo/toolbar/extensions/PurseAreaExtension';
import { SettingsExtension } from '@/com/sulake/habbo/toolbar/extensions/SettingsExtension';
import { VideoOfferExtension } from '@/com/sulake/habbo/toolbar/extensions/VideoOfferExtension';
import { ExtensionView } from '@/com/sulake/habbo/toolbar/ExtensionView';
import { HabboToolbarIconEnum } from '@/com/sulake/habbo/toolbar/HabboToolbarIconEnum';
import { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import { OfferExtension } from '@/com/sulake/habbo/toolbar/offers/OfferExtension';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDCoreLocalizationManager } from '@/com/sulake/iid/IIDCoreLocalizationManager';
import { IIDHabboCampaigns } from '@/com/sulake/iid/IIDHabboCampaigns';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboGroupForumController } from '@/com/sulake/iid/IIDHabboGroupForumController';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboMessenger } from '@/com/sulake/iid/IIDHabboMessenger';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboNewNavigator } from '@/com/sulake/iid/IIDHabboNewNavigator';
import { IIDHabboNuxDialogs } from '@/com/sulake/iid/IIDHabboNuxDialogs';
import { IIDHabboPhoneNumber } from '@/com/sulake/iid/IIDHabboPhoneNumber';
import { IIDHabboQuestEngine } from '@/com/sulake/iid/IIDHabboQuestEngine';
import { IIDHabboRoomUI } from '@/com/sulake/iid/IIDHabboRoomUI';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboUserDefinedRoomEvents } from '@/com/sulake/iid/IIDHabboUserDefinedRoomEvents';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';

export class HabboToolbar extends Component implements IHabboToolbar {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::HabboToolbar'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _view: BottomBarLeft;

    declare private _SafeStr_7429: BottomBackgroundBorder;

    declare private _isInitialized: boolean;

    declare private _SafeStr_2598: PurseAreaExtension;

    declare private _SafeStr_3275: SettingsExtension;

    declare private _connection: IConnection;

    declare private _catalog: IHabboCatalog;

    declare private _messenger: IHabboMessenger;

    declare private _navigator: IHabboNavigator;

    declare private _newNavigator: IHabboNewNavigator;

    declare private _roomEvents: IHabboUserDefinedRoomEvents;

    declare private _SafeStr_14223: SeasonalCurrencyIndicator[];

    declare private _SafeStr_3633: ClubDiscountPromoExtension;

    declare private _SafeStr_4520: CitizenshipVipQuestsPromoExtension;

    declare private _SafeStr_3813: CitizenshipVipDiscountPromoExtension;

    declare private _SafeStr_3462: VideoOfferExtension;

    declare private _localization: ICoreLocalizationManager;

    declare private _inventory: IHabboInventory;

    declare private _extensionView: ExtensionView;

    declare private _soundManager: IHabboSoundManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _habboHelp: IHabboHelp;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _questEngine: IHabboQuestEngine;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _roomUI: IRoomUI;

    declare private _offerExtension: OfferExtension;

    declare private _SafeStr_2745: Timer;

    declare private _SafeStr_3179: Timer;

    declare private _SafeStr_3118: Timer;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        param1.attachComponent(new HabboPhoneNumber(param1, 0, param3), [new IIDHabboPhoneNumber()]);
        param1.attachComponent(new HabboNuxDialogs(param1, 0, param3), [new IIDHabboNuxDialogs()]);
        param1.attachComponent(new HabboCampaigns(param1, 0, param3), [new IIDHabboCampaigns()]);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboConfigurationManager(), null, true, [{ "type": "complete", "callback": this.onConfigurationComplete }]), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }, true), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, true, [{ "type": "CATALOG_INITIALIZED", "callback": this.onCatalogEvent }, { "type": "CATALOG_NOT_READY", "callback": this.onCatalogEvent }, { "type": "CATALOG_NEW_ITEMS_SHOW", "callback": this.onCatalogEvent }, { "type": "CATALOG_NEW_ITEMS_HIDE", "callback": this.onCatalogEvent }]), new ComponentDependency(new IIDCoreLocalizationManager(), (param1: ICoreLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }, false, [{ "type": "HUIUE_UNSEEN_ITEMS_CHANGED", "callback": this.onUnseenItemsUpdate }, { "type": "HIHCE_HABBO_CLUB_CHANGED", "callback": this.onClubChanged }]), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }, true, [{ "type": "PUE_perks_updated", "callback": this.onPerksUpdated }]), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._habboHelp = param1;
         }, false), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }, false), new ComponentDependency(new IIDHabboRoomUI(), (param1: IRoomUI): void => {
             this._roomUI = param1;
         }, false), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }, false), new ComponentDependency(new IIDHabboQuestEngine(), (param1: IHabboQuestEngine): void => {
             this._questEngine = param1;
         }, false, [{ "type": "qe_uacue", "callback": this.onUnseenAchievementsCountUpdate }, { "type": "qe_udtcue", "callback": this.onUnseenDailyTasksCountUpdate }, { "type": "qe_urtrcue", "callback": this.onUnseenRewardTrackRewardsCountUpdate }]), new ComponentDependency(new IIDHabboMessenger(), (param1: IHabboMessenger): void => {
             this._messenger = param1;
         }, false, [{ "type": "MMME_new", "callback": this.onMiniMailUpdate }, { "type": "MMME_unread", "callback": this.onMiniMailUpdate }, { "type": "HUIUE_UNSEEN_ITEMS_CHANGED", "callback": this.onUnseenItemsUpdate }]), new ComponentDependency(new IIDHabboGroupForumController(), null, false, [{ "type": "UNSEEN_FORUMS_COUNT", "callback": this.onUnseenForumsCountUpdate }]), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }, false), new ComponentDependency(new IIDHabboNewNavigator(), (param1: IHabboNewNavigator): void => {
             this._newNavigator = param1;
         }, false), new ComponentDependency(new IIDHabboUserDefinedRoomEvents(), (param1: IHabboUserDefinedRoomEvents): void => {
             this._roomEvents = param1;
         }, false, [{ "type": "WIRED_MENU_BUTTON_PREFERENCE_CHANGED", "callback": this.onWiredMenuEvent }])]);
    }

    public override dispose(): void {
        this._isInitialized = false;
        this._connection = null;
        this.destroyClientPromoTimer();
        this.destroyDimmerTimer();
        this.destroyOwnRoomPromoTimer();
        if (this._extensionView) {
            this._extensionView.dispose();
            this._extensionView = null;
        }
        if (this._SafeStr_2598) {
            this._SafeStr_2598.dispose();
            this._SafeStr_2598 = null;
        }
        if (this._SafeStr_3275) {
            this._SafeStr_3275.dispose();
            this._SafeStr_3275 = null;
        }
        if (this._SafeStr_14223 != null) {
            for (const _loc1_ of this._SafeStr_14223 ?? []) {
                _loc1_.dispose();
            }
            this._SafeStr_14223 = null;
        }
        if (this._offerExtension != null) {
            this._offerExtension.dispose();
            this._offerExtension = null;
        }
        if (this._SafeStr_3633) {
            this._SafeStr_3633.dispose();
            this._SafeStr_3633 = null;
        }
        if (this._SafeStr_4520) {
            this._SafeStr_4520.dispose();
            this._SafeStr_4520 = null;
        }
        if (this._SafeStr_3813) {
            this._SafeStr_3813.dispose();
            this._SafeStr_3813 = null;
        }
        if (this._SafeStr_3462) {
            this._SafeStr_3462.dispose();
            this._SafeStr_3462 = null;
        }
        if (this._messenger != null) {
            if (this._messenger.events) {
                this._messenger.events.removeEventListener("MMME_new", this.onMiniMailUpdate);
                this._messenger.events.removeEventListener("MMME_unread", this.onMiniMailUpdate);
            }
            this._messenger = null;
        }
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        super.dispose();
    }

    private onConfigurationComplete(param1: Event): void {
    }

    protected override initComponent(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        this._connection = this._communicationManager.connection;
        this._communicationManager.addHabboConnectionMessageEvent(new UserRightsMessageEvent(this.onUserRights));
        this._SafeStr_7429 = new BottomBackgroundBorder(this);
        this._view = new BottomBarLeft(this, this._windowManager, this.assets, this.events);
        this._view.window.visible = false;
        this.initRoomEnterEffect();
        this._extensionView = new ExtensionView(this._windowManager, this.assets, this);
        if (this._view == null) {
            Logger.log("Error, toolbar view was not available");
            return;
        }
        let _loc3_: string = this.getProperty("new.user.wing");
        if (_loc3_ != "") {
            _loc1_ = this.getInteger("new.user.promo.delay", 10) * 1000;
            if (_loc1_ > 0 && this._SafeStr_3179 == null) {
                this._SafeStr_3179 = new Timer(_loc1_, 1);
                this._SafeStr_3179.addEventListener("timerComplete", this.onShowClientPromo);
                this._SafeStr_3179.start();
            }
            if (_loc3_ == "social" || _loc3_ == "quest" || _loc3_ == "group" || _loc3_ == "game") {
                _loc2_ = this.getInteger("new.user.promo.room.delay", 180) * 1000;
                if (_loc2_ > 0 && this._SafeStr_3118 == null) {
                    this._SafeStr_3118 = new Timer(_loc2_, 1);
                    this._SafeStr_3118.addEventListener("timerComplete", this.onShowOwnRoomPromo);
                    this._SafeStr_3118.start();
                }
            }
        }
    }

    private onPerksUpdated(param1: PerksUpdatedEvent): void {
        if (this._extensionView && !this._isInitialized) {
            this.initPurseAreaExtension();
            this.initSeasonalCurrencyExtension();
            this.initVipExtendExtension();
            this.initCitizenshipVipExtendExtension();
            this.initCitizenshipVipQuestsExtension();
            this.initVideoOfferExtension();
            this.initOfferExtension();
            this.initSettingsExtension();
            this._isInitialized = true;
        }
    }

    private onCatalogEvent(param1: CatalogEvent): void {
        if (this._view) {
            this._view.onCatalogEvent(param1);
        }
    }

    private onWiredMenuEvent(param1: WiredMenuEvent): void {
        if (this._view) {
            this._view.onWiredMenuEvent(param1);
        }
    }

    private onUserRights(param1: IMessageEvent): void {
        if (!this._SafeStr_3462) {
            this.initVideoOfferExtension();
        }
    }

    private onShowClientPromo(param1: TimerEvent): void {
        let _loc3_: string = null;
        let _loc2_: string = null;
        this.destroyClientPromoTimer();
        let _loc5_: string = this.getProperty("new.user.wing");
        let _loc4_: number = 0;
        let _loc6_: string = null;
        switch (_loc5_) {
            case "social":
                _loc3_ = "new.user.promo.social";
                _loc2_ = "HTIE_ICON_NAVIGATOR";
                _loc6_ = "NAVIGATOR";
                break;
            case "group":
                _loc3_ = "new.user.promo.group";
                _loc2_ = "HTIE_EXT_GROUP";
                _loc4_ = 1;
                break;
            case "quest":
                _loc3_ = "new.user.promo.quest";
                _loc2_ = "HTIE_ICON_PROGRESSION";
                _loc6_ = "QUESTS";
                break;
            case "game":
                _loc3_ = "new.user.promo.game";
                _loc2_ = "HTIE_ICON_GAMES";
                _loc6_ = "GAMES";
                break;
            default:
                return;
        }
        if (this.getIconLocation(_loc2_) != null) {
            this._habboHelp.showWelcomeScreen(_loc2_, _loc3_, _loc4_, _loc6_);
        }
    }

    private onShowOwnRoomPromo(param1: TimerEvent): void {
        this.destroyOwnRoomPromoTimer();
        this._habboHelp.showWelcomeScreen("HTIE_ICON_NAVIGATOR", "new.user.promo.room", 0, "NAVIGATOR_ME_TAB");
    }

    private initRoomEnterEffect(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (!this.isNewIdentity()) {
            return;
        }
        if (this.getBoolean("room.enter.effect.enabled")) {
            _loc1_ = this.getInteger("room.enter.effect.delay", 4000);
            _loc2_ = this.getInteger("room.enter.effect.duration", 2000);
            RoomEnterEffect.init(_loc1_, _loc2_);
            this.createAndAttachDimmerWindow(castGuarded(this._view.window, isIWindowContainer, "com.sulake.core.window.IWindowContainer"));
            if (this._SafeStr_2745 == null) {
                this._SafeStr_2745 = new Timer(_loc1_ + _loc2_, 1);
                this._SafeStr_2745.addEventListener("timerComplete", this.onRemoveDimmer);
                this._SafeStr_2745.start();
            }
        }
    }

    private initPurseAreaExtension(): void {
        this._SafeStr_2598 = new PurseAreaExtension(this, this._catalog);
        this._SafeStr_2598.getClubArea().onClubChanged();
    }

    private initSettingsExtension(): void {
        this._SafeStr_3275 = new SettingsExtension(this);
    }

    private initSeasonalCurrencyExtension(): void {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        let _loc3_: SeasonalCurrencyIndicator = null;
        let _loc5_: PurseEvent = null;
        if (!this.getBoolean("seasonalcurrencyindicator.enabled")) {
            return;
        }
        let _loc4_: number[] = this.getSeasonalCurrencyTypes();
        this._SafeStr_14223 = [];
        _loc2_ = 0;
        while (_loc2_ < _loc4_.length) {
            _loc1_ = _loc4_[_loc2_];
            _loc3_ = new SeasonalCurrencyIndicator(this, this._windowManager, this.assets, this._catalog, this._localization, _loc1_, 5 + _loc2_);
            _loc5_ = new PurseEvent("catalog_purse_activity_point_balance", this._catalog.getPurse().getActivityPointsForType(_loc1_), _loc1_);
            _loc3_.onBalance(_loc5_);
            this._SafeStr_14223.push(_loc3_);
            _loc2_++;
        }
    }

    private getSeasonalCurrencyTypes(): number[] {
        let _loc5_: string = null;
        let _loc7_: number = NaN;
        let _loc6_: number = 0;
        let _loc3_: number[] = [];
        let _loc4_: string = this.getProperty("seasonalcurrencyindicator.active");
        if (_loc4_ == null || _loc4_ == "") {
            return _loc3_;
        }
        let _loc2_: any[] = _loc4_.split(",");
        for (const _loc1_ of _loc2_ ?? []) {
            _loc5_ = stringOrNull(_loc1_.replace(/^\s+|\s+$/g, ""));
            if (_loc5_ != "") {
                _loc7_ = Number(_loc5_);
                if (!isNaN(_loc7_)) {
                    _loc6_ = _loc7_ | 0;
                    if (_loc3_.indexOf(_loc6_) == -1) {
                        _loc3_.push(_loc6_);
                    }
                }
            }
        }
        return _loc3_;
    }

    private initVipExtendExtension(): void {
        if (this.getBoolean("club.membership.extend.vip.promotion.enabled")) {
            this._SafeStr_3633 = new ClubDiscountPromoExtension(this);
        }
    }

    private initCitizenshipVipQuestsExtension(): void {
        if (this.getBoolean("citizenship.vip.quest.promotion.enabled")) {
            this._SafeStr_4520 = new CitizenshipVipQuestsPromoExtension(this, this._windowManager, this.assets, this.events, this._localization, this._connection);
        }
    }

    private initCitizenshipVipExtendExtension(): void {
        if (this.getBoolean("club.membership.extend.vip.promotion.enabled")) {
            this._SafeStr_3813 = new CitizenshipVipDiscountPromoExtension(this);
        }
    }

    private initVideoOfferExtension(): void {
        let _loc1_: boolean = !this.isNewIdentity() || !this.getBoolean("new.identity.hide.ui");
        if (this._catalog.videoOffers.enabled && this.getBoolean("toolbar.extension.video.promo.enabled") && _loc1_) {
            this._SafeStr_3462 = new VideoOfferExtension(this);
        }
    }

    private initOfferExtension(): void {
        let _loc1_: boolean = !this.isNewIdentity() || !this.getBoolean("new.identity.hide.ui");
        if (this.getBoolean("offers.enabled") && _loc1_ && !this.getBoolean("offers.habboclub.enabled")) {
            this._offerExtension = new OfferExtension(this, this._windowManager, this.assets, this._catalog);
        }
    }

    public toggleSettingVisibility(): void {
        if (this._SafeStr_3275 && this._SafeStr_3275.window) {
            this._SafeStr_3275.window.visible = !this._SafeStr_3275.window.visible;
        }
        this.extensionView.refreshItemWindow();
    }

    private onRemoveDimmer(param1: TimerEvent): void {
        this.destroyDimmerTimer();
        if (this._view) {
            this.removeDimmer(asGuarded(this._view.window, isIWindowContainer));
        }
        if (this._extensionView) {
            this._extensionView.removeDimmers();
        }
    }

    public createAndAttachDimmerWindow(param1: IWindowContainer): void {
        let _loc2_: IWindow = null;
        if (RoomEnterEffect.isRunning()) {
            if (param1 == null) {
                return;
            }
            _loc2_ = this._windowManager.createWindow("toolbar_dimmer", "", 30, 1, (0x80 | 0x0800 | 1) >>> 0, new Rectangle(0, 0, param1.width, param1.height), null, 0);
            _loc2_.color = 0;
            _loc2_.blend = 0.3;
            param1.addChild(_loc2_);
            param1.invalidate();
        }
    }

    public removeDimmer(param1: IWindowContainer): void {
        if (param1 == null) {
            return;
        }
        let _loc2_: IWindow = param1.findChildByName("toolbar_dimmer");
        if (_loc2_ != null) {
            param1.removeChild(_loc2_);
            param1.invalidate();
            this._windowManager.destroy(_loc2_);
        }
    }

    public toggleWindowVisibility(param1: string): void {
        let _loc4_: HabboToolbarEvent = null;
        let _loc5_: HabboToolbarEvent = null;
        let _loc2_: string = stringOrNull(HabboToolbarIconEnum[param1]);
        if (_loc2_ == "HTIE_ICON_CAMERA") {
            _loc4_ = new HabboToolbarEvent("HTE_ICON_CAMERA");
            _loc4_.iconName = "toolBarCameraIcon";
            this.events.dispatchEvent(_loc4_);
        } else {
            _loc5_ = new HabboToolbarEvent("HTE_TOOLBAR_CLICK");
            _loc5_.iconId = _loc2_;
            _loc5_.iconName = param1;
            this.events.dispatchEvent(_loc5_);
        }
        let _loc3_: EventLogMessageComposer = new EventLogMessageComposer("Toolbar", param1, "client.toolbar.clicked");
        if (this._connection) {
            this._connection.send(_loc3_);
        }
    }

    public getIconLocation(param1: string): Rectangle {
        let _loc2_: Rectangle = null;
        if (param1 == "HTIE_EXT_GROUP") {
            _loc2_ = this._extensionView.getIconLocation(param1);
        } else if (this._view) {
            _loc2_ = this._view.getIconLocation(param1);
        }
        if (!_loc2_ && this._SafeStr_2598) {
            _loc2_ = this._SafeStr_2598.getIconLocation(param1);
        }
        return _loc2_;
    }

    public getIcon(param1: string): IWindow {
        let _loc2_: IWindow = null;
        if (param1 == "HTIE_EXT_GROUP") {
            _loc2_ = this._extensionView.getIcon(param1);
        } else if (this._view) {
            _loc2_ = this._view.geIcon(param1);
            if (isIStaticBitmapWrapperWindow(_loc2_) ? _loc2_ : null) {
                _loc2_ = _loc2_.parent;
            }
        }
        if (!_loc2_ && this._SafeStr_2598) {
            _loc2_ = this._SafeStr_2598.getIcon(param1);
        }
        return _loc2_;
    }

    public setUnseenItemCount(param1: string, param2: number): void {
        if (this._view) {
            this._view.setUnseenItemCount(param1, param2);
        }
    }

    public setToolbarState(param1: string): void {
        switch (param1) {
            case "HTE_STATE_HOTEL_VIEW":
            case "HTE_STATE_GAME_CENTER_VIEW":
                this.showExtensions(true);
                break;
            case "HTE_STATE_ROOM_VIEW":
                this.showExtensions(true);
                break;
            case "HTE_STATE_HIDDEN":
                this.showExtensions(false);
        }
        if (this._extensionView != null) {
            this._extensionView.landingView = param1 == "HTE_STATE_HOTEL_VIEW";
        }
        if (this._view) {
            this._view.setToolbarState(param1);
            this._view.window.visible = true;
        }
        if (this._habboHelp != null) {
            this._habboHelp.outsideRoom = param1 != "HTE_STATE_ROOM_VIEW";
        }
        let _loc2_: HabboToolbarEvent = new HabboToolbarEvent("HTE_RESIZED");
        this.events.dispatchEvent(_loc2_);
    }

    public getToolbarState(): string {
        return this._view.getToolbarState();
    }

    private showExtensions(param1: boolean): void {
        if (this._extensionView) {
            this._extensionView.visible = param1;
        }
    }

    public setIconBitmap(param1: string, param2: BitmapData): void {
        let _loc3_: BitmapData = null;
        if (param2 != null) {
            _loc3_ = param2.clone();
        }
        if (this._view) {
            this._view.setIconBitmap(param1, param2);
        }
    }

    public getRect(): Rectangle {
        if (this._view) {
            return this._view.window.rectangle;
        }
        return new Rectangle();
    }

    public get extensionView(): IExtensionView {
        return this._extensionView;
    }

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    public createTransitionToIcon(param1: string, param2: BitmapData, param3: number, param4: number): Motion {
        if (this._view && !this._view.disposed) {
            return this._view.animateToIcon(param1, param2, param3, param4);
        }
        param2.dispose();
        return null;
    }

    public isXmasEnabled(): boolean {
        return this.getBoolean("xmas11.enabled");
    }

    public isValentinesEnabled(): boolean {
        return this.getBoolean("valentines.enabled");
    }

    public isNewIdentity(): boolean {
        return this.getInteger("new.identity", 0) > 0;
    }

    public setIconVisibility(param1: string, param2: boolean): void {
        if (this._view) {
            this._view.iconVisibility(param1, param2);
        }
    }

    private destroyDimmerTimer(): void {
        if (this._SafeStr_2745) {
            this._SafeStr_2745.removeEventListener("timerComplete", this.onRemoveDimmer);
            this._SafeStr_2745.stop();
            this._SafeStr_2745 = null;
        }
    }

    private destroyClientPromoTimer(): void {
        if (this._SafeStr_3179) {
            this._SafeStr_3179.removeEventListener("timerComplete", this.onShowClientPromo);
            this._SafeStr_3179.stop();
            this._SafeStr_3179 = null;
        }
    }

    private destroyOwnRoomPromoTimer(): void {
        if (this._SafeStr_3118) {
            this._SafeStr_3118.removeEventListener("timerComplete", this.onShowOwnRoomPromo);
            this._SafeStr_3118.stop();
            this._SafeStr_3118 = null;
        }
    }

    private onMiniMailUpdate(param1: MiniMailMessageEvent): void {
        if (!this._messenger || !this._view) {
            return;
        }
        if (this._view != null) {
            this._view.unseenMiniMailMessageCount = this._messenger.getUnseenMiniMailMessageCount();
            this._view.memenu.unseenMinimailsCount = this._messenger.getUnseenMiniMailMessageCount();
            this.setUnseenItemCount("HTIE_ICON_MEMENU", this._view.unseenMeMenuCount);
        }
    }

    private onUnseenAchievementsCountUpdate(param1: UnseenAchievementsCountUpdateEvent): void {
        if (this._view != null) {
            this._view.unseenAchievementCount = param1.count;
            this._view.progmenu.unseenAchievementsCount = param1.count;
            this.setUnseenItemCount("HTIE_ICON_PROGRESSION", this._view.unseenProgMenuCount);
        }
    }

    private onUnseenDailyTasksCountUpdate(param1: UnseenDailyTasksCountUpdateEvent): void {
        if (this._view != null) {
            this._view.unseenDailyTasksCount = param1.count;
            this._view.progmenu.unseenDailyTaskCount = param1.count;
            this.setUnseenItemCount("HTIE_ICON_PROGRESSION", this._view.unseenProgMenuCount);
        }
    }

    private onUnseenRewardTrackRewardsCountUpdate(param1: UnseenRewardTrackRewardsCountUpdateEvent): void {
        if (this._view != null) {
            this._view.unseenRewardTrackRewardsCount = param1.count;
            this._view.progmenu.unseenRewardTrackRewardsCount = param1.count;
            this.setUnseenItemCount("HTIE_ICON_PROGRESSION", this._view.unseenProgMenuCount);
        }
    }

    private onUnseenForumsCountUpdate(param1: UnseenForumsCountUpdatedEvent): void {
        if (this._view != null) {
            this._view.unseenForumsCount = param1.unseenForumsCount;
            this._view.memenu.unseenForumsCount = param1.unseenForumsCount;
            this.setUnseenItemCount("HTIE_ICON_MEMENU", this._view.unseenMeMenuCount);
        }
    }

    public set onDuty(param1: boolean) {
        if (this._view != null) {
            this._view.onDuty = param1;
        }
    }

    private onUnseenItemsUpdate(param1: HabboUnseenItemsUpdatedEvent): void {
        this.setUnseenItemCount("HTIE_ICON_INVENTORY", param1.inventoryCount);
        this.setUnseenItemCount("HTIE_ICON_GAMES", param1.getCategoryCount(6));
    }

    public onClubChanged(param1: HabboInventoryHabboClubEvent): void {
        if (this._SafeStr_2598 != null) {
            this._SafeStr_2598.getClubArea().onClubChanged(param1);
        }
        if (this._SafeStr_3813 != null) {
            this._SafeStr_3813.onClubChanged(param1);
        }
        if (this._SafeStr_3462 != null) {
            this._SafeStr_3462.onClubChanged(param1);
        }
        if (this._SafeStr_3633 != null) {
            this._SafeStr_3633.onClubChanged(param1);
        }
    }

    public refreshPurseAreaIndicators(): void {
        if (this._SafeStr_2598 != null) {
            this._SafeStr_2598.refreshIndicators();
        }
    }

    public get toolBarAreaWidth(): number {
        if (this._view) {
            return this._view.getToolbarAreaWidth();
        }
        return 0;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public get connection(): IConnection {
        return this._connection;
    }

    public get navigator(): IHabboNavigator {
        if (this._newNavigator != null) {
            return this._newNavigator.legacyNavigator;
        }
        return null;
    }

    public get questEngine(): IHabboQuestEngine {
        return this._questEngine;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get roomUI(): IRoomUI {
        return this._roomUI;
    }

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    public get localization(): ICoreLocalizationManager {
        return this._localization;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get messenger(): IHabboMessenger {
        return this._messenger;
    }

    public get roomEvents(): IHabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public reboot(): void {
        (asInstanceOf(this.context, CoreComponentContext)).reboot();
    }

    protected override initInstanceFields(): void {
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.onPerksUpdated = this.onPerksUpdated.bind(this);
        this.onCatalogEvent = this.onCatalogEvent.bind(this);
        this.onWiredMenuEvent = this.onWiredMenuEvent.bind(this);
        this.onUserRights = this.onUserRights.bind(this);
        this.onShowClientPromo = this.onShowClientPromo.bind(this);
        this.onShowOwnRoomPromo = this.onShowOwnRoomPromo.bind(this);
        this.onRemoveDimmer = this.onRemoveDimmer.bind(this);
        this.onMiniMailUpdate = this.onMiniMailUpdate.bind(this);
        this.onUnseenAchievementsCountUpdate = this.onUnseenAchievementsCountUpdate.bind(this);
        this.onUnseenDailyTasksCountUpdate = this.onUnseenDailyTasksCountUpdate.bind(this);
        this.onUnseenRewardTrackRewardsCountUpdate = this.onUnseenRewardTrackRewardsCountUpdate.bind(this);
        this.onUnseenForumsCountUpdate = this.onUnseenForumsCountUpdate.bind(this);
        this.onUnseenItemsUpdate = this.onUnseenItemsUpdate.bind(this);
        this.onClubChanged = this.onClubChanged.bind(this);
        this._isInitialized = false;
        super.initInstanceFields();
    }

    get [IHabboToolbar](): true {
        return true;
    }
}
