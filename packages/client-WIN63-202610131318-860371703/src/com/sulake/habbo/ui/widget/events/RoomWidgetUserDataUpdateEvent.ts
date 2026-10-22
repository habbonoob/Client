import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetUserDataUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetUserDataUpdateEvent'); }

    public static readonly USER_DATA_UPDATED: string = "rwudue_user_data_updated";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("rwudue_user_data_updated", param1, param2);
    }
}
