import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';

export class GameLobbyData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::GameLobbyData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._players = [];
        this._gameId = param1.readInteger();
        this._levelName = param1.readString();
        this._gameType = param1.readInteger();
        this._fieldType = param1.readInteger();
        this._numberOfTeams = param1.readInteger();
        this._maximumPlayers = param1.readInteger();
        this._owningPlayerName = param1.readString();
        this._levelEntryId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._players.push(new GameLobbyPlayerData(param1));
            _loc3_++;
        }
    }

    declare private _gameId: number;
    static { (this.prototype as any)._gameId = 0; }

    declare private _levelName: string;

    declare private _gameType: number;
    static { (this.prototype as any)._gameType = 0; }

    declare private _fieldType: number;
    static { (this.prototype as any)._fieldType = 0; }

    declare private _maximumPlayers: number;
    static { (this.prototype as any)._maximumPlayers = 0; }

    declare private _owningPlayerName: string;

    declare private _levelEntryId: number;
    static { (this.prototype as any)._levelEntryId = 0; }

    declare private _numberOfTeams: number;
    static { (this.prototype as any)._numberOfTeams = 0; }

    public get numberOfTeams(): number {
        return this._numberOfTeams;
    }

    declare private _players: any[];

    public get players(): any[] {
        return this._players;
    }

    public get gameId(): number {
        return this._gameId;
    }

    public get gameType(): number {
        return this._gameType;
    }

    public get fieldType(): number {
        return this._fieldType;
    }

    public get maximumPlayers(): number {
        return this._maximumPlayers;
    }

    public get owningPlayerName(): string {
        return this._owningPlayerName;
    }

    public get levelEntryId(): number {
        return this._levelEntryId;
    }
}
