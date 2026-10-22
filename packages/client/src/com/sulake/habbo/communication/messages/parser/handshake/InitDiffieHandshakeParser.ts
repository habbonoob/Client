import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InitDiffieHandshakeParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::InitDiffieHandshakeParser'); }

    constructor() {
    }

    declare private _encryptedPrime: string;

    declare private _encryptedGenerator: string;

    public get encryptedPrime(): string {
        return this._encryptedPrime;
    }

    public get encryptedGenerator(): string {
        return this._encryptedGenerator;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._encryptedPrime = param1.readString();
        this._encryptedGenerator = param1.readString();
        return true;
    }
}
