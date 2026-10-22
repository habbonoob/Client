import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CommunityGoalHallOfFame } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalHallOfFame';

export class CommunityGoalHallOfFameMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::CommunityGoalHallOfFameMessageParser'); }

    constructor() {
    }

    declare private _data: CommunityGoalHallOfFame;

    public get data(): CommunityGoalHallOfFame {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new CommunityGoalHallOfFame(param1);
        return true;
    }
}
