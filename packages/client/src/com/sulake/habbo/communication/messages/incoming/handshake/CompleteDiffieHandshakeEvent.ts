import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CompleteDiffieHandshakeParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/CompleteDiffieHandshakeParser';

export class CompleteDiffieHandshakeEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::CompleteDiffieHandshakeEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CompleteDiffieHandshakeParser);
    }

    public get encryptedPublicKey(): string {
        return (this._parser instanceof CompleteDiffieHandshakeParser ? this._parser : null).encryptedPublicKey;
    }

    public get serverClientEncryption(): boolean {
        return (this._parser instanceof CompleteDiffieHandshakeParser ? this._parser : null).serverClientEncryption;
    }
}
