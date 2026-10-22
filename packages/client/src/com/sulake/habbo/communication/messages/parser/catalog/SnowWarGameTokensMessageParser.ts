import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SnowWarGameTokenOffer } from '@/com/sulake/habbo/communication/messages/parser/catalog/SnowWarGameTokenOffer';

export class SnowWarGameTokensMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::SnowWarGameTokensMessageParser'); }

    constructor() {
    }

    declare private _offers: any[];

    public get offers(): any[] {
        return this._offers;
    }

    public flush(): boolean {
        this._offers = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._offers = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._offers.push(new SnowWarGameTokenOffer(param1));
            _loc3_++;
        }
        return true;
    }
}
