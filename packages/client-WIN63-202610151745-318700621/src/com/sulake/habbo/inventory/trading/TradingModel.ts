import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { TradingItemListEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingItemListEvent';
import type { TradeSilverSetParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradeSilverSetParser';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { CollectibleGroupedItem } from '@/com/sulake/habbo/inventory/collectibles/CollectibleGroupedItem';
import type { CollectiblesModel } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesModel';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { ITradingModel } from '@/com/sulake/habbo/inventory/trading/ITradingModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { TradeOpenFailedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeOpenFailedEvent';
import { TradeSilverFeeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeSilverFeeMessageEvent';
import { TradeSilverSetMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradeSilverSetMessageEvent';
import { TradingAcceptEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingAcceptEvent';
import { TradingCloseEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingCloseEvent';
import { TradingCompletedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingCompletedEvent';
import { TradingConfirmationEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingConfirmationEvent';
import { TradingNotOpenEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingNotOpenEvent';
import { TradingOtherNotAllowedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingOtherNotAllowedEvent';
import { TradingYouAreNotAllowedEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/TradingYouAreNotAllowedEvent';
import { AcceptTradingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/AcceptTradingComposer';
import { AddItemsToTradeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/AddItemsToTradeComposer';
import { AddItemToTradeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/AddItemToTradeComposer';
import { CloseTradingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/CloseTradingComposer';
import { AddNftToTradeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/collectibles/AddNftToTradeComposer';
import { RemoveNftFromTradeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/collectibles/RemoveNftFromTradeComposer';
import { ConfirmAcceptTradingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/ConfirmAcceptTradingComposer';
import { ConfirmDeclineTradingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/ConfirmDeclineTradingComposer';
import { OpenTradingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/OpenTradingComposer';
import { RemoveItemFromTradeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/RemoveItemFromTradeComposer';
import { SilverFeeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/SilverFeeMessageComposer';
import { UnacceptTradingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/UnacceptTradingComposer';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { _SafeCls_6081 } from '@/com/sulake/habbo/inventory/trading/namescam/_SafeCls_6081';
import { TradingNameScamDetectionResult } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamDetectionResult';
import { TradingNameScamWarningController } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamWarningController';
import { TradingNameScamWarningData } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamWarningData';
import { TradingView } from '@/com/sulake/habbo/inventory/trading/TradingView';
import { Logger } from '@/com/sulake/habbo/Logger';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';

export class TradingModel implements IInventoryModel, ITradingModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading::TradingModel'); }

    public static readonly MAX_ITEMS_TO_TRADE: number = 9;
    public static readonly TRADING_STATE_READY: number = 0;
    public static readonly TRADING_STATE_RUNNING: number = 1;
    public static readonly TRADING_STATE_COUNTDOWN: number = 2;
    public static readonly TRADING_STATE_CONFIRMING: number = 3;
    public static readonly TRADING_STATE_CONFIRMED: number = 4;
    public static readonly TRADING_STATE_COMPLETED: number = 5;
    public static readonly TRADING_STATE_CANCELLED: number = 6;
    private static readonly SHOW_NAME_SCAM_WARNING_FOR_SELF_INITIATED_TRADES: boolean = true;

    declare private _inventory: HabboInventory;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _roomEngine: IRoomEngine;

    declare private _communication: IHabboCommunicationManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _soundManager: IHabboSoundManager;

    declare private _tradingView: TradingView;

    declare private _SafeStr_14208: TradingNameScamWarningController;

    declare private _notifications: IHabboNotifications;

    private _disposed: boolean = false;
    private _running: boolean = false;
    private _state: number = 0;
    private _SafeStr_3422: number = -1;
    private _ownUserName: string = "";

    declare private _ownUserItems: UtilsMap;

    private _ownUserNumItems: number = 0;
    private _ownUserNumCredits: number = 0;

    declare private _ownUserNftItems: UtilsMap;

    private _ownUserNumNftItems: number = 0;
    private _ownUserAccepts: boolean = false;
    private _ownUserCanTrade: boolean = false;
    private _otherUserId: number = -1;
    private _otherUserName: string = "";

    declare private _otherUserItems: UtilsMap;

    private _otherUserNumItems: number = 0;
    private _otherUserNumCredits: number = 0;

    declare private _otherUserNftItems: UtilsMap;

    private _otherUserNumNftItems: number = 0;
    private _otherUserAccepts: boolean = false;
    private _otherUserCanTrade: boolean = false;
    private _requiredSilverFee: number = 0;
    private _playerSilver: number = 0;
    private _otherPlayerSilver: number = 0;

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboLocalizationManager, param7: IHabboSoundManager, param8: IHabboNotifications) {
        this._inventory = param1;
        this._communication = param3;
        this._SafeStr_3052 = param4;
        this._roomEngine = param5;
        this._localization = param6;
        this._soundManager = param7;
        this._tradingView = new TradingView(this, param2, param4, param5, param6, param7);
        this._SafeStr_14208 = new TradingNameScamWarningController(param2, param4, param6, param3);
        this._notifications = param8;
    }

    public static getGuildFurniType(param1: number, param2: IStuffData): string {
        let _loc5_: number = 0;
        let _loc4_: string = param1.toString();
        let _loc3_: StringArrayStuffData = param2 instanceof StringArrayStuffData ? param2 : null;
        if (!_loc3_) {
            return _loc4_;
        }
        _loc5_ = 1;
        while (_loc5_ < 5) {
            _loc4_ += "," + _loc3_.getValue(_loc5_);
            _loc5_++;
        }
        return _loc4_;
    }

    public get running(): boolean {
        return this._state != 0;
    }

    public get state(): number {
        return this._state;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get ownUserId(): number {
        return this._SafeStr_3422;
    }

    public get ownUserName(): string {
        return this._ownUserName;
    }

    public get ownUserItems(): UtilsMap {
        return this._ownUserItems;
    }

    public get ownUserAccepts(): boolean {
        return this._ownUserAccepts;
    }

    public get ownUserCanTrade(): boolean {
        return this._ownUserCanTrade;
    }

    public get otherUserId(): number {
        return this._otherUserId;
    }

    public get otherUserName(): string {
        return this._otherUserName;
    }

    public get otherUserItems(): UtilsMap {
        return this._otherUserItems;
    }

    public get otherUserAccepts(): boolean {
        return this._otherUserAccepts;
    }

    public get otherUserCanTrade(): boolean {
        return this._otherUserCanTrade;
    }

    public get ownUserNftItems(): UtilsMap {
        return this._ownUserNftItems;
    }

    public get ownUserNumNftItems(): number {
        return this._ownUserNumNftItems;
    }

    public get otherUserNftItems(): UtilsMap {
        return this._otherUserNftItems;
    }

    public get otherUserNumNftItems(): number {
        return this._otherUserNumNftItems;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._tradingView && !this._tradingView.disposed) {
                this._tradingView.dispose();
                this._tradingView = null;
            }
            if (this._SafeStr_14208 != null) {
                this._SafeStr_14208.dispose();
                this._SafeStr_14208 = null;
            }
            this._inventory = null;
            this._communication = null;
            this._SafeStr_3052 = null;
            this._roomEngine = null;
            this._localization = null;
            this._disposed = true;
        }
    }

    public startTrading(param1: number, param2: string, param3: boolean, param4: number, param5: string, param6: boolean, param7: boolean): void {
        this._SafeStr_3422 = param1;
        this._ownUserName = param2;
        this._ownUserItems = new UtilsMap();
        this._ownUserNftItems = new UtilsMap();
        this._ownUserAccepts = false;
        this._ownUserCanTrade = param3;
        this._otherUserId = param4;
        this._otherUserName = param5;
        this._otherUserItems = new UtilsMap();
        this._otherUserNftItems = new UtilsMap();
        this._otherUserAccepts = false;
        this._otherUserCanTrade = param6;
        this._requiredSilverFee = 0;
        this._playerSilver = 0;
        this._otherPlayerSilver = 0;
        this._ownUserNumNftItems = 0;
        this._ownUserNumItems = 0;
        this._ownUserNumCredits = 0;
        this._otherUserNumNftItems = 0;
        this._otherUserNumItems = 0;
        this._otherUserNumCredits = 0;
        this._SafeStr_14208.hide();
        let _loc8_: TradingNameScamDetectionResult = this.detectNameScam(param7);
        let _loc9_: TradingNameScamWarningData = null;
        if (_loc8_.nameScamDetected) {
            _loc9_ = this.createNameScamWarningData(_loc8_);
        }
        this._running = true;
        this.state = 1;
        this._tradingView.setup(param1, param3, param4, param6);
        this._tradingView.updateItemList(this._SafeStr_3422);
        this._tradingView.updateItemList(this._otherUserId);
        this._tradingView.updateUserInterface();
        this._tradingView.clearItemLists();
        this._inventory.toggleInventoryPage("furni");
        this._inventory.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_TRADING"));
        if (_loc9_ != null) {
            this._SafeStr_14208.show(_loc9_);
        }
    }

    public close(): void {
        if (this._running) {
            if (this._state != 0 && this._state != 5) {
                this.requestCancelTrading();
                this.state = 6;
            }
            this.state = 0;
            this._inventory.toggleInventorySubPage("empty");
            this._running = false;
        }
        this._SafeStr_14208.hide();
        this._tradingView.setMinimized(false);
    }

    private detectNameScam(param1: boolean): TradingNameScamDetectionResult {
        if (!param1 && false) {
            return TradingNameScamDetectionResult.NO_MATCHES;
        }
        return _SafeCls_6081.detect(this._otherUserName, this.getRoomUserNamesForNameScamDetection(), this.getFriendNamesForNameScamDetection());
    }

    private createNameScamWarningData(param1: TradingNameScamDetectionResult): TradingNameScamWarningData {
        let _loc3_: IUserData = null;
        let _loc2_: string = "";
        let _loc4_: IRoomSession = this._inventory.roomSession;
        if (_loc4_ != null && _loc4_.userDataManager != null) {
            _loc3_ = _loc4_.userDataManager.getUserData(this._otherUserId);
            if (_loc3_ != null && _loc3_.figure != null) {
                _loc2_ = _loc3_.figure;
            }
        }
        return new TradingNameScamWarningData(this._otherUserId, this._otherUserName, _loc2_, param1.similarInRoom, param1.similarInFriends);
    }

    private getRoomUserNamesForNameScamDetection(): any[] {
        let _loc2_: IUserData = null;
        let _loc5_: IRoomSession = this._inventory.roomSession;
        if (_loc5_ == null || _loc5_.userDataManager == null) {
            return [];
        }
        let _loc1_: any[] = [];
        let _loc3_: any[] = _loc5_.userDataManager.getAllUserIds();
        for (const _loc4_ of _loc3_ ?? []) {
            if (!(_loc4_ == this._SafeStr_3422 || _loc4_ == this._otherUserId)) {
                _loc2_ = _loc5_.userDataManager.getUserData(_loc4_ | 0);
                if (!(_loc2_ == null || _loc2_.name == null || _loc2_.name.length == 0)) {
                    _loc1_.push(_loc2_.name);
                }
            }
        }
        return _loc1_;
    }

    private getFriendNamesForNameScamDetection(): any[] {
        let _loc1_: IHabboFriendList = this._inventory.friendList;
        if (_loc1_ == null) {
            return [];
        }
        let _loc2_: any[] = _loc1_.getFriendNames();
        return _loc2_ ?? [];
    }

    public isConfirmingWeb3Trade(): boolean {
        return this.isWeb3Trade() && this._state == 4;
    }

    public isWeb3Trade(): boolean {
        return this.requiredSilverFee > 0 || (this.otherUserNftItems.length > 0 || this.ownUserNftItems.length > 0);
    }

    public categorySwitch(param1: string): void {
        this._tradingView.setMinimized(param1 != "furni" && param1 != "collectibles");
        this._inventory.updateSubView();
    }

    public set state(param1: number) {
        Logger.log("OLD STATE: " + this._state + " NEW STATE: " + param1 + " OWN: " + this._ownUserAccepts + " OTHER: " + this._otherUserAccepts);
        let _loc2_: boolean = false;
        if (this._state == param1) {
            return;
        }
        switch (this._state | 0) {
            case 0:
                if (param1 == 1 || param1 == 5) {
                    this._state = param1;
                    this._inventory.onTradeActiveChanged();
                    _loc2_ = true;
                }
                break;
            case 1:
                if (param1 == 2) {
                    this._state = param1;
                    _loc2_ = true;
                    this.startConfirmCountdown();
                } else if (param1 == 6) {
                    this._state = param1;
                    this._tradingView.setMinimized(false);
                    _loc2_ = true;
                }
                break;
            case 2:
                if (param1 == 3) {
                    this._state = param1;
                    _loc2_ = true;
                } else if (param1 == 6) {
                    this._state = param1;
                    this._tradingView.setMinimized(false);
                    _loc2_ = true;
                } else if (param1 == 1) {
                    this._state = param1;
                    _loc2_ = true;
                    this.cancelConfirmCountdown();
                }
                break;
            case 3:
                if (param1 == 4) {
                    this._state = param1;
                    _loc2_ = true;
                } else if (param1 == 5) {
                    this._state = param1;
                    _loc2_ = true;
                    this.close();
                } else if (param1 == 6) {
                    this._state = param1;
                    this._tradingView.setMinimized(false);
                    _loc2_ = true;
                    this.close();
                }
                break;
            case 4:
                if (param1 == 5) {
                    this._state = param1;
                    this._tradingView.setMinimized(false);
                    _loc2_ = true;
                    this.close();
                } else if (param1 == 6) {
                    this._state = param1;
                    this._tradingView.setMinimized(false);
                    _loc2_ = true;
                    this.close();
                }
                break;
            case 5:
                if (param1 == 0) {
                    this._state = param1;
                    this._inventory.onTradeActiveChanged(true);
                    _loc2_ = true;
                }
                break;
            case 6:
                if (param1 == 0) {
                    this._state = param1;
                    this._inventory.onTradeActiveChanged();
                    _loc2_ = true;
                } else if (param1 == 1) {
                    this._state = param1;
                    _loc2_ = true;
                }
                break;
            default:
                throw new Error("Unknown trading progress state: \"" + this._state + "\"");
        }
        if (_loc2_) {
            this._tradingView.updateUserInterface();
            return;
        }
        throw new Error("Error assigning trading process status! States does not match: (from) " + this._state + " (to) " + param1);
    }

    public getFurniInventoryModel(): FurniModel {
        return this._inventory.furniModel;
    }

    public getInventory(): HabboInventory {
        return this._inventory;
    }

    public updateItemGroupMaps(param1: TradingItemListEvent, param2: UtilsMap, param3: UtilsMap): void {
        if (this._inventory == null) {
            return;
        }
        if (this._ownUserItems != null) {
            this._ownUserItems.dispose();
        }
        if (this._otherUserItems != null) {
            this._otherUserItems.dispose();
        }
        if (param1.firstUserID == this._SafeStr_3422) {
            this._ownUserItems = param2;
            this._ownUserNumItems = param1.firstUserNumItems;
            this._ownUserNumCredits = param1.firstUserNumCredits;
            this._otherUserItems = param3;
            this._otherUserNumItems = param1.secondUserNumItems;
            this._otherUserNumCredits = param1.secondUserNumCredits;
        } else {
            this._ownUserItems = param3;
            this._ownUserNumItems = param1.secondUserNumItems;
            this._ownUserNumCredits = param1.secondUserNumCredits;
            this._otherUserItems = param2;
            this._otherUserNumItems = param1.firstUserNumItems;
            this._otherUserNumCredits = param1.firstUserNumCredits;
        }
        this._ownUserAccepts = false;
        this._otherUserAccepts = false;
        this._tradingView.updateItemList(this._SafeStr_3422);
        this._tradingView.updateItemList(this._otherUserId);
        this._tradingView.updateUserInterface();
        let _loc4_: FurniModel = this._inventory.furniModel;
        if (_loc4_ != null) {
            _loc4_.updateItemLocks();
        }
    }

    public updateNftItems(param1: UtilsMap, param2: UtilsMap, param3: number, param4: number): any {
        if (this._inventory == null) {
            return;
        }
        if (this._ownUserNftItems != null) {
            this._ownUserNftItems.dispose();
        }
        if (this._otherUserNftItems != null) {
            this._otherUserNftItems.dispose();
        }
        this._ownUserAccepts = false;
        this._otherUserAccepts = false;
        this._ownUserNftItems = param1;
        this._otherUserNftItems = param2;
        this._ownUserNumNftItems = param3 | 0;
        this._otherUserNumNftItems = param4 | 0;
        this._tradingView.updateItemList(this._SafeStr_3422);
        this._tradingView.updateItemList(this._otherUserId);
        this._tradingView.updateUserInterface();
        let _loc5_: CollectiblesModel = this._inventory.collectiblesModel;
        if (_loc5_ != null) {
            _loc5_.updateItemLocks();
        }
    }

    public getOwnItemIdsInTrade(): any[] {
        let _loc5_: GroupItem = null;
        let _loc2_: IFurnitureItem = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc1_: any[] = [];
        if (this._ownUserItems == null || this._ownUserItems.disposed) {
            return _loc1_;
        }
        _loc3_ = 0;
        while (_loc3_ < this._ownUserItems.length) {
            _loc5_ = asInstanceOf(this._ownUserItems.getWithIndex(_loc3_), GroupItem);
            if (_loc5_ != null) {
                _loc4_ = 0;
                while (_loc4_ < _loc5_.getTotalCount()) {
                    _loc2_ = _loc5_.getAt(_loc4_);
                    if (_loc2_ != null) {
                        _loc1_.push(_loc2_.ref);
                    }
                    _loc4_++;
                }
            }
            _loc3_++;
        }
        return _loc1_;
    }

    public get ownUserNumItems(): number {
        return this._ownUserNumItems;
    }

    public get ownHasAnyOffer(): boolean {
        return this._ownUserItems.length > 0 || this._ownUserNftItems.length > 0;
    }

    public get ownUserNumItemsTotal(): number {
        return this._ownUserNumItems + this._ownUserNumNftItems;
    }

    public get ownUserNumCredits(): number {
        return this._ownUserNumCredits;
    }

    public get otherUserNumItems(): number {
        return this._otherUserNumItems;
    }

    public get otherHasAnyOffer(): boolean {
        return this._otherUserItems.length > 0 || this._otherUserNftItems.length > 0;
    }

    public get otherUserNumItemsTotal(): number {
        return this._otherUserNumItems + this._otherUserNumNftItems;
    }

    public get otherUserNumCredits(): number {
        return this._otherUserNumCredits;
    }

    public getWindowContainer(): IWindowContainer {
        return this._tradingView.getWindowContainer();
    }

    public requestInitialization(): void {
    }

    public subCategorySwitch(param1: string): void {
        if (this._running) {
            if (this._state != 0) {
                this.requestCancelTrading();
            }
        }
    }

    public closingInventoryView(): void {
        if (this._running) {
            if (this.isConfirmingWeb3Trade()) {
                this._notifications.addItem(this._localization.getLocalization("tradingdialog.minimize_web3"), "info", "icon_curator_stamp_large_png");
            } else {
                this.close();
            }
        }
    }

    public startConfirmCountdown(): void {
        this._tradingView.startConfirmCountdown();
    }

    public cancelConfirmCountdown(): void {
        this._tradingView.cancelConfirmCountdown();
    }

    public confirmCountdownReady(): void {
        if (this._state == 2) {
            this.state = 3;
        }
    }

    public handleMessageEvent(param1: IMessageEvent): void {
        let _loc2_: TradingCloseEvent = null;
        let _loc4_: TradeSilverSetMessageEvent = null;
        let _loc3_: TradeSilverSetParser = null;
        let _loc5_: TradeSilverFeeMessageEvent = null;
        if (param1 instanceof TradeOpenFailedEvent) {
            Logger.log("TRADING::TradingOpenFailedEvent");
            if (castTo(param1, TradeOpenFailedEvent).getParser().reason == 7 || castTo(param1, TradeOpenFailedEvent).getParser().reason == 8) {
                this._tradingView.alertPopup(2);
            } else {
                this._tradingView.alertTradeOpenFailed(castTo(param1, TradeOpenFailedEvent));
            }
        } else if (param1 instanceof TradingAcceptEvent) {
            Logger.log("TRADING::TradingAcceptEvent");
            if (castTo(param1, TradingAcceptEvent).userID == this._SafeStr_3422) {
                this._ownUserAccepts = Number(castTo(param1, TradingAcceptEvent).userAccepts) != 0;
            } else {
                this._otherUserAccepts = Number(castTo(param1, TradingAcceptEvent).userAccepts) != 0;
            }
            this._tradingView.updateUserInterface();
        } else if (param1 instanceof TradingConfirmationEvent) {
            Logger.log("TRADING::TradingConfirmationEvent");
            this.state = 2;
        } else if (param1 instanceof TradingCompletedEvent) {
            Logger.log("TRADING::TradingCompletedEvent");
            if (this.isConfirmingWeb3Trade()) {
                this._notifications.addItem(this._localization.getLocalization("tradingdialog.done_messsage"), "info", "icon_curator_stamp_large_png");
            }
            this.state = 5;
        } else if (param1 instanceof TradingCloseEvent) {
            Logger.log("TRADING::TradingCloseEvent");
            if (!this._running) {
                Logger.log("Received TradingCloseEvent, but trading already stopped!!!");
                return;
            }
            _loc2_ = param1 instanceof TradingCloseEvent ? param1 : null;
            if (_loc2_.getParser().reason == 1) {
                if (this._inventory.getBoolean("trading.commiterror.enabled")) {
                    this._tradingView.windowManager.simpleAlert("${inventory.trading.notification.title}", "${inventory.trading.notification.commiterror.caption}", "${inventory.trading.notification.commiterror.info}");
                }
            } else if (_loc2_.getParser().userID != this._SafeStr_3422) {
                this._tradingView.alertPopup(1);
            }
            this.close();
        } else if (param1 instanceof TradingNotOpenEvent) {
            Logger.log("TRADING::TradingNotOpenEvent");
        } else if (param1 instanceof TradingOtherNotAllowedEvent) {
            this._tradingView.showOtherUserNotification("${inventory.trading.warning.others_account_disabled}");
        } else if (param1 instanceof TradingYouAreNotAllowedEvent) {
            this._tradingView.showOwnUserNotification("${inventory.trading.warning.own_account_disabled}");
        } else if (param1 instanceof TradeSilverSetMessageEvent) {
            _loc4_ = param1 instanceof TradeSilverSetMessageEvent ? param1 : null;
            _loc3_ = _loc4_.getParser();
            this._playerSilver = _loc3_.playerSilver;
            this._otherPlayerSilver = _loc3_.otherPlayerSilver;
            this._tradingView.updateUserInterface();
        } else if (param1 instanceof TradeSilverFeeMessageEvent) {
            _loc5_ = param1 instanceof TradeSilverFeeMessageEvent ? param1 : null;
            this._requiredSilverFee = _loc5_.getParser().silverFee;
            this._tradingView.updateUserInterface();
        } else {
            Logger.log("TRADING/Unknown message event: " + param1);
        }
    }

    public tradeFeeReached(): boolean {
        return this._playerSilver + this._otherPlayerSilver >= this._requiredSilverFee;
    }

    public requestFurniViewOpen(): void {
        this._inventory.toggleInventoryPage("furni");
    }

    public requestOpenTrading(param1: number): void {
        this._communication.connection.send(new OpenTradingComposer(param1));
    }

    public requestAddItemsToTrading(param1: number[], param2: boolean, param3: number, param4: number, param5: boolean, param6: IStuffData): void {
        let _loc8_: any = undefined;
        if (!param5 && param1.length > 0) {
            this._communication.connection.send(new AddItemToTradeComposer(param1.pop() | 0));
        } else {
            _loc8_ = [];
            for (const _loc7_ of param1 ?? []) {
                if (this.canAddItemToTrade(param2, param3, param4, param5, param6)) {
                    _loc8_.push(_loc7_);
                }
            }
            if (_loc8_.length > 0) {
                if (_loc8_.length == 1) {
                    this._communication.connection.send(new AddItemToTradeComposer(_loc8_.pop() | 0));
                } else {
                    this._communication.connection.send(new AddItemsToTradeComposer(_loc8_));
                }
            }
        }
    }

    public requestAddNftsToTrading(param1: number[]): void {
        let _loc3_: number[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push(_loc2_ | 0);
        }
        this._communication.connection.send(new AddNftToTradeComposer(_loc3_));
    }

    public canAddItemToTrade(param1: boolean, param2: number, param3: number, param4: boolean, param5: IStuffData): boolean {
        let _loc6_: string = null;
        if (this._ownUserAccepts) {
            return false;
        }
        if (this._ownUserItems == null) {
            return false;
        }
        if (this._ownUserItems.length < 9) {
            return true;
        }
        if (!param4) {
            return false;
        }
        _loc6_ = String(param2);
        if (param3 == 6) {
            _loc6_ = String(param2) + "poster" + param5.getLegacyString();
        } else if (param3 == 17) {
            _loc6_ = TradingModel.getGuildFurniType(param2, param5);
        } else {
            _loc6_ = (param1 ? "I" : "S") + _loc6_;
        }
        return this._ownUserItems.getValue(_loc6_) != null;
    }

    public requestRemoveItemFromTrading(param1: number): void {
        let _loc5_: CollectibleGroupedItem = null;
        let _loc4_: any = undefined;
        let _loc3_: IFurnitureItem = null;
        if (this._ownUserAccepts) {
            return;
        }
        let _loc2_: number = this.ownUserItems.length | 0;
        if (param1 >= _loc2_) {
            _loc5_ = this.ownUserNftItems.getWithIndex(param1 - _loc2_);
            if (_loc5_ != null) {
                _loc4_ = _loc5_.pop(1);
                if (_loc4_ != null && _loc4_.length == 1) {
                    this._communication.connection.send(new RemoveNftFromTradeComposer(_loc4_[0] | 0));
                }
            }
            return;
        }
        let _loc6_: GroupItem = this.ownUserItems.getWithIndex(param1);
        if (_loc6_) {
            _loc3_ = _loc6_.peek();
            if (_loc3_) {
                this._communication.connection.send(new RemoveItemFromTradeComposer(_loc3_.id));
            }
        }
    }

    public requestAcceptTrading(): void {
        this._communication.connection.send(new AcceptTradingComposer());
    }

    public requestUnacceptTrading(): void {
        this._communication.connection.send(new UnacceptTradingComposer());
    }

    public requestConfirmAcceptTrading(): void {
        this.state = 4;
        this._communication.connection.send(new ConfirmAcceptTradingComposer());
    }

    public requestConfirmDeclineTrading(): void {
        this._communication.connection.send(new ConfirmDeclineTradingComposer());
    }

    public requestCancelTrading(): void {
        if (!this.isConfirmingWeb3Trade()) {
            this._communication.connection.send(new CloseTradingComposer());
        }
    }

    public addSilverFee(param1: boolean): void {
        this._communication.connection.send(new SilverFeeMessageComposer(param1));
    }

    public isCreditFurniPresent(): boolean {
        return this._ownUserNumCredits > 0 || this._otherUserNumCredits > 0;
    }

    private get citizenshipTalentTrackEnabled(): boolean {
        return this._inventory.getBoolean("talent.track.citizenship.enabled");
    }

    public updateView(): void {
    }

    public selectItemById(param1: string): void {
        Logger.log("NOT SUPPORTED: TRADING VIEW SELECT BY ID");
    }

    public get requiredSilverFee(): number {
        return this._requiredSilverFee;
    }

    public get playerSilver(): number {
        return this._playerSilver;
    }

    public get otherPlayerSilver(): number {
        return this._otherPlayerSilver;
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
