import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RestoreClientMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/RestoreClientMessageParser';

export class RestoreClientMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::RestoreClientMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RestoreClientMessageParser);
    }

    public getParser(): RestoreClientMessageParser {
        return this._parser instanceof RestoreClientMessageParser ? this._parser : null;
    }
}
