import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendListUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendListUpdateMessageParser';

export class FriendListUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendListUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendListUpdateMessageParser);
    }

    public getParser(): FriendListUpdateMessageParser {
        return this._parser instanceof FriendListUpdateMessageParser ? this._parser : null;
    }
}
