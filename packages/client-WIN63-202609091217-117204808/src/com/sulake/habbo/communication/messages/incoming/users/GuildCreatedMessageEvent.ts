import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildCreatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildCreatedMessageParser';

export class GuildCreatedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildCreatedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildCreatedMessageParser);
    }

    public get baseRoomId(): number {
        return castTo(this._parser, GuildCreatedMessageParser).baseRoomId;
    }

    public get groupId(): number {
        return castTo(this._parser, GuildCreatedMessageParser).groupId;
    }
}
