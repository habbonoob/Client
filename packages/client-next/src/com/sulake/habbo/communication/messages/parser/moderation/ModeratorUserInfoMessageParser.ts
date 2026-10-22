import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ModeratorUserInfoData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorUserInfoData';

export class ModeratorUserInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::ModeratorUserInfoMessageParser'); }

    declare private _data: ModeratorUserInfoData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new ModeratorUserInfoData(param1);
        return true;
    }

    public get data(): ModeratorUserInfoData {
        return this._data;
    }
}
