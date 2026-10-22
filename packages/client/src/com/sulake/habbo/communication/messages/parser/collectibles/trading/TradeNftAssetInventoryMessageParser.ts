import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TradeNftItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/trading/TradeNftItem';

export class TradeNftAssetInventoryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles.trading::TradeNftAssetInventoryMessageParser'); }

    constructor() {
    }

    declare private _items: TradeNftItem[];

    public get items(): TradeNftItem[] {
        return this._items;
    }

    public flush(): boolean {
        this._items = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._items = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._items.push(new TradeNftItem(param1));
            _loc3_++;
        }
        return true;
    }
}
