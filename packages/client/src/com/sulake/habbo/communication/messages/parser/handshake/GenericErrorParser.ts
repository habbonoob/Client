import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GenericErrorParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::GenericErrorParser'); }

    constructor() {
    }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readInteger();
        return true;
    }
}
