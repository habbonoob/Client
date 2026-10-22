import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6060 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6060';

export class BadgeLeaderboardDataServerChunk {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard.server::BadgeLeaderboardDataServerChunk'); }

    declare public chunkIndex: number;
    static { (this.prototype as any).chunkIndex = 0; }

    declare public totalEntries: number;
    static { (this.prototype as any).totalEntries = 0; }

    declare public entries: any[];

    declare public ownEntry: _SafeCls_6060;

    declare public lastSynchronizedAt: number;
    static { (this.prototype as any).lastSynchronizedAt = 0; }

    constructor(param1: number, param2: number, param3: any[], param4: _SafeCls_6060, param5: number) {
        this.chunkIndex = param1;
        this.totalEntries = param2;
        this.entries = param3 == null ? [] : param3;
        this.ownEntry = param4;
        this.lastSynchronizedAt = param5;
    }
}
