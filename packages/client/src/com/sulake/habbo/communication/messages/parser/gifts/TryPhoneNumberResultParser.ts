import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TryPhoneNumberResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.gifts::TryPhoneNumberResultParser'); }

    constructor() {
    }

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _millisToAllowProcessReset: number;
    static { (this.prototype as any)._millisToAllowProcessReset = 0; }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get millisToAllowProcessReset(): number {
        return this._millisToAllowProcessReset;
    }

    public flush(): boolean {
        this._resultCode = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultCode = param1.readInteger();
        this._millisToAllowProcessReset = param1.readInteger();
        return true;
    }
}
