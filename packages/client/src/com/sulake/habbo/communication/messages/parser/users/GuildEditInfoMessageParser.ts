import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GuildEditData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditData';

export class GuildEditInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildEditInfoMessageParser'); }

    constructor() {
    }

    declare private _data: GuildEditData;

    public get data(): GuildEditData {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new GuildEditData(param1);
        return true;
    }
}
