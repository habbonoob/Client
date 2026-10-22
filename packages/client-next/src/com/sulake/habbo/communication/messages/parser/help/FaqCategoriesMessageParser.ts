import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FaqCategoriesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::FaqCategoriesMessageParser'); }

    declare private _data: UtilsMap;

    constructor() {
    }

    public get data(): UtilsMap {
        return this._data;
    }

    public flush(): boolean {
        if (this._data != null) {
            this._data.dispose();
        }
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: UtilsMap = null;
        let _loc6_: number = 0;
        let _loc5_: string = null;
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        this._data = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = new UtilsMap();
            _loc6_ = param1.readInteger();
            _loc5_ = param1.readString();
            _loc7_ = param1.readInteger();
            _loc3_.add("name", _loc5_);
            _loc3_.add("count", _loc7_);
            this._data.add(_loc6_, _loc3_);
            _loc4_++;
        }
        return true;
    }
}
