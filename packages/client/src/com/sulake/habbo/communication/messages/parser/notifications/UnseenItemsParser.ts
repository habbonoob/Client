import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class UnseenItemsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::UnseenItemsParser'); }

    constructor() {
    }

    declare private _items: UtilsMap;

    public flush(): boolean {
        if (this._items) {
            this._items.dispose();
            this._items = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc6_: any[] = null;
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        this._items = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc5_ = param1.readInteger();
            _loc6_ = [];
            _loc7_ = param1.readInteger();
            _loc4_ = 0;
            while (_loc4_ < _loc7_) {
                _loc6_.push(param1.readInteger());
                _loc4_++;
            }
            this._items.add(_loc5_, _loc6_);
            _loc3_++;
        }
        return true;
    }

    public getCategories(): any[] {
        return this._items.getKeys();
    }

    public getItemsByCategory(param1: number): any[] {
        return this._items.getValue(param1);
    }
}
