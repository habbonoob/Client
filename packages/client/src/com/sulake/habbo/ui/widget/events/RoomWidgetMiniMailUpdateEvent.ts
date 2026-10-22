import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetMiniMailUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetMiniMailUpdateEvent'); }

    public static readonly NEW_MESSAGE_NOTIFICATION: string = "RWMMUE_new_mini_mail";
    public static readonly _SafeStr_8100: string = "RWMMUE_unread_mini_mail";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
