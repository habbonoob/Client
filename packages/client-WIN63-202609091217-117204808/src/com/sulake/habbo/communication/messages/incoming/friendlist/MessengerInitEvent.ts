import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MessengerInitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MessengerInitMessageParser';

export class MessengerInitEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::MessengerInitEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MessengerInitMessageParser);
    }

    public getParser(): MessengerInitMessageParser {
        return this._parser instanceof MessengerInitMessageParser ? this._parser : null;
    }
}
