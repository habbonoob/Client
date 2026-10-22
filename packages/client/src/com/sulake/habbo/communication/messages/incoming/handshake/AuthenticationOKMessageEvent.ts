import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AuthenticationOKMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/AuthenticationOKMessageParser';

export class AuthenticationOKMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::AuthenticationOKMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AuthenticationOKMessageParser);
    }

    public get suggestedLoginActions(): any[] {
        return (this._parser instanceof AuthenticationOKMessageParser ? this._parser : null).suggestedLoginActions;
    }
}
