import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import { WiredTransactionInfo } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionInfo';

export class WiredTransactionDetails {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionDetails'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: ChestItemType = null;
        let _loc3_: number = 0;
        this._transactionInfo = new WiredTransactionInfo(param1);
        this._chestIds = [];
        _loc4_ = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            this._chestIds.push(param1.readInteger());
            _loc5_++;
        }
        this._depositedFurnis = new UtilsMap();
        this._withdrawnFurnis = new UtilsMap();
        _loc4_ = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_ = ChestItemType.readFromMessage(param1);
            _loc3_ = param1.readInteger();
            this._depositedFurnis.add(_loc2_, _loc3_);
            _loc5_++;
        }
        _loc4_ = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_ = ChestItemType.readFromMessage(param1);
            _loc3_ = param1.readInteger();
            this._withdrawnFurnis.add(_loc2_, _loc3_);
            _loc5_++;
        }
        this._isIncompleteData = param1.readBoolean();
    }

    declare private _chestIds: number[];

    declare private _depositedFurnis: UtilsMap;

    declare private _withdrawnFurnis: UtilsMap;

    declare private _isIncompleteData: boolean;
    static { (this.prototype as any)._isIncompleteData = false; }

    declare private _transactionInfo: WiredTransactionInfo;

    public get transactionInfo(): WiredTransactionInfo {
        return this._transactionInfo;
    }

    public get chestIds(): number[] {
        return this._chestIds;
    }

    public get depositedFurnis(): UtilsMap {
        return this._depositedFurnis;
    }

    public get withdrawnFurnis(): UtilsMap {
        return this._withdrawnFurnis;
    }

    public get isIncompleteData(): boolean {
        return this._isIncompleteData;
    }
}
