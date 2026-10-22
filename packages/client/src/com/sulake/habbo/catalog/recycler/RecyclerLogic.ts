import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IRecycler } from '@/com/sulake/habbo/catalog/recycler/IRecycler';
import type { IRecyclerVisualization } from '@/com/sulake/habbo/catalog/recycler/IRecyclerVisualization';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { FurniSlotItem } from '@/com/sulake/habbo/catalog/recycler/FurniSlotItem';
import { PrizeLevelContainer } from '@/com/sulake/habbo/catalog/recycler/PrizeLevelContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RecyclerLogic implements IRecycler {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::RecyclerLogic'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RecyclerLogic.#initStatics();
        return RecyclerLogic._log;
    }

    private static readonly STATUS_OFF: number = 0;
    private static readonly STATUS_READY: number = 1;
    private static readonly STATUS_WAITING_FOR_SERVER: number = 2;

    constructor(param1: HabboCatalog, param2: IHabboWindowManager) {
        this._catalog = param1;
        this._windowManager = param2;
        this._numberOfSlots = param1.getInteger("recycler.number_of_slots", 5);
    }

    private _localStatus: number = 0;

    declare private _systemStatus: number;
    static { (this.prototype as any)._systemStatus = 0; }

    declare private _SafeStr_5803: number;
    static { (this.prototype as any)._SafeStr_5803 = 0; }

    private _SafeStr_2255: any[] = [];

    declare private _catalog: HabboCatalog;

    declare private _windowManager: IHabboWindowManager;

    declare private _view: IRecyclerVisualization;

    declare private _prizes: any[];

    declare private _SafeStr_3639: (...args: any[]) => any;

    declare private _numberOfSlots: number;
    static { (this.prototype as any)._numberOfSlots = 0; }

    public get active(): boolean {
        return this.statusActive && this.systemActive;
    }

    public get numberOfSlots(): number {
        return this._numberOfSlots;
    }

    public get ducketCost(): number {
        return this._catalog.getInteger("recycler.ducket_cost", 0);
    }

    public get timeout(): number {
        return this._catalog.getInteger("recycler.timeout_seconds", 10);
    }

    public get recyclerDisabled(): boolean {
        return !this.systemActive;
    }

    private get statusActive(): boolean {
        return this._localStatus != 0;
    }

    private get systemActive(): boolean {
        return this._systemStatus != 2;
    }

    private get ready(): boolean {
        return this.active && this._localStatus == 1;
    }

    public dispose(): void {
        this._SafeStr_2255 = null;
        this._catalog = null;
        this._windowManager = null;
        this._SafeStr_3639 = null;
    }

    public init(param1: IRecyclerVisualization = null): void {
        this._localStatus = 2;
        this._SafeStr_2255 = new Array(this._numberOfSlots);
        if (param1 == null) {
            return;
        }
        this._view = param1;
        this._catalog.getRecyclerStatus();
    }

    public activate(): void {
        if (this.systemActive) {
            this._localStatus = 1;
        }
    }

    public cancel(): void {
        this._catalog.setupInventoryForRecycler(false);
        this.releaseAllSlots();
        this._localStatus = 0;
    }

    public releaseAllSlots(): void {
        let _loc1_: number = 0;
        if (!this.ready) {
            return;
        }
        _loc1_ = 0;
        while (_loc1_ < this._numberOfSlots) {
            if (this._SafeStr_2255[_loc1_] != null) {
                this._catalog.returnInventoryFurniFromRecycler(this._SafeStr_2255[_loc1_].id | 0);
                this._SafeStr_2255[_loc1_] = null;
            }
            _loc1_ += 1;
        }
        this.updateRecyclerSlots();
        this.updateRecyclerButton();
    }

    public empty(): void {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._numberOfSlots) {
            this.releaseSlot(_loc1_);
            _loc1_++;
        }
        this.updateRecyclerSlots();
        this.updateRecyclerButton();
    }

    public secondsToWait(): number {
        if (this._systemStatus == 3) {
            return Math.max(0, Math.ceil((this._SafeStr_5803 - getTimer()) / 1000) | 0) | 0;
        }
        return 0;
    }

    public setNextRecycleAllowedTimestamp(param1: number): void {
        this._SafeStr_5803 = param1;
        if (this._SafeStr_5803 > getTimer()) {
            this._systemStatus = 3;
        }
    }

    public setSystemStatus(param1: number, param2: number): void {
        this._systemStatus = param1;
        this.setNextRecycleAllowedTimestamp(getTimer() + param2 * 1000);
        if (!this.systemActive) {
            if (this._view == null || this._view.disposed) {
                return;
            }
            this._view.updateUI();
            return;
        }
        this._localStatus = 1;
        if (this._view == null || this._view.disposed) {
            return;
        }
        this._view.updateUI();
        this._catalog.setupInventoryForRecycler(this._systemStatus != 2);
        this.verifyRoomSessionStatus();
        this.updateRecyclerSlots();
        this.updateRecyclerButton();
    }

    public setFinished(param1: number, param2: number): void {
        let status: number = param1;
        let prizeId: number = param2;
        if (!this.statusActive) {
            return;
        }
        this._localStatus = 1;
        if (!this.systemActive) {
            return;
        }
        switch (status - 1) {
            case 0:
                if (this._view != null) {
                    this._view.updateUI();
                }
                break;
            case 1:
                RecyclerLogic._log.error("* Recycler finished with FAILURE");
                this._windowManager.alert("${generic.alert.title}", "${recycler.info.closed}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                        param1.dispose();
                    });
                if (this._view != null) {
                    this._view.updateUI();
                }
        }
        this.releaseAllSlots();
    }

    public getSlotContent(param1: number): FurniSlotItem {
        if (this._SafeStr_2255 == null) {
            return null;
        }
        if (param1 >= this._SafeStr_2255.length) {
            return null;
        }
        return this._SafeStr_2255[param1];
    }

    public placeObjectAtSlot(param1: number, param2: number, param3: number, param4: number, param5: string, param6: boolean = false): void {
        let oldObjectData: FurniSlotItem;
        let newSlotId: number = 0;
        let itemId: number = 0;
        let slotId: number = param1;
        let id: number = param2;
        let category: number = param3;
        let typeId: number = param4;
        let xxxExtra: string = param5;
        let findNewSlotId: boolean = param6;
        if (!this.ready) {
            return;
        }
        if (!findNewSlotId) {
            oldObjectData = this._SafeStr_2255[slotId];
            if (oldObjectData != null) {
                this.releaseSlot(slotId);
            }
        } else if (this._SafeStr_2255.length > 0) {
            oldObjectData = this._SafeStr_2255[0];
            newSlotId = 0;
            while (oldObjectData != null && newSlotId < this._numberOfSlots) {
                oldObjectData = this._SafeStr_2255[newSlotId];
                if (oldObjectData != null) {
                    newSlotId = newSlotId + 1;
                }
            }
            if (oldObjectData != null) {
                return;
            }
            slotId = newSlotId;
        }
        itemId = this._catalog.requestInventoryFurniToRecycler();
        if (itemId == 0) {
            this._windowManager.alert("${generic.alert.title}", "${recycler.alert.non.recyclable}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                    param1.dispose();
                });
            return;
        }
        this._SafeStr_2255[slotId] = new FurniSlotItem(itemId, category, typeId, xxxExtra);
        this.updateRecyclerSlots();
        this.updateRecyclerButton();
    }

    public releaseSlot(param1: number): void {
        if (!this.ready) {
            return;
        }
        if (this._SafeStr_2255[param1] == null) {
            return;
        }
        if (!this._catalog.returnInventoryFurniFromRecycler(this._SafeStr_2255[param1].id | 0)) {
            return;
        }
        this._SafeStr_2255[param1] = null;
        this.updateRecyclerSlots();
        this.updateRecyclerButton();
    }

    public executeRecycler(): void {
        let _loc1_: number = 0;
        let _loc2_: FurniSlotItem = null;
        if (!this.isReadyToRecycle()) {
            return;
        }
        this._localStatus = 2;
        this.updateRecyclerButton();
        let _loc3_: any[] = [];
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2255.length) {
            _loc2_ = this._SafeStr_2255[_loc1_];
            if (_loc2_ == null) {
                return;
            }
            _loc3_.push(_loc2_.id);
            _loc1_++;
        }
        this._catalog.sendRecycleItems(_loc3_);
        this._view.updateUI();
    }

    public isReadyToRecycle(): boolean {
        if (!this.ready || !this._catalog.privateRoomSessionActive) {
            return false;
        }
        if (this.isTradingActive()) {
            this._windowManager.alert("${generic.alert.title}", "${recycler.alert.trading}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                    param1.dispose();
                });
            return false;
        }
        return this.isPoolFull();
    }

    public hasEnoughDuckets(): boolean {
        return this._catalog.getPurse().getActivityPointsForType(0) >= this.ducketCost;
    }

    public setRoomSessionActive(param1: boolean): void {
        if (param1 == false) {
            this.empty();
            this.verifyRoomSessionStatus();
        }
        this.updateRecyclerButton();
    }

    public storePrizeTable(param1: any[]): void {
        let _loc3_: number = 0;
        let _loc2_: PrizeLevelContainer = null;
        this._prizes = [];
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_ = new PrizeLevelContainer(param1[_loc3_], this._catalog);
            this._prizes.push(_loc2_);
            _loc3_++;
        }
        if (this._SafeStr_3639 != null) {
            this._SafeStr_3639(this._prizes);
            this._SafeStr_3639 = null;
        }
    }

    public getPrizeTable(param1: (...args: any[]) => any): any[] {
        if (this._prizes == null) {
            this._SafeStr_3639 = param1;
            this._catalog.getRecyclerPrizes();
            return null;
        }
        return this._prizes;
    }

    private verifyRoomSessionStatus(): void {
        if (!this._catalog.privateRoomSessionActive && this.ready) {
            this._windowManager.alert("${generic.alert.title}", "${recycler.alert.privateroom}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                    param1.dispose();
                });
        }
    }

    private updateRecyclerSlots(): void {
        if (this._view == null || !this.statusActive) {
            return;
        }
        this._view.updateSlots();
    }

    private updateRecyclerButton(): void {
        if (this._view == null || !this.statusActive) {
            return;
        }
        this._view.updateRecycleButton();
    }

    private isPoolFull(): boolean {
        let _loc1_: number = 0;
        if (this._SafeStr_2255 == null) {
            return false;
        }
        if (this._SafeStr_2255.length < this._numberOfSlots) {
            return false;
        }
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2255.length) {
            if (this._SafeStr_2255[_loc1_] == null) {
                return false;
            }
            _loc1_++;
        }
        return true;
    }

    private isTradingActive(): boolean {
        return this._catalog.tradingActive;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RecyclerLogic.#staticsReady) return;
        RecyclerLogic.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RecyclerLogic, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.recycler.RecyclerLogic"));
    }
}
