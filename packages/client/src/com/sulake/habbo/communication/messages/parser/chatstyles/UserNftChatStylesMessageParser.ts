import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserNftChatStylesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.chatstyles::UserNftChatStylesMessageParser'); }

    constructor() {
    }

    declare private _chatStyleIds: number[];

    public get chatStyleIds(): number[] {
        return this._chatStyleIds;
    }

    public flush(): boolean {
        this._chatStyleIds = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._chatStyleIds = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._chatStyleIds.push(param1.readInteger());
            _loc3_ += 1;
        }
        return true;
    }
}
