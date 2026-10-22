import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { Game2GetWeeklyLeaderboardComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/score/Game2GetWeeklyLeaderboardComposer';
import { TotalLeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/TotalLeaderboardTable';

export class WeeklyTotalLeaderboardTable extends TotalLeaderboardTable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.leaderboard::WeeklyTotalLeaderboardTable'); }

    private _offset: number = 0;
    private _maxOffset: number = 0;

    constructor(param1: SnowWarEngine) {
        super(param1);
    }

    public get offset(): number {
        return this._offset;
    }

    public set offset(param1: number) {
        if (param1 >= 0 && param1 <= this._maxOffset) {
            this._offset = param1;
        }
    }

    public get maxOffset(): number {
        return this._maxOffset;
    }

    public set maxOffset(param1: number) {
        this._maxOffset = param1;
    }

    protected override getMessageComposer(param1: number, param2: number, param3: number): IMessageComposer {
        return new Game2GetWeeklyLeaderboardComposer(param1, this._offset, param2, param3, this._viewSize, this._SafeStr_3110);
    }
}
