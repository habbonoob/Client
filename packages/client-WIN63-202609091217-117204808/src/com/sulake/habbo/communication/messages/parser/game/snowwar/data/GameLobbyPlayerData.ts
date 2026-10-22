import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class GameLobbyPlayerData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::GameLobbyPlayerData'); }

    static #staticsReady = false;

    public static get _SafeStr_7334(): (...args: any[]) => any {
        GameLobbyPlayerData.#initStatics();
        return GameLobbyPlayerData._SafeStr_7334;
    }
    public static set _SafeStr_7334(value: (...args: any[]) => any) {
        GameLobbyPlayerData.#initStatics();
        GameLobbyPlayerData._SafeStr_7334 = value;
    }

    public static get _SafeStr_5887(): (...args: any[]) => any {
        GameLobbyPlayerData.#initStatics();
        return GameLobbyPlayerData._SafeStr_5887;
    }
    public static set _SafeStr_5887(value: (...args: any[]) => any) {
        GameLobbyPlayerData.#initStatics();
        GameLobbyPlayerData._SafeStr_5887 = value;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _name: string;

    declare private _figure: string;

    declare private _gender: string;

    declare private _teamId: number;
    static { (this.prototype as any)._teamId = 0; }

    declare private _skillLevel: number;
    static { (this.prototype as any)._skillLevel = 0; }

    declare private _totalScore: number;
    static { (this.prototype as any)._totalScore = 0; }

    declare private _scoreToNextLevel: number;
    static { (this.prototype as any)._scoreToNextLevel = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._userId = param1.readInteger();
        this._name = param1.readString();
        this._figure = param1.readString();
        this._gender = param1.readString();
        this._teamId = param1.readInteger();
        this._skillLevel = param1.readInteger();
        this._totalScore = param1.readInteger();
        this._scoreToNextLevel = param1.readInteger();
    }

    private static comparePlayersByTotalScore(param1: GameLobbyPlayerData, param2: GameLobbyPlayerData): number {
        let _loc3_: number = param1.totalScore;
        let _loc4_: number = param2.totalScore;
        if (_loc3_ < _loc4_) {
            return 1;
        }
        if (_loc3_ == _loc4_) {
            return 0;
        }
        return -1;
    }

    private static comparePlayersBySkillLevel(param1: GameLobbyPlayerData, param2: GameLobbyPlayerData): number {
        let _loc4_: number = param1.skillLevel;
        let _loc3_: number = param2.skillLevel;
        if (_loc4_ < _loc3_) {
            return 1;
        }
        if (_loc4_ == _loc3_) {
            return 0;
        }
        return -1;
    }

    public get userId(): number {
        return this._userId;
    }

    public get name(): string {
        return this._name;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }

    public get teamId(): number {
        return this._teamId;
    }

    public get skillLevel(): number {
        return this._skillLevel;
    }

    public get totalScore(): number {
        return this._totalScore;
    }

    public get scoreToNextLevel(): number {
        return this._scoreToNextLevel;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (GameLobbyPlayerData.#staticsReady) return;
        GameLobbyPlayerData.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(GameLobbyPlayerData, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_7334", null);
        set("_SafeStr_5887", null);
        set("_SafeStr_7334", GameLobbyPlayerData.comparePlayersByTotalScore);
        set("_SafeStr_5887", GameLobbyPlayerData.comparePlayersBySkillLevel);
    }
}
