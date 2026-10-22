import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CompleteDiffieHandshakeParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::CompleteDiffieHandshakeParser'); }

    constructor() {
    }

    declare private _encryptedPublicKey: string;

    private _serverClientEncryption: boolean = false;

    public get encryptedPublicKey(): string {
        return this._encryptedPublicKey;
    }

    public get serverClientEncryption(): boolean {
        return this._serverClientEncryption;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._encryptedPublicKey = param1.readString();
        if (param1.bytesAvailable) {
            this._serverClientEncryption = param1.readBoolean();
        }
        return true;
    }
}
