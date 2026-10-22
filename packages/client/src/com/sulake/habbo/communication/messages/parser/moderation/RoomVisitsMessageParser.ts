import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomVisitsData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomVisitsData';

export class RoomVisitsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::RoomVisitsMessageParser'); }

    constructor() {
    }

    declare private _data: RoomVisitsData;

    public get data(): RoomVisitsData {
        return this._data;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new RoomVisitsData(param1);
        return true;
    }
}
