import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildEditFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildEditFailedMessageParser';

export class GuildEditFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildEditFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildEditFailedMessageParser);
    }

    public get reason(): number {
        return castTo(this._parser, GuildEditFailedMessageParser).reason;
    }
}
