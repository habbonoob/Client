import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AcceptFriendResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/AcceptFriendResultMessageParser';

export class AcceptFriendResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::AcceptFriendResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AcceptFriendResultMessageParser);
    }

    public getParser(): AcceptFriendResultMessageParser {
        return this._parser instanceof AcceptFriendResultMessageParser ? this._parser : null;
    }
}
