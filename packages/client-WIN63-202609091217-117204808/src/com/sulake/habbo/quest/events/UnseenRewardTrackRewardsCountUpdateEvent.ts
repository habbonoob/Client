import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class UnseenRewardTrackRewardsCountUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.quest.events::UnseenRewardTrackRewardsCountUpdateEvent'); }

    public static readonly TYPE: string = "qe_urtrcue";

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    constructor(param1: number, param2: boolean = false, param3: boolean = false) {
        super("qe_urtrcue", param2, param3);
        this._count = param1;
    }

    public get count(): number {
        return this._count;
    }
}
