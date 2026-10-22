import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GameRewardWinnerEntry } from '@/com/sulake/habbo/communication/messages/parser/game/score/GameRewardWinnerEntry';

export class WeeklyGameRewardWinnersParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.score::WeeklyGameRewardWinnersParser'); }

    declare private _gameTypeId: number;
    static { (this.prototype as any)._gameTypeId = 0; }

    private _winners: any[] = [];

    constructor() {
    }

    public get gameTypeId(): number {
        return this._gameTypeId;
    }

    public get winners(): any[] {
        return this._winners;
    }

    public flush(): boolean {
        this._gameTypeId = -1;
        this._winners = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._gameTypeId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._winners.push(new GameRewardWinnerEntry(param1));
            _loc3_++;
        }
        return true;
    }
}
