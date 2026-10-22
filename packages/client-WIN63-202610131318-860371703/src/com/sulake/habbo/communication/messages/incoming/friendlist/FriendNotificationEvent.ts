import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FriendNotificationMessageParser';

export class FriendNotificationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendNotificationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendNotificationMessageParser);
    }

    public getParser(): FriendNotificationMessageParser {
        return this._parser instanceof FriendNotificationMessageParser ? this._parser : null;
    }
}
