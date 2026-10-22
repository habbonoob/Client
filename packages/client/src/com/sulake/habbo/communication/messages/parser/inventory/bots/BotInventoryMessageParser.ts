import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { BotData } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotData';

export class BotInventoryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.bots::BotInventoryMessageParser'); }

    constructor() {
    }

    declare private _items: UtilsMap;

    public get items(): UtilsMap {
        return this._items;
    }

    public flush(): boolean {
        if (this._items) {
            this._items.dispose();
            this._items = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: BotData = null;
        this._items = new UtilsMap();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new BotData(param1);
            this._items.add(_loc2_.id, _loc2_);
            _loc4_++;
        }
        return true;
    }
}
