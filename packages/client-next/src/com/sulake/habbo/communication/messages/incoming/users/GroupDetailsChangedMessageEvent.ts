import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GroupDetailsChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GroupDetailsChangedMessageParser';

export class GroupDetailsChangedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GroupDetailsChangedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GroupDetailsChangedMessageParser);
    }

    public get groupId(): number {
        return castTo(this._parser, GroupDetailsChangedMessageParser).groupId;
    }
}
