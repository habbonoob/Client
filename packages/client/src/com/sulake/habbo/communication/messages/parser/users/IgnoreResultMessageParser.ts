import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IgnoreResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::IgnoreResultMessageParser'); }

    constructor() {
        this._result = -1;
    }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    declare private _ignoredUserId: number;
    static { (this.prototype as any)._ignoredUserId = 0; }

    public get result(): number {
        return this._result;
    }

    public get ignoredUserId(): number {
        return this._ignoredUserId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        this._ignoredUserId = param1.readInteger();
        return true;
    }
}
