import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IRecycler } from '@/com/sulake/habbo/catalog/recycler/IRecycler';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IAvatarEffect } from '@/com/sulake/habbo/inventory/IAvatarEffect';
import type { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IUnseenItemTracker } from '@/com/sulake/habbo/inventory/IUnseenItemTracker';
import type { ITradingModel } from '@/com/sulake/habbo/inventory/trading/ITradingModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { GetBadgePointLimitsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/GetBadgePointLimitsComposer';
import { GetCreditsInfoComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/purse/GetCreditsInfoComposer';
import { GetNftCreditsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nft/GetNftCreditsMessageComposer';
import { GetSilverMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nft/GetSilverMessageComposer';
import { ScrGetUserInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ScrGetUserInfoMessageComposer';
import { HabboComponentFlags } from '@/com/sulake/habbo/configuration/enum/HabboComponentFlags';
import { BadgesModel } from '@/com/sulake/habbo/inventory/badges/BadgesModel';
import { BotsModel } from '@/com/sulake/habbo/inventory/bots/BotsModel';
import { CollectiblesModel } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesModel';
import { EffectsModel } from '@/com/sulake/habbo/inventory/effects/EffectsModel';
import { HabboInventoryEffectsEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryEffectsEvent';
import { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import { isIInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { IncomingMessages } from '@/com/sulake/habbo/inventory/IncomingMessages';
import { InventoryMainView } from '@/com/sulake/habbo/inventory/InventoryMainView';
import { MarketplaceModel } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceModel';
import { PetsModel } from '@/com/sulake/habbo/inventory/pets/PetsModel';
import { Purse } from '@/com/sulake/habbo/inventory/purse/Purse';
import { RecyclerModel } from '@/com/sulake/habbo/inventory/recycler/RecyclerModel';
import { TradingModel } from '@/com/sulake/habbo/inventory/trading/TradingModel';
import { UnseenItemTracker } from '@/com/sulake/habbo/inventory/UnseenItemTracker';
import { WiredTradingModel } from '@/com/sulake/habbo/inventory/wired_trading/WiredTradingModel.group';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class HabboInventory extends Component implements IHabboInventory, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.inventory::HabboInventory'); }

    declare private _communication: IHabboCommunicationManager;

    declare private _incomingMessages: IncomingMessages;

    declare private _windowManager: IHabboWindowManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _soundManager: IHabboSoundManager;

    declare private _view: InventoryMainView;

    declare private _inventories: UtilsMap;

    declare private _roomEngine: IRoomEngine;

    declare private _roomSession: IRoomSession;

    declare private _initedInventoryCategories: any[];

    declare private _SafeStr_2234: Purse;

    declare private _avatarRenderer: IAvatarRenderManager;

    declare private _catalog: IHabboCatalog;

    declare private _isInitialized: boolean;

    declare private _unseenItemTracker: UnseenItemTracker;

    declare private _SafeStr_6677: boolean;

    declare private _notifications: IHabboNotifications;

    declare private _friendList: IHabboFriendList;

    declare private _currentCategoryId: string;

    declare private _figureSetIds: number[];

    declare private _boundFurnitureNames: string[];

    declare private _SafeStr_2507: Timer;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_2234 = new Purse();
        this._initedInventoryCategories = [];
        this._figureSetIds = new Array<number>(0).fill(0);
    }

    public get isVisible(): boolean {
        return this._view.isVisible;
    }

    public get isMainViewActive(): boolean {
        return this._view.isActive;
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    public get unseenItemTracker(): IUnseenItemTracker {
        return this._unseenItemTracker;
    }

    public get view(): InventoryMainView {
        return this._view;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderer = param1;
         }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
             this._notifications = param1;
         }), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }, false), new ComponentDependency(new IIDHabboRoomSessionManager(), null, false, [{ "type": "RSE_STARTED", "callback": this.roomSessionEventHandler }, { "type": "RSE_ENDED", "callback": this.roomSessionEventHandler }, { "type": "RSDUE_ALLOW_PETS", "callback": this.roomSessionEventHandler }]), new ComponentDependency(new IIDHabboToolbar(), null, false, [{ "type": "HTE_TOOLBAR_CLICK", "callback": this.habboToolbarEventHandler }]), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         })]);
    }

    private habboToolbarEventHandler(param1: HabboToolbarEvent): void {
        if (this._view != null) {
            this._view.onHabboToolbarEvent(param1);
        }
    }

    protected override initComponent(): void {
        if (HabboComponentFlags.isRoomViewerMode(this.flags | 0)) {
            return;
        }
        this._incomingMessages = new IncomingMessages(this);
        this.context.addLinkEventTracker(this);
        this._unseenItemTracker = new UnseenItemTracker(this._communication, this.events, this);
        this._view = new InventoryMainView(this, this._windowManager, this.assets);
        this._communication.connection.send(new GetCreditsInfoComposer());
        this._communication.connection.send(new GetNftCreditsMessageComposer());
        this._communication.connection.send(new GetSilverMessageComposer());
        this._communication.connection.send(new ScrGetUserInfoMessageComposer("habbo_club"));
        this._communication.connection.send(new GetBadgePointLimitsComposer());
    }

    public override dispose(): void {
        let _loc4_: any[] = null;
        let _loc1_: number = 0;
        let _loc3_: string = null;
        let _loc2_: IInventoryModel = null;
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2507 != null) {
            this._SafeStr_2507.stop();
            this._SafeStr_2507.removeEventListener("timer", this.onPurseTimer);
            this._SafeStr_2507 = null;
        }
        if (this._inventories) {
            _loc4_ = this._inventories.getKeys();
            _loc1_ = 0;
            while (_loc1_ < _loc4_.length) {
                _loc3_ = stringOrNull(_loc4_[_loc1_]);
                _loc2_ = asGuarded(this._inventories.getValue(_loc3_), isIInventoryModel);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._inventories.dispose();
            this._inventories = null;
        }
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._roomSession = null;
        this._friendList = null;
        if (this._unseenItemTracker != null) {
            this._unseenItemTracker.dispose();
            this._unseenItemTracker = null;
        }
        if (this._incomingMessages != null) {
            this._incomingMessages.dispose();
            this._incomingMessages = null;
        }
        super.dispose();
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public getModel(param1: string): IInventoryModel {
        if (!this._isInitialized) {
            this.init();
        }
        return this._inventories.getValue(param1);
    }

    public get furniModel(): FurniModel {
        return this.disposed ? null : castTo(this.getModel("furni"), FurniModel);
    }

    public get tradingModel(): TradingModel {
        return this.disposed ? null : castTo(this.getModel("trading"), TradingModel);
    }

    public get wiredTradingModel(): WiredTradingModel {
        return this.disposed ? null : castTo(this.getModel("wired_trading"), WiredTradingModel);
    }

    public get effectsModel(): EffectsModel {
        return this.disposed ? null : castTo(this.getModel("effects"), EffectsModel);
    }

    public get badgesModel(): BadgesModel {
        return this.disposed ? null : castTo(this.getModel("badges"), BadgesModel);
    }

    public get recyclerModel(): RecyclerModel {
        return this.disposed ? null : castTo(this.getModel("recycler"), RecyclerModel);
    }

    public get petsModel(): PetsModel {
        return this.disposed ? null : castTo(this.getModel("pets"), PetsModel);
    }

    public get botsModel(): BotsModel {
        return this.disposed ? null : castTo(this.getModel("bots"), BotsModel);
    }

    public get collectiblesModel(): CollectiblesModel {
        return this.disposed ? null : castTo(this.getModel("collectibles"), CollectiblesModel);
    }

    public get marketplaceModel(): MarketplaceModel {
        return this.disposed ? null : castTo(this.getModel("marketplace"), MarketplaceModel);
    }

    public get sessionData(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get roomSession(): IRoomSession {
        return this._roomSession;
    }

    public get friendList(): IHabboFriendList {
        return this._friendList;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get clubDays(): number {
        return this._SafeStr_2234.clubDays;
    }

    public get clubPeriods(): number {
        return this._SafeStr_2234.clubPeriods;
    }

    public get clubPastPeriods(): number {
        return this._SafeStr_2234.clubPastPeriods;
    }

    public get clubHasEverBeenMember(): boolean {
        return this._SafeStr_2234.clubHasEverBeenMember;
    }

    public get clubIsExpiring(): boolean {
        return this._SafeStr_2234.clubIsExpiring;
    }

    public get citizenshipVipIsExpiring(): boolean {
        return this._SafeStr_2234.citizenshipVipIsExpiring;
    }

    public get clubMinutesUntilExpiration(): number {
        return this._SafeStr_2234.minutesUntilExpiration;
    }

    public get clubLevel(): number {
        if (this.clubDays == 0 && this.clubPeriods == 0) {
            return 0;
        }
        if (this._SafeStr_2234.isVIP) {
            return 2;
        }
        return 1;
    }

    public get hasRoomSession(): boolean {
        return this._roomSession != null;
    }

    public getSubCategoryViewId(): string {
        return this._view.getSubCategoryViewId();
    }

    public setClubStatus(param1: number, param2: number, param3: boolean, param4: boolean, param5: boolean, param6: boolean, param7: number, param8: number): void {
        this._SafeStr_2234.clubPeriods = param1;
        this._SafeStr_2234.clubDays = param2;
        this._SafeStr_2234.clubHasEverBeenMember = param3;
        this._SafeStr_2234.isVIP = param4;
        this._SafeStr_2234.clubIsExpiring = param5;
        this._SafeStr_2234.citizenshipVipIsExpiring = param6;
        this._SafeStr_2234.minutesUntilExpiration = param7;
        this._SafeStr_2234.minutesSinceLastModified = param8;
        if (param7 > 0 && param7 < 86400000) {
            if (this._SafeStr_2507 == null) {
                this._SafeStr_2507 = new Timer(60000, 0);
                this._SafeStr_2507.addEventListener("timer", this.onPurseTimer);
            }
            if (!this._SafeStr_2507.running) {
                this._SafeStr_2507.start();
            }
        } else if (this._SafeStr_2507 != null) {
            this._SafeStr_2507.stop();
            this._SafeStr_2507.removeEventListener("timer", this.onPurseTimer);
            this._SafeStr_2507 = null;
        }
    }

    private onPurseTimer(param1: TimerEvent): void {
        this._communication.connection.send(new ScrGetUserInfoMessageComposer("habbo_club"));
    }

    private roomSessionEventHandler(param1: RoomSessionEvent): void {
        switch (param1.type) {
            case "RSE_STARTED":
                this._roomSession = param1.session;
                if (this._isInitialized) {
                    if (this.petsModel != null) {
                        this.petsModel.updatePetsAllowed();
                    }
                    if (this.furniModel != null) {
                        this.furniModel.updateView();
                    }
                }
                break;
            case "RSE_ENDED":
                this._roomSession = null;
                if (this._isInitialized) {
                    this.deselectAllEffects();
                }
                break;
            case "RSDUE_ALLOW_PETS":
                if (this._isInitialized) {
                    if (this.petsModel != null) {
                        this.petsModel.updatePetsAllowed();
                    }
                }
        }
    }

    private init(): void {
        if (!this.allRequiredDependenciesInjected) {
            return;
        }
        this._inventories = new UtilsMap();
        let _loc8_: MarketplaceModel = new MarketplaceModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._localization);
        this._inventories.add("marketplace", _loc8_);
        let _loc1_: FurniModel = new FurniModel(this, _loc8_, this._windowManager, this._communication, this.assets, this._roomEngine, this._catalog, this._soundManager, this._localization);
        this._inventories.add("furni", _loc1_);
        if (!this.mergeRentFurni) {
            this._inventories.add("rentables", _loc1_);
        }
        let _loc10_: CollectiblesModel = new CollectiblesModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._catalog, this._avatarRenderer);
        this._inventories.add("collectibles", _loc10_);
        let _loc2_: BadgesModel = new BadgesModel(this, this._windowManager, this._communication, this.assets);
        this._inventories.add("badges", _loc2_);
        let _loc4_: EffectsModel = new EffectsModel(this, this._windowManager, this._communication, this.assets, this._localization);
        this._inventories.add("effects", _loc4_);
        let _loc5_: TradingModel = new TradingModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._localization, this._soundManager, this._notifications);
        this._inventories.add("trading", _loc5_);
        let _loc6_: WiredTradingModel = new WiredTradingModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._localization, this._soundManager, this._notifications);
        this._inventories.add("wired_trading", _loc6_);
        let _loc3_: RecyclerModel = new RecyclerModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._localization);
        this._inventories.add("recycler", _loc3_);
        let _loc9_: PetsModel = new PetsModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._catalog);
        this._inventories.add("pets", _loc9_);
        let _loc7_: BotsModel = new BotsModel(this, this._windowManager, this._communication, this.assets, this._roomEngine, this._catalog, this._avatarRenderer);
        this._inventories.add("bots", _loc7_);
        this._isInitialized = true;
    }

    public getCategoryWindowContainer(param1: string): IWindowContainer {
        let _loc2_: IInventoryModel = castGuarded(this._inventories.getValue(param1), isIInventoryModel, "com.sulake.habbo.inventory.IInventoryModel");
        if (_loc2_ == null) {
            return null;
        }
        return _loc2_.getWindowContainer();
    }

    public updateView(param1: string): void {
        let _loc2_: IInventoryModel = castGuarded(this._inventories.getValue(param1), isIInventoryModel, "com.sulake.habbo.inventory.IInventoryModel");
        if (_loc2_ == null) {
            return;
        }
        return _loc2_.updateView();
    }

    public getCategorySubWindowContainer(param1: string): IWindowContainer {
        let _loc2_: IInventoryModel = castGuarded(this._inventories.getValue(param1), isIInventoryModel, "com.sulake.habbo.inventory.IInventoryModel");
        return _loc2_ == null ? null : _loc2_.getWindowContainer();
    }

    public getActivatedAvatarEffects(): any[] {
        return this.effectsModel == null ? [] : this.effectsModel.getEffects(1);
    }

    public getAvatarEffects(): any[] {
        return this.effectsModel == null ? [] : this.effectsModel.getEffects();
    }

    public setEffectSelected(param1: number): void {
        let _loc2_: EffectsModel = this.effectsModel;
        if (_loc2_ == null) {
            return;
        }
        _loc2_.useEffect(param1);
        this.notifyChangedEffects();
    }

    public setEffectDeselected(param1: number): void {
        let _loc2_: EffectsModel = this.effectsModel;
        if (_loc2_ == null) {
            return;
        }
        _loc2_.stopUsingEffect(param1, true);
        this.notifyChangedEffects();
    }

    public deselectAllEffects(param1: boolean = false): void {
        let _loc2_: EffectsModel = this.effectsModel;
        if (_loc2_ == null) {
            return;
        }
        _loc2_.stopUsingAllEffects(true, true, param1);
        this.notifyChangedEffects();
    }

    public getAvatarEffect(param1: number): IAvatarEffect {
        return this.effectsModel == null ? null : this.effectsModel.getEffectInterface(param1);
    }

    public closeView(): void {
        if (this._view && this._view.isVisible) {
            this._view.hideInventory();
        }
    }

    public showView(): void {
        if (this._view) {
            this._view.showInventory();
        }
    }

    public get isMainViewInitialized(): boolean {
        return this._view.mainContainer != null;
    }

    public initializeFurniturePage(): void {
        if (this._view) {
            this.toggleInventoryPage("furni");
            this._view.hideInventory();
        }
    }

    public toggleInventoryPage(param1: string, param2: string = null, param3: boolean = false): void {
        this._currentCategoryId = param1;
        let _loc4_: boolean = this._view.toggleCategoryView(param1, false, param3);
        if (_loc4_) {
            this.inventoryViewOpened(param1);
            if (param2 != null) {
                castGuarded(this._inventories.getValue(this._currentCategoryId), isIInventoryModel, "com.sulake.habbo.inventory.IInventoryModel").selectItemById(param2);
            }
        }
        if (!_loc4_) {
            this.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_CLOSED"));
        }
    }

    public toggleInventorySubPage(param1: string): void {
        let _loc2_: number = 0;
        let _loc3_: IInventoryModel = null;
        switch (param1) {
            case "trading":
            case "wired_trading":
                this._view.toggleCategoryView("furni", false);
        }
        this._view.toggleSubCategoryView(param1, false);
        _loc2_ = 0;
        while (_loc2_ < this._inventories.length) {
            _loc3_ = asGuarded(this._inventories.getWithIndex(_loc2_), isIInventoryModel);
            _loc3_.subCategorySwitch(param1);
            _loc2_++;
        }
    }

    public updateSubView(): void {
        this._view.updateSubCategoryView();
    }

    public closingInventoryView(): void {
        let _loc1_: number = 0;
        let _loc2_: IInventoryModel = null;
        if (this._inventories) {
            _loc1_ = 0;
            while (_loc1_ < this._inventories.length) {
                _loc2_ = asGuarded(this._inventories.getWithIndex(_loc1_), isIInventoryModel);
                _loc2_.closingInventoryView();
                _loc1_++;
            }
        }
        this.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_CLOSED"));
    }

    public preparingInventoryView(): void {
        if (!this._isInitialized) {
            this.init();
        }
    }

    public inventoryViewOpened(param1: string): void {
        let _loc2_: number = 0;
        let _loc3_: IInventoryModel = null;
        _loc2_ = 0;
        while (_loc2_ < this._inventories.length) {
            _loc3_ = asGuarded(this._inventories.getWithIndex(_loc2_), isIInventoryModel);
            _loc3_.categorySwitch(param1);
            _loc2_++;
        }
    }

    public setupTrading(param1: number, param2: string): void {
        if (!this._isInitialized) {
            this.init();
        }
        let _loc3_: TradingModel = this.tradingModel;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.requestOpenTrading(param1);
    }

    public get tradingActive(): boolean {
        return this.activeTradingModel != null;
    }

    public get activeTradingModel(): ITradingModel {
        if (this.tradingModel != null && this.tradingModel.running) {
            return this.tradingModel;
        }
        if (this.wiredTradingModel != null && this.wiredTradingModel.running) {
            return this.wiredTradingModel;
        }
        return null;
    }

    public getItemImage(param1: FurnitureItem): BitmapData {
        let _loc2_: ImageResult = null;
        if (!param1.isWallItem) {
            _loc2_ = this._roomEngine.getFurnitureImage(param1.type, new Vector3d(180, 0, 0), 64, null, 0, String(param1.extra), -1, -1, param1.stuffData);
        } else {
            _loc2_ = this._roomEngine.getWallItemImage(param1.type, new Vector3d(180, 0, 0), 64, null, 0, param1.stuffData.getLegacyString());
        }
        return _loc2_.data instanceof BitmapData ? _loc2_.data : null;
    }

    public onTradeActiveChanged(param1: boolean = false): void {
        this.view.disableNonTradingTabs(this.tradingActive);
        if (this.web3tradeEnabled) {
            this.view.showCollectiblesTab(this.tradingActive);
            if (param1) {
                this.collectiblesModel.onTradeComplete();
            }
        }
    }

    public onWiredTradeActiveChanged(): void {
        this.view.disableNonTradingTabs(this.tradingActive);
    }

    public get web3tradeEnabled(): boolean {
        return this.getBoolean("web3trade.enabled");
    }

    public setupRecycler(param1: boolean): void {
        if (this.recyclerModel != null) {
            if (param1) {
                this.recyclerModel.startRecycler();
            } else {
                this.recyclerModel.stopRecycler();
            }
        }
    }

    public requestSelectedFurniToRecycler(): number {
        return this.recyclerModel != null ? this.recyclerModel.lockSelectedFurni() : 0;
    }

    public returnInventoryFurniFromRecycler(param1: number): boolean {
        return this.recyclerModel != null ? this.recyclerModel.releaseFurni(param1) : false;
    }

    public canUserOfferToTrade(): boolean {
        if (this.wiredTradingModel.running) {
            return true;
        }
        let _loc1_: TradingModel = this.tradingModel;
        return _loc1_ != null ? _loc1_.ownUserCanTrade : false;
    }

    public setInventoryCategoryInit(param1: string, param2: boolean = true): boolean {
        let _loc3_: number = 0;
        if (param2) {
            if (this._initedInventoryCategories.indexOf(param1) == -1) {
                this._initedInventoryCategories.push(param1);
                return true;
            }
        } else {
            _loc3_ = this._initedInventoryCategories.indexOf(param1);
            if (_loc3_ >= 0) {
                this._initedInventoryCategories.splice(_loc3_, 1);
            }
            if (this._view != null && this._view.isVisible) {
                if (param1 != "rentables") {
                    this.requestInventoryCategoryInit(param1);
                }
            }
        }
        return false;
    }

    public isInventoryCategoryInit(param1: string): boolean {
        return this._initedInventoryCategories.indexOf(param1) >= 0;
    }

    public checkCategoryInitilization(param1: string): boolean {
        if (this.isInventoryCategoryInit(param1)) {
            return true;
        }
        this.requestInventoryCategoryInit(param1);
        return false;
    }

    public requestInventoryCategoryInit(param1: string): void {
        let _loc2_: IInventoryModel = asGuarded(this._inventories.getValue(param1), isIInventoryModel);
        if (_loc2_ != null) {
            _loc2_.requestInitialization();
        }
    }

    public notifyChangedEffects(): void {
        this.events.dispatchEvent(new HabboInventoryEffectsEvent("HIEE_EFFECTS_CHANGED"));
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public requestSelectedFurniToMover(param1: IFurnitureItem): boolean {
        let _loc3_: number = 0;
        let _loc2_: boolean = false;
        if (param1.isWallItem) {
            _loc3_ = 20;
        } else {
            _loc3_ = 10;
        }
        if (param1.category == 6) {
            _loc2_ = this._roomEngine.initializeRoomObjectInsert("inventory", param1.id, _loc3_, param1.type, param1.stuffData.getLegacyString());
        } else {
            _loc2_ = this._roomEngine.initializeRoomObjectInsert("inventory", param1.id, _loc3_, param1.type, param1.extra.toString(), param1.stuffData);
        }
        return _loc2_;
    }

    public getFloorItemById(param1: number): IFurnitureItem {
        let _loc2_: IFurnitureItem = null;
        for (const _loc3_ of this.furniModel.furniData ?? []) {
            _loc2_ = _loc3_.getItem(param1);
            if (_loc2_ != null && !_loc2_.isWallItem) {
                return _loc2_;
            }
        }
        return null;
    }

    public getWallItemById(param1: number): IFurnitureItem {
        let _loc2_: IFurnitureItem = null;
        for (const _loc3_ of this.furniModel.furniData ?? []) {
            _loc2_ = _loc3_.getItem(param1);
            if (_loc2_ != null && _loc2_.isWallItem) {
                return _loc2_;
            }
        }
        return null;
    }

    public getNonRentedInventoryIds(param1: string, param2: number, param3: boolean): any[] {
        let _loc5_: FurniModel = this._inventories.getValue(param1);
        if (!_loc5_) {
            return null;
        }
        let _loc4_: GroupItem = this.furniModel.getGroupItemByItemTypeId(param2, param3);
        if (!_loc4_) {
            return null;
        }
        return _loc4_.getNonRentedFurnitureIds();
    }

    public placePetToRoom(param1: number, param2: boolean = false): boolean {
        return this.petsModel.placePetToRoom(param1, param2);
    }

    public get mergeRentFurni(): boolean {
        return true;
    }

    public updateUnseenItemCounts(): void {
        let _loc4_: number = 0;
        _loc4_ = this._unseenItemTracker.getCount(1);
        this._view.updateUnseenFurniCount(_loc4_);
        _loc4_ = this._unseenItemTracker.getCount(2);
        this._view.updateUnseenRentedFurniCount(_loc4_);
        let _loc1_: number = this._unseenItemTracker.getCount(3);
        this._view.updateUnseenPetsCount(_loc1_);
        let _loc3_: number = this._unseenItemTracker.getCount(4);
        this._view.updateUnseenBadgeCount(_loc3_);
        let _loc2_: number = this._unseenItemTracker.getCount(5);
        this._view.updateUnseenBotCount(_loc2_);
    }

    public removeUnseenFurniCounter(param1: number): boolean {
        let _loc2_: boolean = this.furniModel.removeUnseenFurniCounter(param1);
        if (_loc2_) {
            this.updateUnseenItemCounts();
        }
        return _loc2_;
    }

    public removeUnseenPetCounter(param1: number): boolean {
        let _loc2_: boolean = this.petsModel.removeUnseenFurniCounter(param1);
        if (_loc2_) {
            this.updateUnseenItemCounts();
        }
        return _loc2_;
    }

    public get botsMax(): number {
        return this.getInteger("inventory.bots.max", 150);
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get currentCategoryId(): string {
        return this._currentCategoryId;
    }

    public getFurnitureData(param1: number, param2: string): IFurnitureData {
        let _loc3_: IFurnitureData = null;
        if (this._sessionDataManager == null) {
            return null;
        }
        if (param2 == "s") {
            _loc3_ = this._sessionDataManager.getFloorItemData(param1);
        }
        if (param2 == "i") {
            _loc3_ = this._sessionDataManager.getWallItemData(param1);
        }
        return _loc3_;
    }

    public getFurnitureDataByName(param1: string, param2: string, param3: number = 0): IFurnitureData {
        let _loc4_: IFurnitureData = null;
        if (this._sessionDataManager == null) {
            return null;
        }
        if (param2 == "s") {
            _loc4_ = this._sessionDataManager.getFloorItemDataByName(param1);
        }
        if (param2 == "i") {
            _loc4_ = this._sessionDataManager.getWallItemDataByName(param1);
        }
        return _loc4_;
    }

    public get linkPattern(): string {
        return "inventory/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc3_: any = _loc2_[1];
        if ("open" !== _loc3_) {
            Logger.log("Inventory unknown link-type received: " + _loc2_[1]);
        } else if (_loc2_.length == 2) {
            this.toggleInventoryPage("furni");
        } else if (_loc2_.length == 3) {
            this.toggleInventoryPage(stringOrNull(_loc2_[2]));
        } else if (_loc2_.length == 4) {
            this.toggleInventoryPage(stringOrNull(_loc2_[2]), stringOrNull(_loc2_[3]));
        }
    }

    public getAllMyBadgeIds(param1: any[]): any[] {
        let _loc2_: BadgesModel = this._inventories.getValue("badges");
        let _loc4_: any[] = [];
        if (_loc2_.getBadges().length == 0 && !this._SafeStr_6677) {
            this.badgesModel.requestInitialization();
            this._SafeStr_6677 = true;
        }
        for (const _loc3_ of _loc2_.getBadges() ?? []) {
            if (param1 == null || param1.indexOf(_loc3_.badgeId) == -1) {
                _loc4_.push(_loc3_.badgeId);
            }
        }
        return _loc4_;
    }

    public hasFigureSetIdInInventory(param1: number): boolean {
        return this._figureSetIds.indexOf(param1) > -1;
    }

    public hasBoundFigureSetFurniture(param1: string): boolean {
        return this._boundFurnitureNames.indexOf(param1) > -1;
    }

    public updatePurchasedFigureSetIds(param1: number[], param2: string[]): void {
        this._figureSetIds = param1;
        this._boundFurnitureNames = param2;
    }

    public getLastActivatedEffect(): number {
        return this.effectsModel.lastActivatedEffect;
    }

    public get avatarRenderer(): IAvatarRenderManager {
        return this._avatarRenderer;
    }

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    public recycleSelectedFurni(): void {
        let _loc2_: GroupItem = null;
        let _loc1_: FurnitureItem = null;
        let _loc3_: number = 0;
        let _loc4_: IRecycler = this.catalog.getRecycler();
        if (_loc4_ != null) {
            _loc2_ = this.furniModel.getSelectedItem();
            if (_loc2_ == null) {
                return;
            }
            _loc1_ = _loc2_.peek();
            if (_loc1_ == null) {
                return;
            }
            _loc3_ = _loc1_.isWallItem ? 20 : 10;
            _loc4_.placeObjectAtSlot(-1, _loc1_.id, _loc3_, _loc1_.type, String(_loc1_.extra), true);
        }
    }

    protected override initInstanceFields(): void {
        this.habboToolbarEventHandler = this.habboToolbarEventHandler.bind(this);
        this.onPurseTimer = this.onPurseTimer.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this._isInitialized = false;
        this._SafeStr_6677 = false;
        super.initInstanceFields();
    }

    get [IHabboInventory](): true {
        return true;
    }
}
