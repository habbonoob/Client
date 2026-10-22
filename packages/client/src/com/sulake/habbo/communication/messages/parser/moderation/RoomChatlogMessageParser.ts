import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ChatRecordData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ChatRecordData';

export class RoomChatlogMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::RoomChatlogMessageParser'); }

    constructor() {
    }

    declare private _data: ChatRecordData;

    public get data(): ChatRecordData {
        return this._data;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new ChatRecordData(param1);
        return true;
    }
}
