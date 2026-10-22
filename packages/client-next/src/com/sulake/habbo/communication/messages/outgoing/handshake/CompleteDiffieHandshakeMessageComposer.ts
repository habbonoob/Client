import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IPreEncryptionMessage } from '@/com/sulake/core/communication/messages/IPreEncryptionMessage';

export class CompleteDiffieHandshakeMessageComposer implements IMessageComposer, IPreEncryptionMessage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::CompleteDiffieHandshakeMessageComposer'); }

    declare private _publicKey: string;

    constructor(param1: string) {
        this._publicKey = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._publicKey];
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IPreEncryptionMessage](): true {
        return true;
    }
}
