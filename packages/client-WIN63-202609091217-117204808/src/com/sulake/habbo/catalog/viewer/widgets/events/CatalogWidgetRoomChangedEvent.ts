import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetRoomChangedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetRoomChangedEvent'); }

    constructor(param1: boolean = false, param2: boolean = false) {
        super("CWE_ROOM_CHANGED", param1, param2);
    }
}
