import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class LeaderboardEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.score::LeaderboardEntry'); }

    constructor(param1: IMessageDataWrapper) {
        this._userId = param1.readInteger();
        this._score = param1.readInteger();
        this._rank = param1.readInteger();
        this._name = param1.readString();
        this._figure = param1.readString();
        this._gender = param1.readString();
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _rank: number;
    static { (this.prototype as any)._rank = 0; }

    declare private _figure: string;

    declare private _gender: string;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get userId(): number {
        return this._userId;
    }

    public get score(): number {
        return this._score;
    }

    public get rank(): number {
        return this._rank;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }
}
