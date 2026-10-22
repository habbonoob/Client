import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChatReviewSessionVotingStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::ChatReviewSessionVotingStatusMessageParser'); }

    public static readonly _SafeStr_7960: number = 0;
    public static readonly _SafeStr_8497: number = 1;
    public static readonly _SafeStr_8741: number = 2;
    public static readonly _SafeStr_8753: number = 3;
    public static readonly _SafeStr_8345: number = 4;
    public static readonly _SafeStr_7681: number = 5;

    declare private _status: any[];

    constructor() {
    }

    public flush(): boolean {
        this._status = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._status = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._status.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public get status(): any[] {
        return this._status;
    }
}
