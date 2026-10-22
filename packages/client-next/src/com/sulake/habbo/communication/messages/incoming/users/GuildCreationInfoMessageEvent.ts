import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GuildCreationData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildCreationData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildCreationInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildCreationInfoMessageParser';

export class GuildCreationInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildCreationInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildCreationInfoMessageParser);
    }

    public get data(): GuildCreationData {
        return castTo(this._parser, GuildCreationInfoMessageParser).data;
    }
}
