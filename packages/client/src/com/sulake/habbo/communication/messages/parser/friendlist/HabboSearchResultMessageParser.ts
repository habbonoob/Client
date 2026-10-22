import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { HabboSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/HabboSearchResultData';

export class HabboSearchResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::HabboSearchResultMessageParser'); }

    constructor() {
    }

    declare private _friends: any[];

    declare private _others: any[];

    public get others(): any[] {
        return this._others;
    }

    public get friends(): any[] {
        return this._friends;
    }

    public flush(): boolean {
        this._friends = [];
        this._others = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._friends.push(new HabboSearchResultData(param1));
            _loc3_++;
        }
        let _loc4_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            this._others.push(new HabboSearchResultData(param1));
            _loc3_++;
        }
        return true;
    }
}
