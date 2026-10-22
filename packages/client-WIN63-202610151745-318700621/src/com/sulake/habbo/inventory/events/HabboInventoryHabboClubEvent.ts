import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboInventoryHabboClubEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.inventory.events::HabboInventoryHabboClubEvent'); }

    public static readonly _SafeStr_8502: string = "HIHCE_HABBO_CLUB_CHANGED";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("HIHCE_HABBO_CLUB_CHANGED", param1, param2);
    }
}
