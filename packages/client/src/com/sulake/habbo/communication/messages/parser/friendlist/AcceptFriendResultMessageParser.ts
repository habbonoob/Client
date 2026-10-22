import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AcceptFriendFailureData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/AcceptFriendFailureData';

export class AcceptFriendResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::AcceptFriendResultMessageParser'); }

    constructor() {
    }

    declare private _failures: any[];

    public get failures(): any[] {
        return this._failures;
    }

    public flush(): boolean {
        this._failures = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._failures.push(new AcceptFriendFailureData(param1));
            _loc3_++;
        }
        return true;
    }
}
