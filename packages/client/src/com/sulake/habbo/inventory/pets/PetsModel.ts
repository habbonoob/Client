import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { GetPetInventoryComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/pets/GetPetInventoryComposer';
import { PlacePetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/PlacePetMessageComposer';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { PetsView } from '@/com/sulake/habbo/inventory/pets/PetsView';

export class PetsModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.pets::PetsModel'); }

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary, param5: IRoomEngine, param6: IHabboCatalog) {
        this._controller = param1;
        this._assets = param4;
        this._communication = param3;
        this._roomEngine = param5;
        this._roomEngine.events.addEventListener("REOE_PLACED", this.onObjectPlaced);
        this._catalog = param6;
        this._pets = new UtilsMap();
        this._view = new PetsView(this, param2, param4, param5);
    }

    declare private _controller: HabboInventory;

    declare private _view: PetsView;

    declare private _assets: IAssetLibrary;

    declare private _communication: IHabboCommunicationManager;

    declare private _roomEngine: IRoomEngine;

    declare private _catalog: IHabboCatalog;

    declare private _pets: UtilsMap;

    private _SafeStr_4416: boolean = false;

    declare private _SafeStr_6910: boolean;
    static { (this.prototype as any)._SafeStr_6910 = false; }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get controller(): HabboInventory {
        return this._controller;
    }

    public get pets(): UtilsMap {
        return this._pets;
    }

    public get roomSession(): IRoomSession {
        return this._controller.roomSession;
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
            if (this._pets) {
                this._pets.dispose();
                this._pets = null;
            }
            this._controller = null;
            this._catalog = null;
            this._assets = null;
            this._communication = null;
            this._disposed = true;
        }
    }

    public isListInitialized(): boolean {
        return this._SafeStr_6910;
    }

    public setListInitialized(): void {
        this._SafeStr_6910 = true;
        this._view.updateState();
    }

    public requestPetInventory(): void {
        if (this._communication == null) {
            return;
        }
        let _loc1_: IConnection = this._communication.connection;
        if (_loc1_ == null) {
            return;
        }
        _loc1_.send(new GetPetInventoryComposer());
    }

    public addPet(param1: PetData): void {
        if (this._pets.add(param1.id, param1)) {
            this._view.addPet(param1);
        }
        this._view.updateState();
    }

    public updatePets(param1: UtilsMap): void {
        let _loc3_: number = 0;
        let _loc2_: any[] = param1.getKeys();
        let _loc4_: any[] = this._pets.getKeys();
        this._controller.setInventoryCategoryInit("pets");
        for (_loc3_ of _loc4_ ?? []) {
            if (_loc2_.indexOf(_loc3_) == -1) {
                this._pets.remove(_loc3_);
                this._view.removePet(_loc3_);
            }
        }
        for (_loc3_ of _loc2_ ?? []) {
            if (_loc4_.indexOf(_loc3_) == -1) {
                this._pets.add(_loc3_, param1.getValue(_loc3_));
                this._view.addPet(param1.getValue(_loc3_));
            }
        }
        this.setListInitialized();
    }

    public removePet(param1: number): void {
        this._pets.remove(param1);
        this._view.removePet(param1);
        this._view.updateState();
    }

    public requestInitialization(): void {
        this.requestPetInventory();
    }

    public categorySwitch(param1: string): void {
        if (param1 == "pets" && this._controller.isVisible) {
            this._controller.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_PETS"));
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

    public placePetToRoom(param1: number, param2: boolean = false): boolean {
        let _loc4_: number = 0;
        let _loc5_: PetData = this.getPetById(param1);
        if (_loc5_ == null) {
            return false;
        }
        let _loc3_: string = null;
        if (_loc5_.typeId == 16) {
            if (_loc5_.level >= 7) {
                _loc3_ = "std";
            } else {
                _loc3_ = "grw" + _loc5_.level;
            }
        }
        if (this._controller.roomSession.isRoomOwner) {
            _loc4_ = _loc5_.id * -1;
            this._SafeStr_4416 = this._roomEngine.initializeRoomObjectInsert("inventory", _loc4_, 100, 2, _loc5_.figureString, null, -1, -1, _loc3_);
            this._controller.closeView();
            return this._SafeStr_4416;
        }
        if (!this._controller.roomSession.arePetsAllowed) {
            return false;
        }
        if (!param2) {
            this._communication.connection.send(new PlacePetMessageComposer(_loc5_.id, 0, 0));
        }
        return true;
    }

    public updateView(): void {
        if (this._view == null) {
            return;
        }
        this._view.update();
    }

    public updatePetsAllowed(): void {
        this._view.update();
    }

    public resetUnseenItems(): void {
        this._controller.unseenItemTracker.resetCategory(3);
        this._controller.updateUnseenItemCounts();
        this._view.update();
    }

    public isUnseen(param1: number): boolean {
        return this._controller.unseenItemTracker.isUnseen(3, param1);
    }

    public removeUnseenFurniCounter(param1: number): boolean {
        let _loc2_: boolean = false;
        if (this.isUnseen(param1)) {
            _loc2_ = this._controller.unseenItemTracker.removeUnseen(3, param1);
            if (_loc2_) {
                this._controller.unseenItemTracker.resetCategoryIfEmpty(3);
            }
        }
        return _loc2_;
    }

    public selectItemById(param1: string): void {
        this._view.selectById(Number(param1) | 0);
    }

    private getPetById(param1: number): PetData {
        for (const _loc2_ of valuesOf(this._pets)) {
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

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
