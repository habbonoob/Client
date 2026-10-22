import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Game2LeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2LeaderboardParser';

export class Game2WeeklyLeaderboardParser extends Game2LeaderboardParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.score::Game2WeeklyLeaderboardParser'); }

    declare private _year: number;
    static { (this.prototype as any)._year = 0; }

    declare private _week: number;
    static { (this.prototype as any)._week = 0; }

    declare private _maxOffset: number;
    static { (this.prototype as any)._maxOffset = 0; }

    declare private _currentOffset: number;
    static { (this.prototype as any)._currentOffset = 0; }

    declare private _minutesUntilReset: number;
    static { (this.prototype as any)._minutesUntilReset = 0; }

    constructor() {
        super();
    }

    public get year(): number {
        return this._year;
    }

    public get week(): number {
        return this._week;
    }

    public get maxOffset(): number {
        return this._maxOffset;
    }

    public get currentOffset(): number {
        return this._currentOffset;
    }

    public get minutesUntilReset(): number {
        return this._minutesUntilReset;
    }

    public override flush(): boolean {
        this._year = -1;
        this._week = -1;
        this._maxOffset = -1;
        this._currentOffset = -1;
        this._minutesUntilReset = -1;
        return super.flush();
    }

    public override parse(param1: IMessageDataWrapper): boolean {
        this._year = param1.readInteger();
        this._week = param1.readInteger();
        this._maxOffset = param1.readInteger();
        this._currentOffset = param1.readInteger();
        this._minutesUntilReset = param1.readInteger();
        return super.parse(param1);
    }
}
