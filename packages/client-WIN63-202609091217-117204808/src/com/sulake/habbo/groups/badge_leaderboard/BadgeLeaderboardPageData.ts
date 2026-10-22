import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6048 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6048';

export class BadgeLeaderboardPageData {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard::BadgeLeaderboardPageData'); }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _rarity: number;
    static { (this.prototype as any)._rarity = 0; }

    declare private _page: number;
    static { (this.prototype as any)._page = 0; }

    declare private _totalEntries: number;
    static { (this.prototype as any)._totalEntries = 0; }

    declare private _entries: any[];

    declare private _ownEntry: _SafeCls_6048;

    constructor(param1: number, param2: number, param3: number, param4: number, param5: any[], param6: _SafeCls_6048) {
        this._type = param1;
        this._rarity = param2;
        this._page = param3;
        this._totalEntries = param4;
        this._entries = param5 == null ? [] : param5.concat();
        this._ownEntry = param6;
    }

    public get type(): number {
        return this._type;
    }

    public get rarity(): number {
        return this._rarity;
    }

    public get page(): number {
        return this._page;
    }

    public get totalEntries(): number {
        return this._totalEntries;
    }

    public get entries(): any[] {
        return this._entries;
    }

    public get ownEntry(): _SafeCls_6048 {
        return this._ownEntry;
    }
}
