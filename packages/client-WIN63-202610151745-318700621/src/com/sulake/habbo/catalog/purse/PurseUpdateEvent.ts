import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class PurseUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purse::PurseUpdateEvent'); }

    public static readonly _SafeStr_7707: string = "catalog_purse_update";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("catalog_purse_update", param1, param2);
    }
}
