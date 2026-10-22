import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IUnseenItemTracker } from '@/com/sulake/habbo/inventory/IUnseenItemTracker';
import type { MarketplaceModel } from '@/com/sulake/habbo/inventory/marketplace/MarketplaceModel';
import type { RecyclerModel } from '@/com/sulake/habbo/inventory/recycler/RecyclerModel';
import type { ITradingModel } from '@/com/sulake/habbo/inventory/trading/ITradingModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Set } from '@/com/sulake/core/utils/Set';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurniData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniData';
import { RequestFurniInventoryComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/furni/RequestFurniInventoryComposer';
import { RequestFurniInventoryWhenNotInRoomComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/furni/RequestFurniInventoryWhenNotInRoomComposer';
import { RequestRoomPropertySet } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/furni/RequestRoomPropertySet';
import { OpenFlatConnectionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/session/OpenFlatConnectionMessageComposer';
import { HabboInventoryCategoryInitializeEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryCategoryInitializeEvent';
import { FurniView } from '@/com/sulake/habbo/inventory/furni/FurniView';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { CreditTradingItem } from '@/com/sulake/habbo/inventory/items/CreditTradingItem';
import { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { RoomEngineObjectPlacedEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedEvent';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FurniModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.furni::FurniModel'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FurniModel.#initStatics();
        return FurniModel._log;
    }

    private static readonly IMAGE_UPDATE_DELAY_MS: number = 50;

    private static arrayToSet(param1: any[]): Map<any, any> {
        let _loc2_: Map<any, any> = new Dictionary();
        for (const _loc3_ of param1 ?? []) {
            _loc2_.set(_loc3_, true);
        }
        return _loc2_;
    }

    constructor(param1: HabboInventory, param2: MarketplaceModel, param3: IHabboWindowManager, param4: IHabboCommunicationManager, param5: IAssetLibrary, param6: IRoomEngine, param7: IHabboCatalog, param8: IHabboSoundManager, param9: IHabboLocalizationManager) {
        this._controller = param1;
        this._communication = param4;
        this._windowManager = param3;
        this._assets = param5;
        this._roomEngine = param6;
        this._roomEngine.events.addEventListener("REOE_PLACED", this.onObjectPlaced);
        this._catalog = param7;
        this._soundManager = param8;
        this._localization = param9;
        this._thumbWindowTemplates = new Dictionary();
        this._SafeStr_6915 = this._controller.getProperty("catalog.preview.alignment.bottom").split(",");
        this._SafeStr_3259 = new Timer(50);
        this._SafeStr_3259.addEventListener("timer", this.onImageUpdateTimerEvent);
        this._SafeStr_4504 = new Dictionary();
        this._SafeStr_4504.set("furni", null);
        this._SafeStr_4504.set("rentables", null);
        this.clearFurniList();
        this._view = new FurniView(this, param2, this._windowManager, this._assets, this._roomEngine);
    }

    declare private _controller: HabboInventory;

    declare private _view: FurniView;

    declare private _furniData: GroupItem[];

    declare private _assets: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _communication: IHabboCommunicationManager;

    private _SafeStr_3970: number = -1;

    declare private _SafeStr_2680: boolean;
    static { (this.prototype as any)._SafeStr_2680 = false; }

    declare private _SafeStr_3259: Timer;

    declare private _SafeStr_6910: boolean;
    static { (this.prototype as any)._SafeStr_6910 = false; }

    declare private _catalog: IHabboCatalog;

    declare private _thumbWindowTemplates: Map<any, any>;

    declare private _SafeStr_6915: any[];

    declare private _showingRentedFurni: boolean;
    static { (this.prototype as any)._showingRentedFurni = false; }

    declare private _SafeStr_4504: Map<any, any>;

    declare private _category: string;

    private _imageUpdateCumulativeTime: number = 0;
    private _roomItemToSelect: FurnitureItem = null;
    private _isInRoom: boolean = false;
    private _showingNfts: boolean = true;

    declare private _soundManager: IHabboSoundManager;

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _localization: IHabboLocalizationManager;

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get controller(): HabboInventory {
        return this._controller;
    }

    public get isTradingOpen(): boolean {
        return this._controller.getSubCategoryViewId() == "trading" || this._controller.getSubCategoryViewId() == "wired_trading";
    }

    public get isPrivateRoom(): boolean {
        if (!this._controller || !this._controller.roomSession) {
            return false;
        }
        return this._controller.roomSession.isPrivateRoom;
    }

    public get furniData(): GroupItem[] {
        return this._furniData;
    }

    public get showingRentedFurni(): boolean {
        return this._showingRentedFurni;
    }

    public set categorySelection(param1: GroupItem) {
        this._SafeStr_4504.set(this._category, param1);
    }

    public get showingNfts(): boolean {
        return this._showingNfts;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._controller = null;
            if (this._furniData != null) {
                this._furniData = null;
            }
            if (this._view != null) {
                this._view.dispose();
                this._view = null;
            }
            if (this._roomEngine != null) {
                if (this._roomEngine.events != null) {
                    this._roomEngine.events.removeEventListener("REOE_PLACED", this.onObjectPlaced);
                }
                this._roomEngine = null;
            }
            this._communication = null;
            this._assets = null;
            this._windowManager = null;
            this._catalog = null;
            this._soundManager = null;
            this._localization = null;
            if (this._SafeStr_3259 != null) {
                this._SafeStr_3259.removeEventListener("timer", this.onImageUpdateTimerEvent);
                this._SafeStr_3259.stop();
                this._SafeStr_3259 = null;
            }
            for (const _loc1_ of this._thumbWindowTemplates?.values() ?? []) {
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
            }
            this._thumbWindowTemplates = null;
            this._disposed = true;
        }
    }

    public createItemWindow(param1: any): IWindowContainer {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: XML = null;
        if (this._thumbWindowTemplates.get(param1) == null) {
            _loc4_ = this._assets.getAssetByName(stringOrNull(param1));
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = XML.from(_loc2_.content);
            this._thumbWindowTemplates.set(param1, asGuarded(this._windowManager.buildFromXML(_loc3_), isIWindowContainer));
        }
        return this._thumbWindowTemplates.get(param1).clone();
    }

    public insertFurniture(param1: UtilsMap): void {
        let _loc2_: FurnitureItem = null;
        let _loc4_: FurniData = null;
        let _loc7_: number = 0;
        let _loc11_: number = 0;
        let _loc14_: HabboInventoryCategoryInitializeEvent = null;
        let _loc5_: boolean = this._controller.setInventoryCategoryInit("furni");
        let _loc12_: Map<any, any> = this.getAllStripIds();
        let _loc9_: any[] = param1.getKeys();
        let _loc10_: Map<any, any> = FurniModel.arrayToSet(_loc9_);
        let _loc3_: number[] = new Array<number>(0).fill(0);
        let _loc13_: number[] = new Array<number>(0).fill(0);
        for (const _loc6_ of _loc9_ ?? []) {
            if (!(_loc12_.has(_loc6_))) {
                _loc3_.push(_loc6_ | 0);
            }
        }
        for (_loc11_ of _loc12_?.keys() ?? []) {
            if (!(_loc10_.has(_loc11_))) {
                _loc13_.push(_loc11_);
            }
        }
        let _loc8_: any = _loc12_.get("length") == 0;
        for (_loc11_ of _loc13_ ?? []) {
            this.removeFurni(_loc11_);
        }
        for (_loc11_ of _loc3_ ?? []) {
            _loc4_ = castTo(param1.getValue(_loc11_), FurniData);
            _loc2_ = new FurnitureItem(_loc4_);
            this.addOrUpdateItem(_loc2_, true);
        }
        if (!_loc8_) {
            if (_loc3_.length > 0) {
                this.updateItemLocks();
            }
        }
        this.setListInitialized();
        this._view.addItems(this._furniData);
        if (_loc8_) {
            this.selectFirstItem();
        } else if (this.getSelectedItem() == null) {
            this.selectFirstItem();
        }
        this.setViewToState();
        this.initListImages();
        if (_loc5_) {
            _loc14_ = new HabboInventoryCategoryInitializeEvent("furni");
            this._controller.events.dispatchEvent(_loc14_);
        }
    }

    public isListInited(): boolean {
        return this._SafeStr_6910;
    }

    public setListInitialized(): void {
        this._SafeStr_6910 = true;
    }

    public createGroupItem(param1: number, param2: number, param3: IStuffData, param4: number = NaN, param5: boolean = false): GroupItem {
        let _loc8_: BitmapData = null;
        let _loc7_: IAsset = null;
        if (param2 == 2) {
            _loc7_ = this._windowManager.assets.getAssetByName("inventory_furni_icon_wallpaper");
            if (_loc7_ != null) {
                _loc8_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
            }
        } else if (param2 == 3) {
            _loc7_ = this._windowManager.assets.getAssetByName("inventory_furni_icon_floor");
            if (_loc7_ != null) {
                _loc8_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
            }
        } else if (param2 == 4) {
            _loc7_ = this._windowManager.assets.getAssetByName("inventory_furni_icon_landscape");
            if (_loc7_ != null) {
                _loc8_ = (asInstanceOf(_loc7_.content, BitmapData)).clone();
            }
        }
        let _loc9_: string = "center";
        let _loc6_: string = this._roomEngine.getFurnitureType(param1);
        if (this._SafeStr_6915.indexOf(_loc6_) > -1) {
            _loc9_ = "bottom";
        }
        return new GroupItem(this, param1, param2, this._roomEngine, this._controller.recyclerModel.running, param3, param4, _loc8_, param5, _loc9_);
    }

    public createCreditGroupItem(param1: number): GroupItem {
        return new CreditTradingItem(this, this._windowManager.assets, this._roomEngine, param1);
    }

    public requestInitialization(): void {
        let _loc1_: IConnection = this._communication.connection;
        if (_loc1_ != null) {
            if (this._isInRoom) {
                _loc1_.send(new RequestFurniInventoryComposer());
            } else {
                _loc1_.send(new RequestFurniInventoryWhenNotInRoomComposer());
            }
        }
    }

    public categorySwitch(param1: string): void {
        if (this._controller.isVisible) {
            FurniModel._log.info("FurniMode.categorySwitch: " + param1);
            switch (param1) {
                case "furni":
                case "rentables":
                    this._category = param1;
                    this._showingRentedFurni = this._category == "rentables";
                    this._view.resetFilters(param1);
                    this.updateCategorySelection();
                    this.updateItemLocks();
            }
        }
    }

    public getWindowContainer(): IWindowContainer {
        this._controller.checkCategoryInitilization("marketplace");
        return this._view.getWindowContainer();
    }

    public closingInventoryView(): void {
        if (this._view.isVisible) {
            this.resetUnseenItems();
        }
    }

    public updateItemLocks(): void {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        let _loc1_: ITradingModel = this._controller.activeTradingModel;
        if (_loc1_ != null) {
            _loc3_ = _loc3_.concat(_loc1_.getOwnItemIdsInTrade());
        }
        let _loc5_: RecyclerModel = this._controller.recyclerModel;
        if (_loc5_ != null) {
            _loc3_ = _loc3_.concat(_loc5_.getOwnItemsInRecycler());
        }
        let _loc4_: MarketplaceModel = this._controller.marketplaceModel;
        if (_loc4_ != null && _loc4_.getOfferItem() != null) {
            _loc3_ = _loc3_.concat([_loc4_.getOfferItem().ref]);
        }
        if (_loc3_.length == 0) {
            this.removeAllLocks();
            return;
        }
        for (_loc2_ of this._furniData ?? []) {
            _loc2_.updateLocks(_loc3_);
        }
        this._view.updateActionView();
    }

    public addLockTo(param1: number): void {
        let _loc2_: any = null;
        for (_loc2_ of this._furniData ?? []) {
            _loc2_.addLockTo(param1);
        }
        this._view.updateActionView();
    }

    public removeLockFrom(param1: number): void {
        let _loc2_: any = null;
        for (_loc2_ of this._furniData ?? []) {
            _loc2_.removeLockFrom(param1);
        }
        this._view.updateActionView();
    }

    public showRecyclable(param1: boolean): void {
        let _loc2_: any = null;
        for (_loc2_ of this._furniData ?? []) {
            _loc2_.showRecyclable = param1;
        }
        this._view.updateActionView();
    }

    public clearFurniList(): void {
        this._furniData = new Array<GroupItem>(0).fill(null);
        if (this._view != null) {
            this._view.clearViews();
        }
    }

    public removeUnseenFurniCounter(param1: number): boolean {
        let _loc2_: boolean = false;
        let _loc3_: number = 0;
        let _loc6_: IUnseenItemTracker = this._controller.unseenItemTracker;
        if (_loc6_ == null) {
            return false;
        }
        let _loc4_: GroupItem = this.getItemById(param1);
        if (_loc4_ == null) {
            return false;
        }
        if (this._category == "rentables") {
            _loc3_ = 2;
        } else {
            _loc3_ = 1;
        }
        let _loc5_: boolean = this._controller.unseenItemTracker.isUnseen(_loc3_, param1);
        if (_loc5_) {
            _loc2_ = _loc6_.removeUnseen(_loc3_, param1);
        }
        if (_loc2_) {
            _loc6_.resetCategoryIfEmpty(_loc3_);
        }
        return _loc2_;
    }

    public getItemWithStripId(param1: number): GroupItem {
        let _loc2_: IFurnitureItem = null;
        for (const _loc3_ of this._furniData ?? []) {
            _loc2_ = _loc3_.getItem(param1);
            if (_loc2_) {
                return _loc3_;
            }
        }
        return null;
    }

    public getGroupItemByItemTypeId(param1: number, param2: boolean): GroupItem {
        for (const _loc3_ of this._furniData ?? []) {
            if (_loc3_.type == param1 && param2 == _loc3_.isWallItem) {
                return _loc3_;
            }
        }
        return null;
    }

    public addOrUpdateItem(param1: FurnitureItem, param2: boolean): GroupItem {
        let _loc3_: GroupItem = null;
        if (!param1.groupable && param1.category != 19 && param1.category != 24 && param1.category != 25) {
            _loc3_ = this.addOrUpdateNonGroupableItem(param1, param2);
        } else {
            _loc3_ = this.addOrUpdateGroupableItem(param1, param2);
        }
        if (!param2) {
            _loc3_.hasUnseenItems = true;
        }
        if (_loc3_.isSelected) {
            this._view.updateActionView();
        }
        this._catalog.itemAddedToInventory(param1.type, param1.id, param1.category);
        this._catalog.collectorHub.itemAddedToInventory(param1.type, param1.id, param1.isWallItem);
        return _loc3_;
    }

    public setViewToState(): void {
        this._view.setViewToState();
    }

    public removeFurni(param1: number): GroupItem {
        let _loc3_: GroupItem = null;
        let _loc4_: number = 0;
        let _loc2_: IFurnitureItem = null;
        _loc4_ = 0;
        while (_loc4_ < this._furniData.length) {
            _loc3_ = asInstanceOf(this._furniData[_loc4_], GroupItem);
            _loc2_ = _loc3_.remove(param1);
            if (_loc2_) {
                if (_loc3_.getTotalCount() <= 0) {
                    this._furniData.splice(_loc4_, 1);
                    if (this._view && this._view.grid) {
                        this._view.grid.itemWasUpdated(_loc3_);
                    }
                    if (_loc3_.isSelected) {
                        this.selectFirstItem();
                    }
                    _loc3_.dispose();
                } else {
                    this._view.updateActionView();
                }
                this._view.setViewToState();
                this._catalog.collectorHub.itemRemovedFromInventory(_loc2_.type, _loc2_.id, _loc2_.isWallItem);
                return _loc3_;
            }
            _loc4_++;
        }
        return null;
    }

    public removeFurnis(param1: number[]): boolean {
        let _loc3_: GroupItem = null;
        let _loc8_: number = 0;
        let _loc2_: IFurnitureItem = null;
        let _loc5_: boolean = false;
        let _loc7_: boolean = false;
        let _loc6_: boolean = false;
        for (const _loc4_ of param1 ?? []) {
            _loc8_ = 0;
            while (_loc8_ < this._furniData.length) {
                _loc3_ = asInstanceOf(this._furniData[_loc8_], GroupItem);
                _loc2_ = _loc3_.remove(_loc4_);
                if (_loc2_) {
                    _loc5_ = true;
                    if (_loc3_.getTotalCount() <= 0) {
                        this._furniData.splice(_loc8_, 1);
                        if (this._view && this._view.grid) {
                            this._view.grid.itemWasUpdated(_loc3_);
                        }
                        if (_loc3_.isSelected) {
                            _loc6_ = true;
                        }
                        _loc3_.dispose();
                    } else {
                        _loc7_ = true;
                    }
                    this._catalog.collectorHub.itemRemovedFromInventory(_loc2_.type, _loc2_.id, _loc2_.isWallItem);
                }
                _loc8_++;
            }
        }
        if (_loc5_) {
            if (_loc6_) {
                this.selectFirstItem();
            }
            if (_loc7_) {
                this._view.updateActionView();
            }
            this._view.setViewToState();
        }
        return _loc5_;
    }

    public updatePostItCount(param1: number, param2: number): void {
        let _loc3_: FurnitureItem = null;
        let _loc5_: LegacyStuffData = null;
        for (const _loc4_ of this._furniData ?? []) {
            _loc3_ = asInstanceOf(_loc4_.getItem(param1), FurnitureItem);
            if (_loc3_ != null) {
                _loc5_ = asInstanceOf(_loc3_.stuffData, LegacyStuffData);
                _loc5_.setString(String(param2));
                _loc3_.stuffData = _loc5_;
                _loc4_.replaceItem(param1, _loc3_);
            }
        }
    }

    public selectFirstItem(): void {
        let _loc2_: IWindowContainer = this._view.getFirstThumb();
        if (_loc2_ == null) {
            return;
        }
        for (const _loc1_ of this._furniData ?? []) {
            if (_loc1_.window == _loc2_) {
                _loc1_.isSelected = true;
                _loc1_.selectedItemIndex = -1;
                break;
            }
        }
        this._view.updateActionView();
    }

    public displayItemInfo(param1: GroupItem): void {
        if (this._view && !this._view.disposed) {
            this._view.displayItemInfo(param1);
        }
    }

    public getSelectedItem(): GroupItem {
        for (const _loc1_ of this._furniData ?? []) {
            if (_loc1_.isSelected) {
                return _loc1_;
            }
        }
        return null;
    }

    public removeSelections(): void {
        for (const _loc1_ of this._furniData ?? []) {
            _loc1_.isSelected = false;
        }
    }

    public canUserOfferToTrade(): boolean {
        return this._controller.canUserOfferToTrade();
    }

    public removeAllLocks(): void {
        for (const _loc1_ of this._furniData ?? []) {
            _loc1_.removeAllLocks();
        }
        if (this._view != null) {
            this._view.updateActionView();
        }
    }

    public cancelFurniInMover(): void {
        if (this._SafeStr_3970 > -1) {
            this._roomEngine.cancelRoomObjectInsert();
            this._SafeStr_2680 = false;
            this._SafeStr_3970 = -1;
        }
    }

    public requestSelectedFurniPlacement(param1: boolean = false, param2: boolean = true): boolean {
        let _loc4_: GroupItem = this.getSelectedItem();
        if (_loc4_ == null) {
            return false;
        }
        if (_loc4_.getUnlockedCount() == 0) {
            return false;
        }
        if (_loc4_.selectedItemIndex < 0 && param2) {
            _loc4_.selectedItemIndex = _loc4_.getTotalCount() - 1;
        }
        let _loc3_: FurnitureItem = _loc4_.getAt(_loc4_.selectedItemIndex);
        if (_loc3_ == null) {
            return false;
        }
        if (_loc3_.isRented && _loc3_.flatId > -1) {
            return false;
        }
        if (_loc3_.category == 3 || _loc3_.category == 2 || _loc3_.category == 4) {
            if (param1) {
                return false;
            }
            this._communication.connection.send(new RequestRoomPropertySet(_loc3_.id));
        } else {
            this.requestSelectedFurniToMover(_loc3_);
        }
        this._view.updateActionView();
        return true;
    }

    public requestSelectedFurniToTrading(param1: number = 1, param2: ITextFieldWindow = null): void {
        let itemsInTrade: IFurnitureItem[];
        let coreItem: IFurnitureItem;
        let itemIds: number[];
        let furnitureItem: IFurnitureItem;
        let trading: ITradingModel;
        let ownItemCount: number = 0;
        let itemsToTrade: number = param1;
        let offerInTradingCount: ITextFieldWindow = param2;
        let groupItem: GroupItem = this.getSelectedItem();
        if (groupItem == null) {
            return;
        }
        itemsInTrade = groupItem.getItemsForTrade(itemsToTrade);
        if (itemsInTrade.length == 0) {
            return;
        }
        coreItem = null;
        itemIds = [];
        for (furnitureItem of itemsInTrade ?? []) {
            itemIds.push(furnitureItem.id);
            if (coreItem == null) {
                coreItem = furnitureItem;
            }
        }
        if (coreItem == null) {
            return;
        }
        trading = this._controller.activeTradingModel;
        if (trading != null) {
            ownItemCount = trading.getOwnItemIdsInTrade().length | 0;
            if (ownItemCount + itemIds.length <= 1500) {
                if (offerInTradingCount != null) {
                    offerInTradingCount.caption = String(itemIds.length);
                }
                trading.requestAddItemsToTrading(itemIds, coreItem.isWallItem, coreItem.type, coreItem.category, coreItem.groupable, coreItem.stuffData);
            } else {
                if (offerInTradingCount != null) {
                    offerInTradingCount.caption = "1";
                }
                this._windowManager.alert("${trading.items.too_many_items.title}", "${trading.items.too_many_items.desc}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                        param1.dispose();
                    });
            }
        } else if (offerInTradingCount != null) {
            offerInTradingCount.caption = "1";
        }
        this._view.updateActionView();
    }

    public gotoRoom(): void {
        let _loc2_: GroupItem = this.getSelectedItem();
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: FurnitureItem = _loc2_.peek();
        if (_loc1_ == null) {
            return;
        }
        if (this._communication == null) {
            return;
        }
        let _loc3_: IConnection = this._communication.connection;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.send(new OpenFlatConnectionMessageComposer(_loc1_.flatId));
        this._roomItemToSelect = _loc1_;
    }

    public requestSelectedFurniSelling(): void {
        let _loc2_: GroupItem = this.getSelectedItem();
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: FurnitureItem = _loc2_.getOneForTrade();
        if (_loc1_ == null) {
            return;
        }
        let _loc3_: MarketplaceModel = this._controller.marketplaceModel;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.startOfferMaking(_loc1_);
    }

    public requestSelectedFurniToRecycler(): IFurnitureItem {
        let _loc2_: GroupItem = this.getSelectedItem();
        if (_loc2_ == null) {
            return null;
        }
        let _loc1_: IFurnitureItem = _loc2_.getOneForRecycle();
        if (_loc1_ == null) {
            return null;
        }
        this._view.updateActionView();
        return _loc1_;
    }

    public requestCurrentActionOnSelection(): void {
        if (this._controller.recyclerModel.running) {
            this._controller.recycleSelectedFurni();
        } else if (this.isTradingOpen) {
            this.requestSelectedFurniToTrading();
        } else {
            this.requestSelectedFurniPlacement(false);
        }
    }

    public requestClose(): void {
        this._controller.closeView();
    }

    public showUseProductSelection(): void {
        let _loc1_: IFurnitureItem = null;
        let _loc2_: GroupItem = this.getSelectedItem();
        if (_loc2_ != null && _loc2_.peek() != null) {
            _loc1_ = _loc2_.peek();
            if (_loc1_) {
                this._roomEngine.showUseProductSelection(_loc1_.ref, _loc1_.type);
            }
        }
    }

    public subCategorySwitch(param1: string): void {
        switch (param1) {
            case "wired_trading":
                this.cancelFurniInMover();
                if (this._view != null) {
                    this._view.resetFilterOption();
                    this._view.updateActionView();
                }
                break;
            case "trading":
                this.cancelFurniInMover();
                if (this._view != null && this._showingNfts && this.controller.web3tradeEnabled) {
                    this._showingNfts = false;
                    this._view.updateGridFilters();
                }
                if (this._view != null) {
                    this._view.updateActionView();
                }
                break;
            case "empty":
                this.removeAllLocks();
                if (this._view != null && !this._showingNfts && this.controller.web3tradeEnabled) {
                    this._showingNfts = true;
                    this._view.updateGridFilters();
                }
                if (this._view != null) {
                    this._view.updateActionView();
                }
        }
    }

    public updateActionView(): void {
        this._view.updateActionView();
    }

    public updateView(): void {
        if (this._view != null) {
            this._view.updateActionView();
            this._view.updateGridFilters();
        }
    }

    public resetUnseenItems(): void {
        if (!this._view) {
            return;
        }
        let _loc2_: boolean = false;
        if (this._category == "rentables") {
            this._controller.unseenItemTracker.resetCategory(2);
            _loc2_ = true;
        } else {
            this._controller.unseenItemTracker.resetCategory(1);
        }
        for (const _loc1_ of this._furniData ?? []) {
            if (_loc1_.hasUnseenItems && _loc1_.isRented == _loc2_) {
                _loc1_.hasUnseenItems = false;
            }
        }
        this._controller.updateUnseenItemCounts();
    }

    public updateUnseenItemsThumbs(param1: GroupItem[] = null, param2: boolean = true): void {
        let _loc14_: number = 0;
        let _loc3_: any[] = null;
        let _loc4_: any = null;
        let _loc5_: number = 0;
        let _loc12_: boolean = false;
        let _loc13_: boolean = false;
        if (!this._view || !this._view.grid) {
            return;
        }
        let _loc8_: any[] = this._controller.unseenItemTracker.getIds(1);
        let _loc9_: any[] = this._controller.unseenItemTracker.getIds(2);
        let _loc15_: Set = new Set();
        for (_loc14_ of _loc8_ ?? []) {
            _loc15_.add(_loc14_);
        }
        for (_loc14_ of _loc9_ ?? []) {
            _loc15_.add(_loc14_);
        }
        if (_loc15_.length == 0) {
            return;
        }
        let _loc11_: any[] = [];
        let _loc6_: any[] = [];
        let _loc7_: any[] = [];
        let _loc10_: GroupItem[] = param1 == null ? this._furniData : param1;
        for (_loc4_ of _loc10_ ?? []) {
            _loc6_.length = 0;
            _loc7_.length = 0;
            _loc3_ = _loc4_.getFurniIds();
            _loc12_ = false;
            _loc13_ = false;
            for (_loc5_ of _loc3_ ?? []) {
                if (_loc15_.contains(_loc5_)) {
                    _loc12_ = true;
                    if (!this._controller.unseenItemTracker.isUnseenItemMovedToTop(1, _loc5_)) {
                        _loc13_ = true;
                        _loc6_.push(_loc5_);
                    }
                    if (!this._controller.unseenItemTracker.isUnseenItemMovedToTop(2, _loc5_)) {
                        _loc13_ = true;
                        _loc7_.push(_loc5_);
                    }
                    break;
                }
            }
            if (!(!_loc12_ || _loc4_.hasUnseenItems && !_loc13_)) {
                _loc4_.hasUnseenItems = true;
                _loc11_.push(_loc4_);
                if (_loc13_) {
                    this.moveItemToTop(_loc4_);
                    this._controller.unseenItemTracker.setUnseenItemMovedToTop(1, _loc6_);
                    this._controller.unseenItemTracker.setUnseenItemMovedToTop(2, _loc7_);
                }
            }
        }
        if (_loc11_.length > 0 && param2) {
            this._view.grid.itemsWereUpdated(_loc11_);
        }
    }

    public extendRentPeriod(): void {
        let _loc2_: GroupItem = this.getSelectedItem();
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: FurnitureItem = _loc2_.peek();
        if (_loc1_ == null) {
            return;
        }
        let _loc3_: IFurnitureData = this._controller.getFurnitureData(_loc1_.type, _loc1_.isWallItem ? "i" : "s");
        this._catalog.openRentConfirmationWindow(_loc3_, false, -1, _loc1_.id);
    }

    public buyRentedItem(): void {
        let _loc2_: GroupItem = this.getSelectedItem();
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: FurnitureItem = _loc2_.peek();
        if (_loc1_ == null) {
            return;
        }
        let _loc3_: IFurnitureData = this._controller.getFurnitureData(_loc1_.type, _loc1_.isWallItem ? "i" : "s");
        this._catalog.openRentConfirmationWindow(_loc3_, true, -1, _loc1_.id);
    }

    public roomEntered(): void {
        let _loc1_: number = 0;
        this._isInRoom = true;
        if (this._roomItemToSelect == null) {
            return;
        }
        if (this._roomEngine != null) {
            _loc1_ = this._roomItemToSelect.isWallItem ? 20 : 10;
            this._roomEngine.selectRoomObject(this._roomItemToSelect.flatId, Math.abs(this._roomItemToSelect.id) | 0, _loc1_);
        }
        this._roomItemToSelect = null;
    }

    public roomLeft(): void {
        this._isInRoom = false;
    }

    public selectItemById(param1: string): void {
        let _loc2_: GroupItem = this.getItemById(-(Number(param1) | 0));
        if (_loc2_ != null) {
            this.categorySelection = _loc2_;
        }
    }

    private addItemToTop(param1: GroupItem): void {
        this._furniData.unshift(param1);
    }

    private addItemToBottom(param1: GroupItem): void {
        this._furniData.push(param1);
    }

    private removeItem(param1: GroupItem): void {
        let _loc2_: number = this._furniData.indexOf(param1);
        if (_loc2_ > -1) {
            this._furniData.splice(_loc2_, 1);
        }
    }

    private moveItemToTop(param1: GroupItem): void {
        this.removeItem(param1);
        this.addItemToTop(param1);
    }

    private getAllStripIds(): Map<any, any> {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: Map<any, any> = new Dictionary();
        for (const _loc2_ of this._furniData ?? []) {
            _loc4_ = _loc2_.getTotalCount();
            if (_loc2_.category == 5) {
                _loc4_ = 1;
            }
            _loc3_ = 0;
            while (_loc3_ < _loc4_) {
                _loc1_.set(_loc2_.getAt(_loc3_).id, true);
                _loc3_++;
            }
        }
        return _loc1_;
    }

    private initListImages(): void {
        let _loc1_: any = null;
        if (!this._SafeStr_3259.running) {
            this._SafeStr_3259.start();
        }
        if (this._view && this._view.currentPageItems) {
            for (_loc1_ of this._view.currentPageItems ?? []) {
                if (!_loc1_.isImageInited) {
                    if (_loc1_.initImage(false)) {
                        break;
                    }
                }
            }
        }
    }

    private getItemById(param1: number): GroupItem {
        for (const _loc2_ of this._furniData ?? []) {
            if (_loc2_.getItem(param1) != null) {
                return _loc2_;
            }
        }
        return null;
    }

    private isUnseen(param1: FurnitureItem): boolean {
        let _loc2_: number = 0;
        if (param1.isRented) {
            _loc2_ = 2;
        } else {
            _loc2_ = 1;
        }
        return this._controller.unseenItemTracker.isUnseen(_loc2_, param1.id);
    }

    private addOrUpdateNonGroupableItem(param1: FurnitureItem, param2: boolean): GroupItem {
        let _loc3_: GroupItem = null;
        let _loc4_: GroupItem[] = new Array<GroupItem>(0).fill(null);
        for (_loc3_ of this._furniData ?? []) {
            if (_loc3_.type == param1.type) {
                _loc4_.push(_loc3_);
            }
        }
        for (_loc3_ of _loc4_ ?? []) {
            if (_loc3_.getItem(param1.id) != null) {
                return _loc3_;
            }
        }
        let _loc5_: boolean = this.isUnseen(param1);
        _loc3_ = this.createGroupItem(param1.type, param1.category, param1.stuffData, param1.extra, param2);
        _loc3_.push(param1, _loc5_);
        if (_loc5_) {
            _loc3_.hasUnseenItems = true;
            this.addItemToTop(_loc3_);
        } else {
            this.addItemToBottom(_loc3_);
        }
        if (this._view && this._view.grid) {
            this._view.grid.itemWasUpdated(_loc3_);
        }
        return _loc3_;
    }

    private addOrUpdateGroupableItem(param1: FurnitureItem, param2: boolean): GroupItem {
        let _loc4_: any;
        let _loc5_: any = null;
        let _loc3_: number = 0;
        let _loc6_: boolean = this.isUnseen(param1);
        for (_loc4_ of this._furniData ?? []) {
            if (_loc4_.type == param1.type && _loc4_.isWallItem == param1.isWallItem) {
                _loc3_ = param1.category;
                if (_loc3_ == 19) {
                    if (_loc4_.stuffData.rarityLevel == param1.stuffData.rarityLevel) {
                        _loc5_ = _loc4_;
                        break;
                    }
                } else if (_loc3_ == 25 || _loc3_ == 24) {
                    if (_loc4_.stuffData.contentsCount == 0 && param1.stuffData.contentsCount == 0 && _loc4_.stuffData.chestName == "" && param1.stuffData.chestName == "") {
                        _loc5_ = _loc4_;
                    }
                } else if (_loc4_.isGroupable) {
                    if (_loc3_ == 6) {
                        if (_loc4_.stuffData.getLegacyString() == param1.stuffData.getLegacyString()) {
                            _loc5_ = _loc4_;
                            break;
                        }
                    } else {
                        if (_loc3_ != 17) {
                            _loc5_ = _loc4_;
                            break;
                        }
                        if (param1.stuffData.compare(_loc4_.stuffData)) {
                            _loc5_ = _loc4_;
                            break;
                        }
                    }
                }
            }
        }
        if (_loc5_) {
            _loc5_.push(param1, _loc6_);
            if (_loc6_) {
                _loc5_.hasUnseenItems = true;
                this.moveItemToTop(_loc5_);
            }
            if (this._view && this._view.grid) {
                this._view.grid.itemWasUpdated(_loc5_);
            }
            return _loc5_;
        }
        _loc4_ = this.createGroupItem(param1.type, param1.category, param1.stuffData, param1.extra, param2);
        _loc4_.push(param1, _loc6_);
        if (_loc6_) {
            _loc4_.hasUnseenItems = true;
            this.addItemToTop(_loc4_);
        } else {
            this.addItemToBottom(_loc4_);
        }
        if (this._view && this._view.grid) {
            this._view.grid.itemWasUpdated(_loc4_);
        }
        return _loc4_;
    }

    private requestSelectedFurniToMover(param1: FurnitureItem): void {
        let _loc3_: number = 0;
        let _loc2_: boolean = false;
        if (param1.isWallItem) {
            _loc3_ = 20;
        } else {
            _loc3_ = 10;
        }
        if (param1.category == 6 || this.isExternalImageItem(param1)) {
            _loc2_ = this._roomEngine.initializeRoomObjectInsert("inventory", param1.id, _loc3_, param1.type, param1.stuffData.getLegacyString(), null, -1, -1, null, true);
        } else {
            _loc2_ = this._roomEngine.initializeRoomObjectInsert("inventory", param1.id, _loc3_, param1.type, param1.extra.toString(), param1.stuffData, param1.stuffData.state, -1, null, true);
        }
        if (_loc2_) {
            this._SafeStr_3970 = param1.ref;
            if (!this._controller.recyclerModel.running) {
                this.requestClose();
            }
            this._SafeStr_2680 = true;
        }
    }

    private attemptPlaceNextFurni(): void {
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: FurnitureItem = null;
        let _loc1_: any = false;
        let _loc3_: GroupItem = this.getSelectedItem();
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: any = -1;
        if (_loc3_.category == 5) {
            if (_loc3_.getTotalCount() > 1) {
                _loc4_ = 0;
            }
        } else {
            _loc6_ = _loc3_.selectedItemIndex;
            _loc5_ = _loc6_ - 1;
            while (_loc5_ >= 0) {
                _loc2_ = _loc3_.getAt(_loc5_);
                if (_loc2_ && !_loc2_.locked) {
                    _loc4_ = _loc5_;
                    break;
                }
                _loc5_ -= 1;
            }
        }
        if (_loc4_ != -1) {
            _loc3_.selectedItemIndex = _loc4_ | 0;
            _loc1_ = !this.requestSelectedFurniPlacement(false);
        } else {
            _loc1_ = true;
        }
        if (_loc1_) {
            _loc3_.selectedItemIndex = -1;
            this.cancelFurniInMover();
            this._controller.showView();
        }
    }

    private isExternalImageItem(param1: FurnitureItem): boolean {
        let _loc2_: IFurnitureData = this._catalog.getFurnitureData(param1.type, "i");
        return !!(_loc2_ && _loc2_.isExternalImageType);
    }

    private updateCategorySelection(): void {
        let _loc2_: number = 0;
        this.removeSelections();
        let _loc1_: GroupItem = this._SafeStr_4504.get(this._category);
        if (_loc1_ != null) {
            _loc2_ = this._furniData.indexOf(_loc1_);
            if (_loc2_ > -1) {
                _loc1_.isSelected = true;
                _loc1_.selectedItemIndex = -1;
            }
        } else {
            this.selectFirstItem();
        }
        this._view.updateActionView();
    }

    public onObjectPlaced = (param1: Event): void => {
        let _loc2_: RoomEngineObjectPlacedEvent = param1 instanceof RoomEngineObjectPlacedEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (this._SafeStr_2680 && param1.type == "REOE_PLACED") {
            this._SafeStr_2680 = false;
            if (!_loc2_.placedInRoom) {
                this._controller.showView();
                this.cancelFurniInMover();
            } else if (this._category == "rentables") {
                this._controller.showView();
            } else if (_loc2_.placedInRoom && (_loc2_.placedOnFloor && -_loc2_.objectId == this._SafeStr_3970) || _loc2_.placedOnWall && _loc2_.objectId == this._SafeStr_3970) {
                this.attemptPlaceNextFurni();
            }
        }
    };

    private onImageUpdateTimerEvent = (param1: TimerEvent): void => {
        let _loc5_: any = undefined;
        let _loc3_: FurnitureItem = null;
        this.initListImages();
        this._imageUpdateCumulativeTime += 50;
        if (this._imageUpdateCumulativeTime >= 200) {
            _loc5_ = new Array<number>(0).fill(0);
            for (const _loc2_ of this._furniData ?? []) {
                _loc3_ = _loc2_.getAt(0);
                if (_loc3_ && _loc3_.isRented && _loc3_.hasRentPeriodStarted && _loc3_.secondsToExpiration <= 0) {
                    _loc5_.push(_loc3_.id);
                }
            }
            for (const _loc4_ of valuesOf(_loc5_)) {
                this.removeFurni(_loc4_ | 0);
            }
            if (_loc5_.length > 0) {
                this._view.updateGridFilters();
            }
            this._view.updateRentedItem();
            this._imageUpdateCumulativeTime = 0;
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FurniModel.#staticsReady) return;
        FurniModel.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FurniModel, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.inventory.furni.FurniModel"));
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
