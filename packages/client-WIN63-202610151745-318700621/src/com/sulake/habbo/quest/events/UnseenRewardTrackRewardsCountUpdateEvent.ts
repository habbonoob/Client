import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class UnseenRewardTrackRewardsCountUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.quest.events::UnseenRewardTrackRewardsCountUpdateEvent'); }

    public static readonly TYPE: string = "qe_urtrcue";

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    declare private _SafeStr_15000: UtilsMap;

    constructor(param1: number, param2: UtilsMap, param3: boolean = false, param4: boolean = false) {
        super("qe_urtrcue", param3, param4);
        this._count = param1;
        this._SafeStr_15000 = param2;
    }

    public get count(): number {
        return this._count;
    }

    public get trackCounts(): UtilsMap {
        return this._SafeStr_15000;
    }
}
