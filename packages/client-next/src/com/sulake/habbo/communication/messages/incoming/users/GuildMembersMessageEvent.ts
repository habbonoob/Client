import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GuildMemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildMembersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildMembersMessageParser';

export class GuildMembersMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMembersMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildMembersMessageParser);
    }

    public get data(): GuildMemberData {
        return castTo(this._parser, GuildMembersMessageParser).data;
    }
}
