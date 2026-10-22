import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserRightsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserRightsMessageParser';

export class UserRightsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::UserRightsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserRightsMessageParser);
    }

    public get clubLevel(): number {
        return (this._parser instanceof UserRightsMessageParser ? this._parser : null).clubLevel;
    }

    public get securityLevel(): number {
        return (this._parser instanceof UserRightsMessageParser ? this._parser : null).securityLevel;
    }

    public get isAmbassador(): boolean {
        return (this._parser instanceof UserRightsMessageParser ? this._parser : null).isAmbassador;
    }
}
