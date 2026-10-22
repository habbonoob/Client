import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FaqSearchResultsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::FaqSearchResultsMessageParser'); }

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
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc4_: number = 0;
        this._data = new UtilsMap();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = param1.readInteger();
            _loc5_ = param1.readString();
            this._data.add(_loc2_, _loc5_);
            _loc4_++;
        }
        return true;
    }
}
