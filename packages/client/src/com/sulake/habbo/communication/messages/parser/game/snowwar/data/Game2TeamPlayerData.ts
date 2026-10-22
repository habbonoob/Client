import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Game2PlayerStatsData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2PlayerStatsData';

export class Game2TeamPlayerData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::Game2TeamPlayerData'); }

    constructor(param1: number, param2: IMessageDataWrapper) {
        this._teamId = param1;
        this._userName = param2.readString();
        this._userId = param2.readInteger();
        this._figure = param2.readString();
        this._gender = param2.readString();
        this._score = param2.readInteger();
        this._playerStats = new Game2PlayerStatsData(param2);
        this._willRejoin = false;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _figure: string;

    declare private _gender: string;

    declare private _playerStats: Game2PlayerStatsData;

    declare private _teamId: number;
    static { (this.prototype as any)._teamId = 0; }

    declare private _willRejoin: boolean;
    static { (this.prototype as any)._willRejoin = false; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }

    public get score(): number {
        return this._score;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }

    public get playerStats(): Game2PlayerStatsData {
        return this._playerStats;
    }

    public get teamId(): number {
        return this._teamId;
    }

    public get willRejoin(): boolean {
        return this._willRejoin;
    }

    public set willRejoin(param1: boolean) {
        this._willRejoin = param1;
    }
}
