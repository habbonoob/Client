import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TryVerificationCodeResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.gifts::TryVerificationCodeResultParser'); }

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _millisecondsToAllowProcessReset: number;
    static { (this.prototype as any)._millisecondsToAllowProcessReset = 0; }

    constructor() {
    }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get millisecondsToAllowProcessReset(): number {
        return this._millisecondsToAllowProcessReset;
    }

    public flush(): boolean {
        this._resultCode = -1;
        this._millisecondsToAllowProcessReset = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultCode = param1.readInteger();
        this._millisecondsToAllowProcessReset = param1.readInteger();
        return true;
    }
}
