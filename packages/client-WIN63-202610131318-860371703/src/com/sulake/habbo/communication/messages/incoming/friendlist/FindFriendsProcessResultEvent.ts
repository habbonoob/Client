import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FindFriendsProcessResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/FindFriendsProcessResultMessageParser';

export class FindFriendsProcessResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FindFriendsProcessResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FindFriendsProcessResultMessageParser);
    }

    public get success(): boolean {
        return castTo(this._parser, FindFriendsProcessResultMessageParser).success;
    }
}
