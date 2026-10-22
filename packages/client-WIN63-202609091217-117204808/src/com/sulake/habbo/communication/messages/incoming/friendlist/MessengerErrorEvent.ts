import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MessengerErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MessengerErrorMessageParser';

export class MessengerErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::MessengerErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MessengerErrorMessageParser);
    }

    public getParser(): MessengerErrorMessageParser {
        return this._parser instanceof MessengerErrorMessageParser ? this._parser : null;
    }
}
