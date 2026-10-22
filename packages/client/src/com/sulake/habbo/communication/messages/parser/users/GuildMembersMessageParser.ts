import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GuildMemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMemberData';

export class GuildMembersMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildMembersMessageParser'); }

    constructor() {
    }

    declare private _data: GuildMemberData;

    public get data(): GuildMemberData {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new GuildMemberData(param1);
        return true;
    }
}
