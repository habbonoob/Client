import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserObjectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UserObjectMessageParser';

export class UserObjectEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::UserObjectEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserObjectMessageParser);
    }

    public getParser(): UserObjectMessageParser {
        return this._parser instanceof UserObjectMessageParser ? this._parser : null;
    }
}
