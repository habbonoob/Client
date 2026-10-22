import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class Game2PlayerStatsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::Game2PlayerStatsData'); }

    constructor(param1: IMessageDataWrapper) {
        this._score = param1.readInteger();
        this._kills = param1.readInteger();
        this._deaths = param1.readInteger();
        this._snowballHits = param1.readInteger();
        this._snowballHitsTaken = param1.readInteger();
        this._snowballsThrown = param1.readInteger();
        this._snowballsCreated = param1.readInteger();
        this._snowballsFromMachine = param1.readInteger();
        this._friendlyHits = param1.readInteger();
        this._friendlyKills = param1.readInteger();
    }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _kills: number;
    static { (this.prototype as any)._kills = 0; }

    declare private _deaths: number;
    static { (this.prototype as any)._deaths = 0; }

    declare private _snowballHits: number;
    static { (this.prototype as any)._snowballHits = 0; }

    declare private _snowballHitsTaken: number;
    static { (this.prototype as any)._snowballHitsTaken = 0; }

    declare private _snowballsThrown: number;
    static { (this.prototype as any)._snowballsThrown = 0; }

    declare private _snowballsCreated: number;
    static { (this.prototype as any)._snowballsCreated = 0; }

    declare private _snowballsFromMachine: number;
    static { (this.prototype as any)._snowballsFromMachine = 0; }

    declare private _friendlyHits: number;
    static { (this.prototype as any)._friendlyHits = 0; }

    declare private _friendlyKills: number;
    static { (this.prototype as any)._friendlyKills = 0; }

    public get score(): number {
        return this._score;
    }

    public get kills(): number {
        return this._kills;
    }

    public get deaths(): number {
        return this._deaths;
    }

    public get snowballHits(): number {
        return this._snowballHits;
    }

    public get snowballHitsTaken(): number {
        return this._snowballHitsTaken;
    }

    public get snowballsThrown(): number {
        return this._snowballsThrown;
    }

    public get snowballsCreated(): number {
        return this._snowballsCreated;
    }

    public get snowballsFromMachine(): number {
        return this._snowballsFromMachine;
    }

    public get friendlyHits(): number {
        return this._friendlyHits;
    }

    public get friendlyKills(): number {
        return this._friendlyKills;
    }
}
