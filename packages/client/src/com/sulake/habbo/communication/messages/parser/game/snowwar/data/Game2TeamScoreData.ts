import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Game2TeamPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2TeamPlayerData';

export class Game2TeamScoreData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::Game2TeamScoreData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._teamReference = param1.readInteger();
        this._score = param1.readInteger();
        this._players = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._players.push(new Game2TeamPlayerData(this._teamReference, param1));
            _loc3_++;
        }
    }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _teamReference: number;
    static { (this.prototype as any)._teamReference = 0; }

    declare private _players: any[];

    public get players(): any[] {
        return this._players;
    }

    public get score(): number {
        return this._score;
    }

    public get teamReference(): number {
        return this._teamReference;
    }
}
