import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomModerationData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomModerationData';

export class ModeratorRoomInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::ModeratorRoomInfoMessageParser'); }

    declare private _data: RoomModerationData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new RoomModerationData(param1);
        return true;
    }

    public get data(): RoomModerationData {
        return this._data;
    }
}
