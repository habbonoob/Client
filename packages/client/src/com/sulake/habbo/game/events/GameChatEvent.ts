import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class GameChatEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.game.events::GameChatEvent'); }

    public static readonly GAME_CHAT: string = "gce_game_chat";

    constructor(param1: string, param2: number, param3: string, param4: number, param5: number, param6: string, param7: string, param8: string, param9: number, param10: boolean, param11: boolean = false, param12: boolean = false) {
        super(param1, param11, param12);
        this._userId = param2;
        this._message = param3;
        this._locX = param4;
        this._color = param5;
        this._figure = param6;
        this._gender = param7;
        this._name = param8;
        this._teamId = param9;
        this._notify = param10;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _message: string;

    declare private _locX: number;
    static { (this.prototype as any)._locX = 0; }

    declare private _figure: string;

    declare private _gender: string;

    declare private _teamId: number;
    static { (this.prototype as any)._teamId = 0; }

    declare private _notify: boolean;
    static { (this.prototype as any)._notify = false; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get userId(): number {
        return this._userId;
    }

    public get message(): string {
        return this._message;
    }

    public get locX(): number {
        return this._locX;
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

    public get notify(): boolean {
        return this._notify;
    }
}
