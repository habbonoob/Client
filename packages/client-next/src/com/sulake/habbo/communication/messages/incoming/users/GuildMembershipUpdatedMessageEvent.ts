import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { MemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/MemberData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildMembershipUpdatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildMembershipUpdatedMessageParser';

export class GuildMembershipUpdatedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMembershipUpdatedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildMembershipUpdatedMessageParser);
    }

    public get data(): MemberData {
        return castTo(this._parser, GuildMembershipUpdatedMessageParser).data;
    }

    public get guildId(): number {
        return castTo(this._parser, GuildMembershipUpdatedMessageParser).guildId;
    }
}
