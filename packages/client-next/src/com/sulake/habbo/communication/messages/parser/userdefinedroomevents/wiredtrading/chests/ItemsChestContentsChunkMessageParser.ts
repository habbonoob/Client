import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ChestStorage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestStorage';

export class ItemsChestContentsChunkMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests::ItemsChestContentsChunkMessageParser'); }

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    declare private _totalFragments: number;
    static { (this.prototype as any)._totalFragments = 0; }

    declare private _fragmentNo: number;
    static { (this.prototype as any)._fragmentNo = 0; }

    declare private _storageChunk: ChestStorage[];

    constructor() {
    }

    public flush(): boolean {
        this._chestId = 0;
        this._totalFragments = 0;
        this._fragmentNo = 0;
        this._storageChunk = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._chestId = param1.readInteger();
        this._totalFragments = param1.readInteger();
        this._fragmentNo = param1.readInteger();
        this._storageChunk = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._storageChunk.push(new ChestStorage(param1));
            _loc3_++;
        }
        return true;
    }

    public get chestId(): number {
        return this._chestId;
    }

    public get totalFragments(): number {
        return this._totalFragments;
    }

    public get fragmentNo(): number {
        return this._fragmentNo;
    }

    public get storageChunk(): ChestStorage[] {
        return this._storageChunk;
    }
}
