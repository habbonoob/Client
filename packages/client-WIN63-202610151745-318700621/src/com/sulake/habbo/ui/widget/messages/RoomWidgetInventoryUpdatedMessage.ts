import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetInventoryUpdatedMessage extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetInventoryUpdatedMessage'); }

    public static readonly INVENTORY_UPDATED: string = "RWIUM_INVENTORY_UPDATED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
