import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { Logger } from '@/com/sulake/habbo/Logger';

export class RecyclerModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.recycler::RecyclerModel'); }

    public static readonly STATE_READY: number = 0;
    public static readonly STATE_ACTIVE: number = 1;

    declare private _inventory: HabboInventory;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _roomEngine: IRoomEngine;

    declare private _communication: IHabboCommunicationManager;

    declare private _localization: IHabboLocalizationManager;

    private _disposed: boolean = false;
    private _running: boolean = false;
    private _state: number = 0;

    declare private _itemList: UtilsMap;

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboLocalizationManager) {
        this._inventory = param1;
        this._communication = param3;
        this._SafeStr_3052 = param4;
        this._roomEngine = param5;
        this._localization = param6;
    }

    public get running(): boolean {
        return this._state == 1;
    }

    public get state(): number {
        return this._state;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set state(param1: number) {
        this._state = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._inventory = null;
            this._communication = null;
            this._SafeStr_3052 = null;
            this._roomEngine = null;
            this._localization = null;
            this._disposed = true;
        }
        this.stopRecycler();
    }

    public startRecycler(): void {
        if (this._inventory == null || this._inventory.furniModel == null) {
            return;
        }
        this._state = 1;
        this._itemList = new UtilsMap();
        this._inventory.furniModel.showRecyclable(true);
    }

    public stopRecycler(): void {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        if (this._itemList == null || this._inventory == null || this._inventory.furniModel == null) {
            return;
        }
        this._state = 0;
        this._inventory.furniModel.showRecyclable(false);
        _loc2_ = 0;
        while (_loc2_ < this._itemList.length) {
            _loc1_ = this._itemList.getKey(_loc2_) | 0;
            this._inventory.furniModel.removeLockFrom(_loc1_);
            _loc2_++;
        }
        this._itemList = null;
    }

    public lockSelectedFurni(): number {
        if (this._itemList == null || this._inventory == null || this._inventory.furniModel == null) {
            return 0;
        }
        let _loc1_: IFurnitureItem = this._inventory.furniModel.requestSelectedFurniToRecycler();
        if (_loc1_ == null) {
            return 0;
        }
        if (this._itemList.getValue(_loc1_.id) == null) {
            this._itemList.add(_loc1_.id, _loc1_);
        }
        return _loc1_.id;
    }

    public releaseFurni(param1: number): boolean {
        if (this._itemList == null) {
            return true;
        }
        let _loc2_: IFurnitureItem = this._itemList.getValue(param1);
        if (_loc2_ == null) {
            return false;
        }
        let _loc3_: FurniModel = this._inventory.furniModel;
        if (_loc3_ == null) {
            return false;
        }
        _loc3_.removeLockFrom(param1);
        this._itemList.remove(param1);
        return true;
    }

    public getOwnItemsInRecycler(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        if (this._itemList == null) {
            return [];
        }
        _loc2_ = 0;
        while (_loc2_ < this._itemList.length) {
            _loc1_.push(this._itemList.getKey(_loc2_));
            _loc2_++;
        }
        return _loc1_;
    }

    public closingInventoryView(): void {
    }

    public requestInitialization(): void {
    }

    public categorySwitch(param1: string): void {
    }

    public subCategorySwitch(param1: string): void {
    }

    public getWindowContainer(): IWindowContainer {
        return null;
    }

    public updateView(): void {
    }

    public selectItemById(param1: string): void {
        Logger.log("NOT SUPPORTED: MARKETPLACE SELECT BY ID");
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
