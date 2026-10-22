import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MessengerErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.friendlist::MessengerErrorMessageParser'); }

    constructor() {
    }

    declare private _clientMessageId: number;
    static { (this.prototype as any)._clientMessageId = 0; }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public get clientMessageId(): number {
        return this._clientMessageId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._clientMessageId = param1.readInteger();
        this._errorCode = param1.readInteger();
        return true;
    }
}
