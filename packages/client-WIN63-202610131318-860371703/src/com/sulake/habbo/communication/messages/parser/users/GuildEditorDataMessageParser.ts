import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GuildEditorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditorData';

export class GuildEditorDataMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildEditorDataMessageParser'); }

    declare private _data: GuildEditorData;

    constructor() {
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new GuildEditorData(param1);
        return true;
    }

    public get data(): GuildEditorData {
        return this._data;
    }
}
