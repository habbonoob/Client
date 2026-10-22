import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class WiredMenuEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.events::WiredMenuEvent'); }

    public static readonly WIRED_MENU_BUTTON_PREFERENCE_CHANGED: string = "WIRED_MENU_BUTTON_PREFERENCE_CHANGED";
    public static readonly PERMISSIONS_CHANGED: string = "WME_PERMISSIONS_CHANGED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
