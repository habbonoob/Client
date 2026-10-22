import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { UnseenItemsParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/UnseenItemsParser';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IUnseenItemTracker } from '@/com/sulake/habbo/inventory/IUnseenItemTracker';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Set } from '@/com/sulake/core/utils/Set';
import { UnseenItemsEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/UnseenItemsEvent';
import { ResetUnseenItemIdsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/notifications/ResetUnseenItemIdsComposer';
import { ResetUnseenItemsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/notifications/ResetUnseenItemsComposer';
import { UnseenItemCategory } from '@/com/sulake/habbo/inventory/enum/UnseenItemCategory';
import { HabboUnseenItemsUpdatedEvent } from '@/com/sulake/habbo/inventory/events/HabboUnseenItemsUpdatedEvent';

export class UnseenItemTracker implements IUnseenItemTracker {
    static { registerClassName(this, 'com.sulake.habbo.inventory::UnseenItemTracker'); }

    constructor(param1: IHabboCommunicationManager, param2: IEventDispatcher, param3: HabboInventory) {
        this._communication = param1;
        this._inventory = param3;
        this._events = param2;
        this._unseenItems = new Dictionary();
        this._SafeStr_3518 = new Dictionary();
        this._communication.addHabboConnectionMessageEvent(new UnseenItemsEvent(this.onUnseenItems));
    }

    declare private _communication: IHabboCommunicationManager;

    declare private _inventory: HabboInventory;

    declare private _unseenItems: Map<any, any>;

    declare private _SafeStr_3518: Map<any, any>;

    declare private _events: IEventDispatcher;

    public dispose(): void {
        this._communication = null;
        this._unseenItems = null;
    }

    public resetCategory(param1: number): boolean {
        if (this.getCount(param1) == 0) {
            return false;
        }
        this._unseenItems.delete(param1);
        this._SafeStr_3518.delete(param1);
        this.sendResetCategoryMessage(param1);
        this.sendUpdateEvent();
        return true;
    }

    public resetItems(param1: number, param2: any[]): boolean {
        if (this.getCount(param1) == 0) {
            return false;
        }
        let _loc4_: Set = this._unseenItems.get(param1);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.remove(_loc3_);
        }
        this.removeItemsFromMovedToTop(param1, param2);
        this.sendResetItemsMessage(param1, param2);
        this.sendUpdateEvent();
        return true;
    }

    public resetCategoryIfEmpty(param1: number): boolean {
        if (this.getCount(param1) == 0) {
            this._unseenItems.delete(param1);
            this._SafeStr_3518.delete(param1);
            this.sendResetCategoryMessage(param1);
            this.sendUpdateEvent();
            return true;
        }
        return false;
    }

    public isUnseen(param1: number, param2: number): boolean {
        let _loc3_: Set = null;
        if (this._unseenItems.get(param1) != null) {
            _loc3_ = this._unseenItems.get(param1);
            return _loc3_.contains(param2);
        }
        return false;
    }

    public removeUnseen(param1: number, param2: number): boolean {
        let _loc3_: Set = null;
        if (this._unseenItems.get(param1) != null) {
            _loc3_ = this._unseenItems.get(param1);
            if (_loc3_.remove(param2)) {
                this.removeItemsFromMovedToTop(param1, [param2]);
                this.sendUpdateEvent();
                return true;
            }
        }
        return false;
    }

    public getIds(param1: number): any[] {
        if (this._unseenItems.get(param1) != null) {
            return (asInstanceOf(this._unseenItems.get(param1), Set)).toArray();
        }
        return [];
    }

    public getCount(param1: number): number {
        if (this._unseenItems.get(param1) != null) {
            return (asInstanceOf(this._unseenItems.get(param1), Set)).length | 0;
        }
        return 0;
    }

    public setUnseenItem(param1: number, param2: number): void {
        this.addItems(param1, [param2]);
        this.onUnseenItemsUpdate();
    }

    public setUnseenItemMovedToTop(param1: number, param2: any[]): void {
        this.addItems(param1, param2, this._SafeStr_3518);
    }

    public isUnseenItemMovedToTop(param1: number, param2: number): boolean {
        let _loc3_: Set = null;
        if (this._SafeStr_3518.get(param1) != null) {
            _loc3_ = this._SafeStr_3518.get(param1);
            return _loc3_.contains(param2);
        }
        return false;
    }

    private onUnseenItems = (param1: UnseenItemsEvent): void => {
        let _loc2_: boolean = false;
        let _loc5_: any[] = null;
        let _loc3_: UnseenItemsParser = param1.getParser();
        for (const _loc4_ of _loc3_.getCategories() ?? []) {
            _loc5_ = _loc3_.getItemsByCategory(_loc4_ | 0);
            this.addItems(_loc4_ | 0, _loc5_);
            if (UnseenItemCategory.INVENTORY_CATEGORIES.indexOf(_loc4_) >= 0) {
                _loc2_ = true;
            }
        }
        this.onUnseenItemsUpdate();
    };

    private onUnseenItemsUpdate(): void {
        if (this._inventory.isInitialized) {
            this._inventory.updateUnseenItemCounts();
            this._inventory.furniModel.updateUnseenItemsThumbs();
            this._inventory.petsModel.updateView();
            this._inventory.botsModel.updateView();
        }
        this.sendUpdateEvent();
    }

    private sendUpdateEvent(): void {
        let _loc2_: number = 0;
        let _loc1_: HabboUnseenItemsUpdatedEvent = new HabboUnseenItemsUpdatedEvent();
        let _loc3_: any[] = UnseenItemCategory.INVENTORY_CATEGORIES;
        for (const _loc4_ of _loc3_ ?? []) {
            _loc2_ = this.getCount(_loc4_ | 0);
            _loc1_.setCategoryCount(_loc4_ | 0, _loc2_);
            if (UnseenItemCategory.INVENTORY_CATEGORIES.indexOf(_loc4_) >= 0) {
                _loc1_.inventoryCount += _loc2_;
            }
        }
        this._events.dispatchEvent(_loc1_);
    }

    private addItems(param1: number, param2: any[], param3: Map<any, any> = null): void {
        let _loc4_: Set = null;
        if (param2 == null) {
            return;
        }
        if (param3 == null) {
            param3 = this._unseenItems;
        }
        if (param3.get(param1) == null) {
            _loc4_ = new Set();
            param3.set(param1, _loc4_);
        }
        _loc4_ = param3.get(param1);
        for (const _loc5_ of param2 ?? []) {
            _loc4_.add(_loc5_);
        }
    }

    private sendResetCategoryMessage(param1: number): void {
        this._communication.connection.send(new ResetUnseenItemsComposer(param1));
    }

    private sendResetItemsMessage(param1: number, param2: any[]): void {
        this._communication.connection.send(new ResetUnseenItemIdsComposer(param1, param2));
    }

    private removeItemsFromMovedToTop(param1: number, param2: any[]): void {
        if (this._SafeStr_3518.get(param1) == null || param2 == null) {
            return;
        }
        let _loc4_: Set = this._SafeStr_3518.get(param1);
        for (const _loc3_ of param2 ?? []) {
            _loc4_.remove(_loc3_);
        }
    }
}
