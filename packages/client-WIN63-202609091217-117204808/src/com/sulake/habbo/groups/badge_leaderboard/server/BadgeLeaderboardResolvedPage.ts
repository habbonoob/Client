import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BadgeLeaderboardPageData } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardPageData';

export class BadgeLeaderboardResolvedPage {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard.server::BadgeLeaderboardResolvedPage'); }

    declare public data: BadgeLeaderboardPageData;

    declare public _SafeStr_14265: number;
    static { (this.prototype as any)._SafeStr_14265 = 0; }

    declare public chunkSyncTime: number;
    static { (this.prototype as any).chunkSyncTime = 0; }

    declare public isStale: boolean;
    static { (this.prototype as any).isStale = false; }

    constructor(param1: BadgeLeaderboardPageData, param2: number, param3: number, param4: boolean) {
        this.data = param1;
        this._SafeStr_14265 = param2;
        this.chunkSyncTime = param3;
        this.isStale = param4;
    }
}
