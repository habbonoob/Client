import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GuildEditData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildEditInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildEditInfoMessageParser';

export class GuildEditInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildEditInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildEditInfoMessageParser);
    }

    public get data(): GuildEditData {
        return castTo(this._parser, GuildEditInfoMessageParser).data;
    }
}
