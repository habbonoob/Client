import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboInventoryEffectsEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.inventory.events::HabboInventoryEffectsEvent'); }

    public static readonly _SafeStr_8610: string = "HIEE_EFFECTS_CHANGED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }

    declare private _effects: any[];
}
