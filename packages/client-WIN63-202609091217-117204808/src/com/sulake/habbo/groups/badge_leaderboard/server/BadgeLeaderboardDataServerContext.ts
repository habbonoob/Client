import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6048 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6048';

export class BadgeLeaderboardDataServerContext {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard.server::BadgeLeaderboardDataServerContext'); }

    declare public type: number;
    static { (this.prototype as any).type = 0; }

    declare public rarity: number;
    static { (this.prototype as any).rarity = 0; }

    declare public key: string;

    public totalEntries: number = -1;

    declare public ownEntry: _SafeCls_6048;

    public _SafeStr_3664: Map<any, any> = new Dictionary();
    public inFlightChunkIndices: Map<any, any> = new Dictionary();

    constructor(param1: number, param2: number, param3: string) {
        this.type = param1;
        this.rarity = param2;
        this.key = param3;
    }
}
