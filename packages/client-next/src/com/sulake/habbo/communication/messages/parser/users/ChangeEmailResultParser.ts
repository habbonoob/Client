import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChangeEmailResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::ChangeEmailResultParser'); }

    public static readonly _SafeStr_7736: number = 0;

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        return true;
    }

    public get result(): number {
        return this._result;
    }
}
