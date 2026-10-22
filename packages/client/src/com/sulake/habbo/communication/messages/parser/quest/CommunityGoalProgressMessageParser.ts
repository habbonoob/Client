import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CommunityGoalData } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalData';

export class CommunityGoalProgressMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::CommunityGoalProgressMessageParser'); }

    constructor() {
    }

    declare private _data: CommunityGoalData;

    public get data(): CommunityGoalData {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new CommunityGoalData(param1);
        return true;
    }
}
