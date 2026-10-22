import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BadgeAndPointLimit } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgeAndPointLimit';

export class BadgePointLimitsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.badges::BadgePointLimitsParser'); }

    declare private _data: any[];

    constructor() {
    }

    public flush(): boolean {
        this._data = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc6_: string = null;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc6_ = param1.readString();
            _loc2_ = param1.readInteger();
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                this._data.push(new BadgeAndPointLimit(_loc6_, param1));
                _loc3_++;
            }
            _loc5_++;
        }
        return true;
    }

    public get data(): any[] {
        return this._data;
    }
}
