import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ErrorReportMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.error::ErrorReportMessageParser'); }

    constructor() {
    }

    declare private _messageId: number;
    static { (this.prototype as any)._messageId = 0; }

    declare private _SafeStr_5424: string;

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public get messageId(): number {
        return this._messageId;
    }

    public get timestamp(): string {
        return this._SafeStr_5424;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._messageId = param1.readInteger();
        this._errorCode = param1.readInteger();
        this._SafeStr_5424 = param1.readString();
        return true;
    }

    public flush(): boolean {
        this._errorCode = 0;
        this._messageId = 0;
        this._SafeStr_5424 = null;
        return true;
    }
}
