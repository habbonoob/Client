import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ActivityPointsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::ActivityPointsMessageParser'); }

    constructor() {
    }

    declare private _SafeStr_5536: Map<any, any>;

    public get points(): Map<any, any> {
        return this._SafeStr_5536;
    }

    public flush(): boolean {
        this._SafeStr_5536 = new Dictionary();
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc5_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            this._SafeStr_5536.set(_loc5_, _loc2_);
            _loc4_++;
        }
        return true;
    }
}
