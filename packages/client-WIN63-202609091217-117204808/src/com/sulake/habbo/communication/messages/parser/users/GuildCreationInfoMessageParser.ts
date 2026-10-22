import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GuildCreationData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildCreationData';

export class GuildCreationInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildCreationInfoMessageParser'); }

    declare private _data: GuildCreationData;

    constructor() {
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new GuildCreationData(param1);
        return true;
    }

    public get data(): GuildCreationData {
        return this._data;
    }
}
