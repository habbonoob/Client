import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class ExtensionViewEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.events::ExtensionViewEvent'); }

    public static readonly _SafeStr_7969: string = "EVE_EXTENSION_VIEW_RESIZED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
