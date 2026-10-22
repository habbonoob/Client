import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { UserChatlogData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/UserChatlogData';

export class UserChatlogMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::UserChatlogMessageParser'); }

    declare private _data: UserChatlogData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new UserChatlogData(param1);
        return true;
    }

    public get data(): UserChatlogData {
        return this._data;
    }
}
