import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BlockListMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::BlockListMessageParser'); }

    protected _SafeStr_4431: any[] = null;

    constructor() {
        this._SafeStr_4431 = [];
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_4431 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_4431.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public get blockedUsers(): any[] {
        return this._SafeStr_4431.slice();
    }
}
