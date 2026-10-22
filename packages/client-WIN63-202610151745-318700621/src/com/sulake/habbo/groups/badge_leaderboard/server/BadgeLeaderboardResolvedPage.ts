import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BadgeLeaderboardPageData } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardPageData';

export class BadgeLeaderboardResolvedPage {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard.server::BadgeLeaderboardResolvedPage'); }

    declare public data: BadgeLeaderboardPageData;

    declare public chunkIndex: number;
    static { (this.prototype as any).chunkIndex = 0; }

    declare public chunkSyncTime: number;
    static { (this.prototype as any).chunkSyncTime = 0; }

    declare public isStale: boolean;
    static { (this.prototype as any).isStale = false; }

    constructor(param1: BadgeLeaderboardPageData, param2: number, param3: number, param4: boolean) {
        this.data = param1;
        this.chunkIndex = param2;
        this.chunkSyncTime = param3;
        this.isStale = param4;
    }
}
