import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FollowFriendFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FollowFriendFailedMessageParser';

export class FollowFriendFailedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FollowFriendFailedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FollowFriendFailedMessageParser);
    }

    public getParser(): FollowFriendFailedMessageParser {
        return this._parser instanceof FollowFriendFailedMessageParser ? this._parser : null;
    }
}
