import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PopularRoomTagsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularRoomTagsData';

export class PopularRoomTagsResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::PopularRoomTagsResultMessageParser'); }

    declare private _data: PopularRoomTagsData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new PopularRoomTagsData(param1);
        return true;
    }

    public get data(): PopularRoomTagsData {
        return this._data;
    }
}
