import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendsListFragmentMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendsListFragmentMessageParser';

export class FriendListFragmentMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendListFragmentMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendsListFragmentMessageParser);
    }

    public getParser(): FriendsListFragmentMessageParser {
        return this._parser instanceof FriendsListFragmentMessageParser ? this._parser : null;
    }
}
