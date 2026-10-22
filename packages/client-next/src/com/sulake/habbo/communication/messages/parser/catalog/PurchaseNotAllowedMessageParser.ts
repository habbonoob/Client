import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PurchaseNotAllowedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::PurchaseNotAllowedMessageParser'); }

    private _errorCode: number = 0;

    constructor() {
    }

    public get errorCode(): number {
        return this._errorCode;
    }

    public flush(): boolean {
        this._errorCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readInteger();
        return true;
    }
}
