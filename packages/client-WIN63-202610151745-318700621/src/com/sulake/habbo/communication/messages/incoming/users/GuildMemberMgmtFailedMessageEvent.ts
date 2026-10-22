import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildMemberMgmtFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildMemberMgmtFailedMessageParser';

export class GuildMemberMgmtFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMemberMgmtFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildMemberMgmtFailedMessageParser);
    }

    public get reason(): number {
        return castTo(this._parser, GuildMemberMgmtFailedMessageParser).reason;
    }

    public get guildId(): number {
        return castTo(this._parser, GuildMemberMgmtFailedMessageParser).guildId;
    }
}
