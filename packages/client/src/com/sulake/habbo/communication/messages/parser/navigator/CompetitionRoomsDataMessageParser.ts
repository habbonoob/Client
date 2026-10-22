import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CompetitionRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CompetitionRoomsData';

export class CompetitionRoomsDataMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::CompetitionRoomsDataMessageParser'); }

    constructor() {
    }

    declare private _data: CompetitionRoomsData;

    public get data(): CompetitionRoomsData {
        return this._data;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new CompetitionRoomsData(param1);
        return true;
    }
}
