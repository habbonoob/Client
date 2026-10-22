import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InstantMessageErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::InstantMessageErrorMessageParser'); }

    constructor() {
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _message: string;

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public get userId(): number {
        return this._userId;
    }

    public get message(): string {
        return this._message;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readInteger();
        this._userId = param1.readInteger();
        this._message = param1.readString();
        return true;
    }
}
