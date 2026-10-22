import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Game2PlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2PlayerData';
import { GameLevelData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLevelData';

export class Game2EnterArenaMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2EnterArenaMessageParser'); }

    constructor() {
        this._players = [];
    }

    declare private _gameType: number;
    static { (this.prototype as any)._gameType = 0; }

    declare private _fieldType: number;
    static { (this.prototype as any)._fieldType = 0; }

    declare private _SafeStr_5515: GameLevelData;

    declare private _numberOfTeams: number;
    static { (this.prototype as any)._numberOfTeams = 0; }

    public get numberOfTeams(): number {
        return this._numberOfTeams;
    }

    declare private _players: any[];

    public get players(): any[] {
        return this._players;
    }

    public get gameType(): number {
        return this._gameType;
    }

    public get fieldType(): number {
        return this._fieldType;
    }

    public get gameLevel(): GameLevelData {
        return this._SafeStr_5515;
    }

    public flush(): boolean {
        this._gameType = -1;
        this._fieldType = -1;
        this._numberOfTeams = -1;
        for (const _loc1_ of this._players ?? []) {
            _loc1_.dispose();
        }
        this._players = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: Game2PlayerData = null;
        this._gameType = param1.readInteger();
        this._fieldType = param1.readInteger();
        this._numberOfTeams = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new Game2PlayerData();
            _loc4_.parse(param1);
            this._players.push(_loc4_);
            _loc3_++;
        }
        this._SafeStr_5515 = new GameLevelData(param1);
        return true;
    }
}
