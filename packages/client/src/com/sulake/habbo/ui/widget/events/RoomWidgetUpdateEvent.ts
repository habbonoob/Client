import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomWidgetUpdateEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetUpdateEvent'); }

    public static readonly WIDGET_UPDATE_EVENT_TEST: string = "RWUE_EVENT_TEST";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
