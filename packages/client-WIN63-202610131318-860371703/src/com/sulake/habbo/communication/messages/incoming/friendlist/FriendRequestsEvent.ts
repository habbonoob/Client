import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendRequestsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendRequestsMessageParser';

export class FriendRequestsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendRequestsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendRequestsMessageParser);
    }

    public getParser(): FriendRequestsMessageParser {
        return this._parser instanceof FriendRequestsMessageParser ? this._parser : null;
    }
}
