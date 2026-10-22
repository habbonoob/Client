import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';
import type { CollectibleGroupedItem } from '@/com/sulake/habbo/inventory/collectibles/CollectibleGroupedItem';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { TradingModel } from '@/com/sulake/habbo/inventory/trading/TradingModel';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { GetNftTradeInventoryComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/trading/collectibles/GetNftTradeInventoryComposer';
import { CollectiblesView } from '@/com/sulake/habbo/inventory/collectibles/CollectiblesView';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';

export class CollectiblesModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.collectibles::CollectiblesModel'); }

    declare private _controller: HabboInventory;

    declare private _view: CollectiblesView;

    declare private _assets: IAssetLibrary;

    declare private _communication: IHabboCommunicationManager;

    declare private _roomEngine: IRoomEngine;

    declare private _catalog: IHabboCatalog;

    private _disposed: boolean = false;

    declare private _isLoaded: boolean;
    static { (this.prototype as any)._isLoaded = false; }

    declare private _items: UtilsMap;

    private _requestedInventoryThisTrade: boolean = false;
    private _selected: CollectibleGroupedItem = null;

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboCatalog, param7: IAvatarRenderManager) {
        this._controller = param1;
        this._assets = param4;
        this._communication = param3;
        this._roomEngine = param5;
        this._catalog = param6;
        this._items = new UtilsMap();
        this._view = new CollectiblesView(this, param2, param4);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._view) {
                this._view.dispose();
                this._view = null;
            }
            if (this._items) {
                this._items.dispose();
                this._items = null;
            }
            this._controller = null;
            this._catalog = null;
            this._assets = null;
            this._communication = null;
            this._disposed = true;
        }
    }

    public get controller(): HabboInventory {
        return this._controller;
    }

    public isListInitialized(): boolean {
        return this._isLoaded;
    }

    public setListInitialized(): void {
        this._isLoaded = true;
        this._view.updateState();
    }

    public onTradeComplete(): void {
        this._isLoaded = false;
        this.controller.setInventoryCategoryInit("collectibles", false);
        this._view.updateState();
    }

    public get items(): UtilsMap {
        return this._items;
    }

    public initCollectibles(param1: UtilsMap): void {
        let _loc6_: number = 0;
        let _loc2_: TradeNftItem = null;
        let _loc3_: any[] = param1.getKeys();
        let _loc7_: any[] = this._items.getKeys();
        let _loc4_: TradeNftItem[] = [];
        let _loc5_: TradeNftItem[] = [];
        for (_loc6_ of _loc7_ ?? []) {
            if (_loc3_.indexOf(_loc6_) == -1) {
                _loc2_ = this._items.remove(_loc6_);
                if (_loc2_ != null) {
                    _loc4_.push(_loc2_);
                }
            }
        }
        for (_loc6_ of _loc3_ ?? []) {
            if (_loc7_.indexOf(_loc6_) == -1) {
                _loc2_ = param1.getValue(_loc6_);
                this._items.add(_loc6_, _loc2_);
                _loc5_.push(_loc2_);
            }
        }
        this._view.initCollectibles(_loc5_, _loc4_);
        if (!this.controller.checkCategoryInitilization("collectibles")) {
            this.controller.setInventoryCategoryInit("collectibles");
            this.setListInitialized();
        }
    }

    public requestAddTrading(param1: CollectibleGroupedItem, param2: number): void {
        if (param1 == null) {
            return;
        }
        if (param2 < 1 || param2 > param1.unlockedAssetCount) {
            return;
        }
        let _loc3_: number[] = param1.pop(param2);
        if (_loc3_.length < 1) {
            return;
        }
        this.controller.tradingModel.requestAddNftsToTrading(_loc3_);
    }

    public updateItemLocks(): void {
        let _loc2_: any;
        let _loc5_: CollectibleGroupedItem = null;
        this._view.unlockAll();
        let _loc3_: TradingModel = this.controller.tradingModel;
        if (_loc3_ == null || !_loc3_.running) {
            return;
        }
        let _loc4_: UtilsMap = _loc3_.ownUserNftItems;
        for (const _loc1_ of _loc4_.getValues() ?? []) {
            _loc5_ = this._view.findGroupedItem(_loc1_.item, false);
            if (_loc5_ != null) {
                for (_loc2_ of valuesOf(_loc1_.assetIds)) {
                    _loc5_.lockAsset(Number(_loc2_));
                }
            }
        }
        this._view.updatePreview();
    }

    public setSelected(param1: CollectibleGroupedItem): void {
        if (param1 == this._selected) {
            return;
        }
        if (this._selected != null) {
            this._selected.isSelected = false;
            this._selected = null;
        }
        if (param1 != null) {
            param1.isSelected = true;
            this._selected = param1;
        }
        this._view.updatePreview();
    }

    public get selected(): CollectibleGroupedItem {
        return this._selected;
    }

    public requestInitialization(): void {
    }

    public categorySwitch(param1: string): void {
        if (param1 == "collectibles" && this._controller.isVisible) {
            this._controller.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_COLLECTIBLES"));
            this.requestNftAssets();
            this._view.updateContainerVisibility();
        }
    }

    public getWindowContainer(): IWindowContainer {
        return this._view.getWindowContainer();
    }

    public closingInventoryView(): void {
        if (this._view.isVisible) {
            this.resetUnseenItems();
        }
    }

    public subCategorySwitch(param1: string): void {
        switch (param1) {
            case "trading":
                this._requestedInventoryThisTrade = false;
                if (this._view.isVisible) {
                    this.requestNftAssets();
                }
                break;
            case "empty":
                this._view.unlockAll();
        }
    }

    public requestNftAssets(): void {
        if (!this._requestedInventoryThisTrade) {
            this._requestedInventoryThisTrade = true;
            this._communication.connection.send(new GetNftTradeInventoryComposer());
        }
    }

    public updateView(): void {
        if (this._view == null) {
            return;
        }
    }

    private getItemById(param1: number): TradeNftItem {
        return this._items[param1];
    }

    public getGroupedItemById(param1: number): CollectibleGroupedItem {
        let _loc2_: TradeNftItem = this.getItemById(param1);
        if (_loc2_ == null) {
            return null;
        }
        return this._view.findGroupedItem(_loc2_);
    }

    public resetUnseenItems(): void {
        this._controller.unseenItemTracker.resetCategory(7);
        this._controller.updateUnseenItemCounts();
    }

    public isUnseen(param1: number): boolean {
        return this._controller.unseenItemTracker.isUnseen(5, param1);
    }

    public selectItemById(param1: string): void {
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
