import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ItemsChestContentsChunkMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/ItemsChestContentsChunkMessageParser';
import type { ItemsChestContentsUpdatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/ItemsChestContentsUpdatedMessageParser';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { ChestStorage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestStorage';
import type { IWiredChestParent } from '@/com/sulake/habbo/roomevents/wired_trading/chests/IWiredChestParent';
import { ItemsChestContentsChunkMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/ItemsChestContentsChunkMessageEvent';
import { ItemsChestContentsUpdatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/ItemsChestContentsUpdatedMessageEvent';
import { WithdrawItemsFromChestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/WithdrawItemsFromChestMessageComposer';
import { ChestType } from '@/com/sulake/habbo/roomevents/wired_trading/chests/ChestType';
import { AbstractChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/AbstractChestSubController';
import { FurniChestView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/views/FurniChestView';
import { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController.group';

export class FurniChestSubController extends AbstractChestSubController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.subcontrollers::FurniChestSubController'); }

    constructor(param1: IWiredChestParent) {
        super(param1);
        this._storages = [];
        this.addMessageEvent(new ItemsChestContentsUpdatedMessageEvent(this.onItemsUpdated));
        this.addMessageEvent(new ItemsChestContentsChunkMessageEvent(this.onItemsChunk));
        this._view = new FurniChestView(this);
    }

    declare private _view: FurniChestView;

    declare private _storages: ChestStorage[];

    public override get type(): number {
        return ChestType.TYPE_FURNI;
    }

    public override get title(): string {
        return this.localize("wiredchests.furni_chest");
    }

    public override get view(): IWindowContainer {
        return this._view.container;
    }

    public override get isEmpty(): boolean {
        return this._storages.length == 0;
    }

    public override get itemCount(): number {
        return this._storages.length | 0;
    }

    public override clear(): void {
        this._storages = [];
        this._view.clear();
        super.clear();
    }

    public override updateUI(): void {
        this._view.updateUI();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._view.dispose();
        this._view = null;
        super.dispose();
    }

    public withdrawItemsWithType(param1: ChestItemType, param2: number): void {
        this.parentController.send(new WithdrawItemsFromChestMessageComposer(this.viewingChestId, param1, param2));
    }

    public viewLogsWithType(param1: ChestItemType): void {
    }

    private onItemsUpdated = (param1: ItemsChestContentsUpdatedMessageEvent): void => {
        let _loc3_: ItemsChestContentsUpdatedMessageParser = param1.getParser();
        if (this.parentController.activeChestId != _loc3_.chestId || this.parentController.status != WiredChestController.STATUS_OPEN) {
            return;
        }
        let _loc8_: Map<any, any> = new Dictionary();
        for (const _loc4_ of _loc3_.removedIds ?? []) {
            _loc8_.set(_loc4_, true);
        }
        let _loc6_: ChestStorage[] = [];
        let _loc2_: ChestStorage[] = [];
        let _loc10_: ChestStorage[] = [];
        let _loc5_: Map<any, any> = new Dictionary();
        for (const _loc9_ of this._storages ?? []) {
            if (_loc8_.has(_loc9_.inventoryId)) {
                _loc2_.push(_loc9_);
            } else {
                _loc6_.push(_loc9_);
                _loc5_.set(_loc9_.inventoryId, true);
            }
        }
        for (const _loc7_ of _loc3_.addedStorage ?? []) {
            if (!(_loc5_.has(_loc7_.inventoryId))) {
                _loc10_.push(_loc7_);
                _loc6_.push(_loc7_);
                _loc5_.set(_loc7_.inventoryId, true);
            }
        }
        this._storages = _loc6_;
        this._view.itemsUpdated(_loc2_, _loc10_);
    };

    private onItemsChunk = (param1: ItemsChestContentsChunkMessageEvent): void => {
        let _loc2_: ItemsChestContentsChunkMessageParser = param1.getParser();
        let _loc3_: number = _loc2_.chestId;
        if (_loc2_.fragmentNo == 0) {
            if (this.parentController.requestedChestId != _loc3_) {
                return;
            }
            this._view.clear();
            this._storages = [];
            this.parentController.setOpeningStatus(_loc3_);
        }
        for (const _loc4_ of _loc2_.storageChunk ?? []) {
            this._storages.push(_loc4_);
        }
        if (_loc2_.fragmentNo == _loc2_.totalFragments - 1) {
            this.parentController.setOpenStatus(_loc3_, this);
            this._view.itemsInitialize(this._storages);
        }
    };
}
