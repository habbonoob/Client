import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ExtendedProfileData } from '@/com/sulake/habbo/communication/messages/incoming/users/ExtendedProfileData';

export class ExtendedProfileMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::ExtendedProfileMessageParser'); }

    declare private _data: ExtendedProfileData;

    constructor() {
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new ExtendedProfileData(param1);
        return true;
    }

    public get data(): ExtendedProfileData {
        return this._data;
    }
}
