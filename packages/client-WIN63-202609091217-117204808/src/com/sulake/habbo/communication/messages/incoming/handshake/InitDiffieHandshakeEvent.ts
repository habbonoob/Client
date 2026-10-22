import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InitDiffieHandshakeParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/InitDiffieHandshakeParser';

export class InitDiffieHandshakeEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::InitDiffieHandshakeEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InitDiffieHandshakeParser);
    }

    public get encryptedPrime(): string {
        return (this._parser instanceof InitDiffieHandshakeParser ? this._parser : null).encryptedPrime;
    }

    public get encryptedGenerator(): string {
        return (this._parser instanceof InitDiffieHandshakeParser ? this._parser : null).encryptedGenerator;
    }
}
