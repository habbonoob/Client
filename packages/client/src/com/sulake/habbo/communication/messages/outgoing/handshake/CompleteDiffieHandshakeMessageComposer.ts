import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IPreEncryptionMessage } from '@/com/sulake/core/communication/messages/IPreEncryptionMessage';

export class CompleteDiffieHandshakeMessageComposer implements IMessageComposer, IPreEncryptionMessage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::CompleteDiffieHandshakeMessageComposer'); }

    constructor(publicKey: string) {
        this._publicKey = publicKey;
    }

    declare private _publicKey: string;

    public dispose(): void {
        this._publicKey = null;
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
