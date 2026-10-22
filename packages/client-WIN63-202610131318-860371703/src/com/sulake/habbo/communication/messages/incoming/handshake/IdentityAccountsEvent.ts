import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IdentityAccountsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/IdentityAccountsMessageParser';

export class IdentityAccountsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::IdentityAccountsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IdentityAccountsMessageParser);
    }

    public getParser(): IdentityAccountsMessageParser {
        return this._parser instanceof IdentityAccountsMessageParser ? this._parser : null;
    }
}
