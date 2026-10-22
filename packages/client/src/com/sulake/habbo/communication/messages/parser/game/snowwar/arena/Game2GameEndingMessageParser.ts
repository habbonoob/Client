import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Game2GameResult } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2GameResult';
import { Game2SnowWarGameStats } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2SnowWarGameStats';
import { Game2TeamScoreData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2TeamScoreData';

export class Game2GameEndingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2GameEndingMessageParser'); }

    constructor() {
    }

    declare private _timeToNextState: number;
    static { (this.prototype as any)._timeToNextState = 0; }

    declare private _generalStats: Game2SnowWarGameStats;

    declare private _gameResult: Game2GameResult;

    declare private _teams: any[];

    public get teams(): any[] {
        return this._teams;
    }

    declare private _teamScores: any[];

    public get teamScores(): any[] {
        return this._teamScores;
    }

    public get timeToNextState(): number {
        return this._timeToNextState;
    }

    public get gameResult(): Game2GameResult {
        return this._gameResult;
    }

    public get generalStats(): Game2SnowWarGameStats {
        return this._generalStats;
    }

    public flush(): boolean {
        this._timeToNextState = -1;
        this._teams = [];
        this._teamScores = [];
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._timeToNextState = param1.readInteger();
        this._gameResult = new Game2GameResult(param1);
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._teams.push(new Game2TeamScoreData(param1));
            _loc3_++;
        }
        this._generalStats = new Game2SnowWarGameStats(param1);
        return true;
    }
}
