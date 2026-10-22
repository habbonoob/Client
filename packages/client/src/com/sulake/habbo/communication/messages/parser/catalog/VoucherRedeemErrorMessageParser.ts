import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class VoucherRedeemErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::VoucherRedeemErrorMessageParser'); }

    constructor() {
    }

    private _errorCode: string = "";

    public get errorCode(): string {
        return this._errorCode;
    }

    public flush(): boolean {
        this._errorCode = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readString();
        return true;
    }
}
