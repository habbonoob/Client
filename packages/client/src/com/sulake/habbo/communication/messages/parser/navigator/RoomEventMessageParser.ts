import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomEventData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomEventData';

export class RoomEventMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::RoomEventMessageParser'); }

    constructor() {
    }

    declare private _data: RoomEventData;

    public get data(): RoomEventData {
        return this._data;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new RoomEventData(param1);
        return true;
    }
}
