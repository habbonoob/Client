import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildMemberFurniCountInHQMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildMemberFurniCountInHQMessageParser';

export class GuildMemberFurniCountInHQMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildMemberFurniCountInHQMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildMemberFurniCountInHQMessageParser);
    }

    public userId(): number {
        return castTo(this._parser, GuildMemberFurniCountInHQMessageParser).userId;
    }

    public furniCount(): number {
        return castTo(this._parser, GuildMemberFurniCountInHQMessageParser).furniCount;
    }
}
