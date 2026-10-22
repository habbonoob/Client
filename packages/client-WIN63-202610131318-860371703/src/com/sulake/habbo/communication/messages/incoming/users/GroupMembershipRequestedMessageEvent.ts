import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GroupMembershipRequestedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GroupMembershipRequestedMessageParser';

export class GroupMembershipRequestedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GroupMembershipRequestedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GroupMembershipRequestedMessageParser);
    }

    public getParser(): GroupMembershipRequestedMessageParser {
        return castTo(this._parser, GroupMembershipRequestedMessageParser);
    }
}
