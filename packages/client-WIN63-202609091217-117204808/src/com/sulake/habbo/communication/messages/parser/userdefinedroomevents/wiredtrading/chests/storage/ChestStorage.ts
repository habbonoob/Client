import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ChestBasedItem } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestBasedItem';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { _SafeCls_1996 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_1996';
import { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';

export class ChestStorage implements ChestBasedItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests.storage::ChestStorage'); }

    public static _SafeStr_7904: number = 0;
    public static _SafeStr_7793: number = 1;
    public static _SafeStr_7934: number = 2;
    public static _SafeStr_7802: number = 3;

    declare private _inventoryId: number;
    static { (this.prototype as any)._inventoryId = 0; }

    declare private _lockState: number;
    static { (this.prototype as any)._lockState = 0; }

    declare private _transactionId: number;
    static { (this.prototype as any)._transactionId = NaN; }

    declare private _type: ChestItemType;

    declare private _groupable: boolean;
    static { (this.prototype as any)._groupable = false; }

    declare private _specialType: number;
    static { (this.prototype as any)._specialType = 0; }

    declare private _stuffData: IStuffData;

    declare private _extra: number;
    static { (this.prototype as any)._extra = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._inventoryId = param1.readInteger();
        this._lockState = param1.readInteger();
        this._transactionId = param1.readLong();
        this._type = ChestItemType.readFromMessage(param1);
        this._groupable = param1.readBoolean();
        this._specialType = param1.readInteger();
        this._stuffData = _SafeCls_1996.parseStuffData(param1);
        if (!this._type.isWallItem) {
            this._extra = param1.readInteger();
        }
    }

    public get inventoryId(): number {
        return this._inventoryId;
    }

    public get lockState(): number {
        return this._lockState;
    }

    public get transactionId(): number {
        return this._transactionId;
    }

    public get type(): ChestItemType {
        return this._type;
    }

    public get groupable(): boolean {
        return this._groupable;
    }

    public get specialType(): number {
        return this._specialType;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public get extra(): number {
        return this._extra;
    }
}
