import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { TradingItemListParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingItemListParser';
import type { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { ITradingModel } from '@/com/sulake/habbo/inventory/trading/ITradingModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { WiredTradeAddDeleteItemsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/trade/WiredTradeAddDeleteItemsMessageComposer';
import { WiredTradeCancelMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/trade/WiredTradeCancelMessageComposer';
import { WiredTradeConfirmMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/trade/WiredTradeConfirmMessageComposer';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import { WiredTradingView } from '@/com/sulake/habbo/inventory/wired_trading/WiredTradingModel.group';
import { Logger } from '@/com/sulake/habbo/Logger';

export class WiredTradingModel implements IInventoryModel, ITradingModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading::WiredTradingModel'); }

    public static _log: number = 0;
    public static readonly STATE_READY: number = 0;
    public static readonly STATE_ADDING_ITEMS: number = 1;
    public static readonly STATE_COUNTDOWN: number = 2;
    public static readonly STATE_CONFIRMING: number = 3;
    public static readonly STATE_CONFIRMED: number = 4;

    declare private _inventory: HabboInventory;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _roomEngine: IRoomEngine;

    declare private _communication: IHabboCommunicationManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _soundManager: IHabboSoundManager;

    declare private _tradingView: WiredTradingView;

    declare private _notifications: IHabboNotifications;

    declare private _tradeRequirementsModel: WiredTradeRequirementsModel;

    declare private _running: boolean;
    static { (this.prototype as any)._running = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    private _state: number = 0;

    declare private _ownUserItems: UtilsMap;

    private _ownUserNumItems: number = 0;
    private _ownUserNumCredits: number = 0;

    declare private _wiredItems: UtilsMap;

    private _wiredNumItems: number = 0;
    private _wiredNumCredits: number = 0;

    declare private _canAccept: boolean;
    static { (this.prototype as any)._canAccept = false; }

    declare private _extra: number;
    static { (this.prototype as any)._extra = 0; }

    declare private _timeoutSeconds: number;
    static { (this.prototype as any)._timeoutSeconds = 0; }

    declare private _tradeStartTime: number;
    static { (this.prototype as any)._tradeStartTime = 0; }

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboLocalizationManager, param7: IHabboSoundManager, param8: IHabboNotifications) {
        this._inventory = param1;
        this._communication = param3;
        this._SafeStr_3052 = param4;
        this._roomEngine = param5;
        this._localization = param6;
        this._soundManager = param7;
        this._tradingView = new WiredTradingView(this, param2, param4, param5, param6, param7);
        this._notifications = param8;
        this._tradeRequirementsModel = new WiredTradeRequirementsModel(this);
    }

    public onWiredTradeInitiate(param1: TradeRequirement, param2: boolean, param3: boolean, param4: number): void {
        if (param3) {
            this.close(false, false, false);
        }
        this._running = false;
        if (this._state != 0) {
            this.clear();
            this.state = 0;
        }
        this._timeoutSeconds = param4;
        this._tradeStartTime = getTimer();
        this._tradingView.startSecondsLeftTimer();
        this._tradeRequirementsModel.setRequirements(param1, param2);
        this._inventory.toggleInventorySubPage("wired_trading");
        if (param3) {
            this._tradeRequirementsModel.highlightRefresh();
        }
    }

    public set state(param1: number) {
        this._state = param1;
        this._tradingView.tradeStateUpdated();
    }

    private clear(): void {
        this._ownUserItems = new UtilsMap();
        this._ownUserNumCredits = 0;
        this._ownUserNumItems = 0;
        this._wiredItems = new UtilsMap();
        this._wiredNumCredits = 0;
        this._wiredNumItems = 0;
        this._canAccept = false;
        this._extra = 0;
        this._tradingView.updateAllUI();
    }

    public get inventory(): HabboInventory {
        return this._inventory;
    }

    public get running(): boolean {
        return this._running;
    }

    public getWindowContainer(): IWindowContainer {
        return this._tradingView.getWindowContainer();
    }

    public requestInitialization(): void {
    }

    public categorySwitch(param1: string): void {
    }

    public subCategorySwitch(param1: string): void {
        if (!this._running && param1 == "wired_trading") {
            if (this._state != 0) {
                Logger.log("opened wired trade but wasn\'t ready");
            }
            this.initializeNewTrade();
        } else if (this._running && param1 != "wired_trading" && this._state != 0) {
            this.close(false, true);
        }
    }

    public closingInventoryView(): void {
        if (this._running) {
            this.close(true, true);
        }
    }

    public initializeNewTrade(): void {
        this._running = true;
        this.clear();
        this.state = 1;
        this._inventory.onWiredTradeActiveChanged();
        this._inventory.view.activate();
        this._inventory.furniModel.updateView();
    }

    public requestAddItemsToTrading(param1: number[], param2: boolean, param3: number, param4: number, param5: boolean, param6: IStuffData): void {
        if (this._state == 1) {
            this.send(new WiredTradeAddDeleteItemsMessageComposer(false, param1));
        }
    }

    public requestRemoveItemFromTrading(param1: number): void {
        let _loc3_: GroupItem = null;
        let _loc2_: IFurnitureItem = null;
        if (this._state == 1) {
            _loc3_ = this.ownUserItems.getWithIndex(param1);
            _loc2_ = _loc3_.peek();
            if (_loc2_) {
                this._communication.connection.send(new WiredTradeAddDeleteItemsMessageComposer(true, Array.from([_loc2_.id])));
            }
        }
    }

    public requestAccept(): boolean {
        if (this._state == 1) {
            this.send(new WiredTradeConfirmMessageComposer(false));
            this.state = 2;
            return true;
        }
        return false;
    }

    public confirmCountdownReady(): void {
        if (this._state == 2) {
            this.state = 3;
        }
    }

    public requestConfirm(): boolean {
        if (this._state == 3) {
            this.send(new WiredTradeConfirmMessageComposer(true));
            this.state = 4;
            return true;
        }
        return false;
    }

    public get tradingView(): WiredTradingView {
        return this._tradingView;
    }

    public send(param1: IMessageComposer): void {
        this._communication.connection.send(param1);
    }

    public close(param1: boolean, param2: boolean, param3: boolean = true): void {
        if (this._running) {
            this._tradingView.stopSecondsLeftTimer();
            if (this._state != 0 && param2) {
                this.requestCancelTrading();
            }
            this.clear();
            this.state = 0;
            this._running = false;
            this._inventory.onWiredTradeActiveChanged();
            if (param1) {
                this._inventory.toggleInventorySubPage("empty");
            }
            if (param3) {
                this._inventory.furniModel.updateView();
            }
        }
    }

    public requestCancelTrading(): void {
        this._communication.connection.send(new WiredTradeCancelMessageComposer());
    }

    public updateItemGroupMaps(param1: TradingItemListParser, param2: UtilsMap, param3: UtilsMap, param4: boolean, param5: number): void {
        if (this._inventory == null || !this._running) {
            return;
        }
        this._ownUserItems = param2;
        this._ownUserNumItems = param1.firstUserNumItems;
        this._ownUserNumCredits = param1.firstUserNumCredits;
        this._wiredItems = param3;
        this._wiredNumItems = param1.secondUserNumItems;
        this._wiredNumCredits = param1.secondUserNumCredits;
        this._canAccept = param4;
        this._extra = param5;
        this._tradingView.updateAllUI();
        this._tradeRequirementsModel.requirementsStateUpdated();
        let _loc6_: FurniModel = this._inventory.furniModel;
        if (_loc6_ != null) {
            _loc6_.updateItemLocks();
        }
    }

    public tradeIsCancelled(param1: number): void {
        this._inventory.wiredTradingModel.close(true, false);
        this._tradingView.alertTradeCancelled(param1);
    }

    public tradeIsCompleted(): void {
        this._inventory.wiredTradingModel.close(true, false);
    }

    public updateView(): void {
    }

    public selectItemById(param1: string): void {
        Logger.log("NOT SUPPORTED: TRADING VIEW SELECT BY ID");
    }

    public getInventory(): HabboInventory {
        return this._inventory;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._tradeRequirementsModel.dispose();
        this._tradeRequirementsModel = null;
        this._tradingView.dispose();
        this._tradingView = null;
        this._inventory = null;
        this._SafeStr_3052 = null;
        this._roomEngine = null;
        this._communication = null;
        this._localization = null;
        this._soundManager = null;
        this._notifications = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public getOwnItemIdsInTrade(): any[] {
        let _loc3_: number = 0;
        let _loc5_: GroupItem = null;
        let _loc4_: number = 0;
        let _loc2_: IFurnitureItem = null;
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

    public get tradeRequirementsModel(): WiredTradeRequirementsModel {
        return this._tradeRequirementsModel;
    }

    public isPayment(): boolean {
        if (this._tradeRequirementsModel.requirement == null) {
            return true;
        }
        return this._tradeRequirementsModel.requirement.isPaymentOnly();
    }

    public get paymentLayoutType(): string {
        if (this._tradeRequirementsModel.requirement == null) {
            return null;
        }
        return this._tradeRequirementsModel.requirement.layoutType;
    }

    public get tradeTypeLocalization(): string {
        return this._localization.getLocalization(this.isPayment() ? "inventory.wired_trading.payment" : "inventory.wired_trading.trade");
    }

    public get ownUserItems(): UtilsMap {
        return this._ownUserItems;
    }

    public get ownUserNumItems(): number {
        return this._ownUserNumItems;
    }

    public get ownUserNumCredits(): number {
        return this._ownUserNumCredits;
    }

    public get wiredItems(): UtilsMap {
        return this._wiredItems;
    }

    public get wiredNumItems(): number {
        return this._wiredNumItems;
    }

    public get wiredNumCredits(): number {
        return this._wiredNumCredits;
    }

    public get canAccept(): boolean {
        return this._canAccept;
    }

    public get extra(): number {
        return this._extra;
    }

    public get state(): number {
        return this._state;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get secondsLeft(): number {
        if (this._timeoutSeconds <= 0 || this._tradeStartTime <= 0) {
            return -1;
        }
        let _loc1_: number = (getTimer() - this._tradeStartTime) / 1000 | 0;
        let _loc2_: number = this._timeoutSeconds - _loc1_;
        if (_loc2_ < 0) {
            _loc2_ = 0;
        }
        return _loc2_;
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
