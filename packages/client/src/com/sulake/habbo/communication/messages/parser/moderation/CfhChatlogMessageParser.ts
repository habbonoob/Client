import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CfhChatlogData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/CfhChatlogData';

export class CfhChatlogMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::CfhChatlogMessageParser'); }

    constructor() {
    }

    declare private _data: CfhChatlogData;

    public get data(): CfhChatlogData {
        return this._data;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new CfhChatlogData(param1);
        return true;
    }
}
