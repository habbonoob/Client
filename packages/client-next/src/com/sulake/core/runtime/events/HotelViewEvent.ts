import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HotelViewEvent extends Event {
    static { registerClassName(this, 'com.sulake.core.runtime.events::HotelViewEvent'); }

    public static readonly HOTEL_VIEW_READY: string = "HOTEL_VIEW_READY";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
