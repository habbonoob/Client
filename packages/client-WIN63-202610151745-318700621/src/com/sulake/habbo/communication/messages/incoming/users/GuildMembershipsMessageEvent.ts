import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildMembershipsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildMembershipsMessageParser';

export class GuildMembershipsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMembershipsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildMembershipsMessageParser);
    }

    public get guilds(): any[] {
        return castTo(this._parser, GuildMembershipsMessageParser).guilds;
    }
}
