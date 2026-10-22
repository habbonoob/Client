import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NewFriendRequestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewFriendRequestMessageParser';

export class NewFriendRequestEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::NewFriendRequestEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NewFriendRequestMessageParser);
    }

    public getParser(): NewFriendRequestMessageParser {
        return this._parser instanceof NewFriendRequestMessageParser ? this._parser : null;
    }
}
