import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { LeaderboardEntry } from '@/com/sulake/habbo/communication/messages/parser/game/score/LeaderboardEntry';

export class Game2LeaderboardParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.score::Game2LeaderboardParser'); }

    constructor() {
    }

    declare private _gameTypeId: number;
    static { (this.prototype as any)._gameTypeId = 0; }

    declare private _leaderboard: any[];

    declare private _totalListSize: number;
    static { (this.prototype as any)._totalListSize = 0; }

    public get gameTypeId(): number {
        return this._gameTypeId;
    }

    public get leaderboard(): any[] {
        return this._leaderboard;
    }

    public get totalListSize(): number {
        return this._totalListSize;
    }

    public flush(): boolean {
        this._gameTypeId = -1;
        this._leaderboard = null;
        this._totalListSize = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._leaderboard = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._leaderboard.push(new LeaderboardEntry(param1));
            _loc3_++;
        }
        this._totalListSize = param1.readInteger();
        this._gameTypeId = param1.readInteger();
        return true;
    }
}
