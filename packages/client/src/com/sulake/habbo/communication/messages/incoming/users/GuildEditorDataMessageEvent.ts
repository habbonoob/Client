import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { GuildEditorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditorData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildEditorDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/GuildEditorDataMessageParser';

export class GuildEditorDataMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildEditorDataMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildEditorDataMessageParser);
    }

    public get data(): GuildEditorData {
        return castTo(this._parser, GuildEditorDataMessageParser).data;
    }
}
