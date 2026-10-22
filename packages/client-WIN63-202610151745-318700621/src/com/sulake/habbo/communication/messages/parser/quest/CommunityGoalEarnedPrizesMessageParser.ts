import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PrizeData } from '@/com/sulake/habbo/communication/messages/incoming/quest/PrizeData';

export class CommunityGoalEarnedPrizesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::CommunityGoalEarnedPrizesMessageParser'); }

    declare private _prizes: any[];

    constructor() {
    }

    public flush(): boolean {
        this._prizes = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._prizes.push(new PrizeData(param1));
            _loc3_++;
        }
        return true;
    }

    public get prizes(): any[] {
        return this._prizes;
    }
}
