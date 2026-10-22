import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { EmailStatusParser } from '@/com/sulake/habbo/communication/messages/parser/users/EmailStatusParser';

export class EmailStatusResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::EmailStatusResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, EmailStatusParser);
    }

    public getParser(): EmailStatusParser {
        return this._parser instanceof EmailStatusParser ? this._parser : null;
    }
}
