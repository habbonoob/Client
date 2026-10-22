import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildMembershipRejectedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildMembershipRejectedMessageParser';

export class GuildMembershipRejectedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMembershipRejectedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildMembershipRejectedMessageParser);
    }

    public getParser(): GuildMembershipRejectedMessageParser {
        return castTo(this._parser, GuildMembershipRejectedMessageParser);
    }
}
