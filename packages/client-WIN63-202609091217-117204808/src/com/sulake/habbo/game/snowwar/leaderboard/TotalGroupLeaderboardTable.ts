import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { LeaderboardEntry } from '@/com/sulake/habbo/communication/messages/parser/game/score/LeaderboardEntry';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { Game2GetTotalGroupLeaderboardComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/score/Game2GetTotalGroupLeaderboardComposer';
import { LeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/LeaderboardTable';

export class TotalGroupLeaderboardTable extends LeaderboardTable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.leaderboard::TotalGroupLeaderboardTable'); }

    declare private _ownEntry: LeaderboardEntry;

    constructor(param1: SnowWarEngine) {
        super(param1);
        this._viewSize -= 1;
    }

    public override dispose(): void {
        super.dispose();
        this._ownEntry = null;
    }

    public override addGroupEntries(param1: any[], param2: number, param3: number): void {
        if (param3 > 0) {
            this._ownEntry = param1.pop();
        }
        super.addGroupEntries(param1, param2, param3);
    }

    public override getVisibleEntries(): any[] {
        let _loc1_: any[] = super.getVisibleEntries();
        if (this._ownEntry) {
            _loc1_.push(this._ownEntry);
        }
        return _loc1_;
    }

    protected override getMessageComposer(param1: number, param2: number, param3: number): IMessageComposer {
        return new Game2GetTotalGroupLeaderboardComposer(param1, param2, param3, this._viewSize, this._SafeStr_3110);
    }
}
