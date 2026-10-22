import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ScrKickbackData } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrKickbackData';

export class ScrSendKickbackInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::ScrSendKickbackInfoMessageParser'); }

    constructor() {
    }

    declare private _data: ScrKickbackData;

    public get data(): ScrKickbackData {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new ScrKickbackData(param1);
        return true;
    }
}
