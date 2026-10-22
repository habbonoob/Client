import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FollowFriendFailedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::FollowFriendFailedMessageParser'); }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readInteger();
        return true;
    }

    public get errorCode(): number {
        return this._errorCode;
    }
}
