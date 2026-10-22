import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { BotData } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotData';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { GetBotInventoryComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/bots/GetBotInventoryComposer';
import { PlaceBotMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PlaceBotMessageComposer';
import { BotsView } from '@/com/sulake/habbo/inventory/bots/BotsView';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';

export class BotsModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.bots::BotsModel'); }

    declare private _controller: HabboInventory;

    declare private _view: BotsView;

    declare private _assets: IAssetLibrary;

    declare private _communication: IHabboCommunicationManager;

    declare private _roomEngine: IRoomEngine;

    declare private _catalog: IHabboCatalog;

    declare private _items: UtilsMap;

    private _SafeStr_4416: boolean = false;
    private _disposed: boolean = false;

    declare private _SafeStr_6910: boolean;
    static { (this.prototype as any)._SafeStr_6910 = false; }

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboCatalog, param7: IAvatarRenderManager) {
        this._controller = param1;
        this._assets = param4;
        this._communication = param3;
        this._roomEngine = param5;
        this._roomEngine.events.addEventListener("REOE_PLACED", this.onObjectPlaced);
        this._catalog = param6;
        this._items = new UtilsMap();
        this._view = new BotsView(this, param2, param4, param5, param7);
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
            if (this._roomEngine) {
                if (this._roomEngine.events) {
                    this._roomEngine.events.removeEventListener("REOE_PLACED", this.onObjectPlaced);
                }
                this._roomEngine = null;
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
        return this._SafeStr_6910;
    }

    public setListInitialized(): void {
        this._SafeStr_6910 = true;
        this._view.updateState();
    }

    public requestInventory(): void {
        if (this._communication == null) {
            return;
        }
        let _loc1_: IConnection = this._communication.connection;
        if (_loc1_ == null) {
            return;
        }
        _loc1_.send(new GetBotInventoryComposer());
    }

    public get items(): UtilsMap {
        return this._items;
    }

    public addItem(param1: BotData): void {
        if (this._items.add(param1.id, param1)) {
            this._view.addItem(param1);
        }
        this._view.updateState();
    }

    public updateItems(param1: UtilsMap): void {
        let _loc3_: number = 0;
        let _loc2_: any[] = param1.getKeys();
        let _loc4_: any[] = this._items.getKeys();
        for (_loc3_ of _loc4_ ?? []) {
            if (_loc2_.indexOf(_loc3_) == -1) {
                this._items.remove(_loc3_);
                this._view.removeItem(_loc3_);
            }
        }
        for (_loc3_ of _loc2_ ?? []) {
            if (_loc4_.indexOf(_loc3_) == -1) {
                this._items.add(_loc3_, param1.getValue(_loc3_));
                this._view.addItem(param1.getValue(_loc3_));
            }
        }
    }

    public removeItem(param1: number): void {
        this._items.remove(param1);
        this._view.removeItem(param1);
        this._view.updateState();
    }

    public requestInitialization(): void {
        this.requestInventory();
    }

    public categorySwitch(param1: string): void {
        if (param1 == "bots" && this._controller.isVisible) {
            this._controller.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_BOTS"));
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
    }

    public placeItemToRoom(param1: number, param2: boolean = false): boolean {
        let _loc4_: number = 0;
        let _loc3_: BotData = this.getItemById(param1);
        if (_loc3_ == null) {
            return false;
        }
        if (!this._controller.roomSession.areBotsAllowed) {
            return false;
        }
        if (this._controller.roomSession.isRoomOwner) {
            _loc4_ = _loc3_.id * -1;
            this._SafeStr_4416 = this._roomEngine.initializeRoomObjectInsert("inventory", _loc4_, 100, 4, _loc3_.figure);
            this._controller.closeView();
            return this._SafeStr_4416;
        }
        if (!param2) {
            this._communication.connection.send(new PlaceBotMessageComposer(_loc3_.id, 0, 0));
        }
        return true;
    }

    public updateView(): void {
        if (this._view == null) {
            return;
        }
        this._view.update();
    }

    private getItemById(param1: number): BotData {
        for (const _loc2_ of valuesOf(this._items)) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public onObjectPlaced = (param1: Event): void => {
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_4416 && param1.type == "REOE_PLACED") {
            this._controller.showView();
            this._SafeStr_4416 = false;
        }
    };

    public get roomSession(): IRoomSession {
        return this._controller.roomSession;
    }

    public resetUnseenItems(): void {
        this._controller.unseenItemTracker.resetCategory(5);
        this._controller.updateUnseenItemCounts();
        this._view.update();
    }

    public isUnseen(param1: number): boolean {
        return this._controller.unseenItemTracker.isUnseen(5, param1);
    }

    public selectItemById(param1: string): void {
        this._view.selectById(Number(param1) | 0);
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
