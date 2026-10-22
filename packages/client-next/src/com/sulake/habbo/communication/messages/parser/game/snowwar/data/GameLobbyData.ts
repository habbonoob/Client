import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';

export class GameLobbyData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::GameLobbyData'); }

    declare private _SafeStr_6173: number;
    static { (this.prototype as any)._SafeStr_6173 = 0; }

    declare private _levelName: string;

    declare private _gameType: number;
    static { (this.prototype as any)._gameType = 0; }

    declare private _fieldType: number;
    static { (this.prototype as any)._fieldType = 0; }

    declare private _numberOfTeams: number;
    static { (this.prototype as any)._numberOfTeams = 0; }

    declare private _SafeStr_7009: number;
    static { (this.prototype as any)._SafeStr_7009 = 0; }

    declare private _SafeStr_7022: string;

    declare private _SafeStr_6563: number;
    static { (this.prototype as any)._SafeStr_6563 = 0; }

    declare private _players: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._players = [];
        this._SafeStr_6173 = param1.readInteger();
        this._levelName = param1.readString();
        this._gameType = param1.readInteger();
        this._fieldType = param1.readInteger();
        this._numberOfTeams = param1.readInteger();
        this._SafeStr_7009 = param1.readInteger();
        this._SafeStr_7022 = param1.readString();
        this._SafeStr_6563 = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._players.push(new GameLobbyPlayerData(param1));
            _loc3_++;
        }
    }

    public get gameId(): number {
        return this._SafeStr_6173;
    }

    public get gameType(): number {
        return this._gameType;
    }

    public get fieldType(): number {
        return this._fieldType;
    }

    public get numberOfTeams(): number {
        return this._numberOfTeams;
    }

    public get maximumPlayers(): number {
        return this._SafeStr_7009;
    }

    public get owningPlayerName(): string {
        return this._SafeStr_7022;
    }

    public get levelEntryId(): number {
        return this._SafeStr_6563;
    }

    public get players(): any[] {
        return this._players;
    }
}
