import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IPreEncryptionMessage } from '@/com/sulake/core/communication/messages/IPreEncryptionMessage';

export class InitDiffieHandshakeMessageComposer implements IMessageComposer, IPreEncryptionMessage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::InitDiffieHandshakeMessageComposer'); }

    constructor() {
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [];
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IPreEncryptionMessage](): true {
        return true;
    }
}
