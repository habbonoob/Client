import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';

export class TradeNftAssetsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles.trading::TradeNftAssetsMessageParser'); }

    constructor() {
    }

    declare private _myItems: TradeNftItem[];

    declare private _theirItems: TradeNftItem[];

    public get myItems(): TradeNftItem[] {
        return this._myItems;
    }

    public get theirItems(): TradeNftItem[] {
        return this._theirItems;
    }

    public flush(): boolean {
        this._myItems = null;
        this._theirItems = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        _loc3_ = 0;
        this._myItems = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._myItems.push(new TradeNftItem(param1));
            _loc3_++;
        }
        this._theirItems = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._theirItems.push(new TradeNftItem(param1));
            _loc3_++;
        }
        return true;
    }
}
