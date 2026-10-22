import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GuestRoomSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomSearchResultData';

export class GuestRoomSearchResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::GuestRoomSearchResultMessageParser'); }

    constructor() {
    }

    declare private _data: GuestRoomSearchResultData;

    public get data(): GuestRoomSearchResultData {
        return this._data;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new GuestRoomSearchResultData(param1);
        return true;
    }
}
