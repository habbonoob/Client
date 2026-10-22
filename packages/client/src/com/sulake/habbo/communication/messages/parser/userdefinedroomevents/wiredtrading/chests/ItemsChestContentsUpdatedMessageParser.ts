import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ChestStorage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestStorage';

export class ItemsChestContentsUpdatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests::ItemsChestContentsUpdatedMessageParser'); }

    constructor() {
    }

    declare private _removedIds: number[];

    declare private _addedStorage: ChestStorage[];

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    public get chestId(): number {
        return this._chestId;
    }

    public get removedIds(): number[] {
        return this._removedIds;
    }

    public get addedStorage(): ChestStorage[] {
        return this._addedStorage;
    }

    public flush(): boolean {
        this._chestId = 0;
        this._removedIds = null;
        this._addedStorage = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        this._chestId = param1.readInteger();
        this._removedIds = [];
        this._addedStorage = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            this._removedIds.push(param1.readInteger());
            _loc4_++;
        }
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            this._addedStorage.push(new ChestStorage(param1));
            _loc4_++;
        }
        return true;
    }
}
