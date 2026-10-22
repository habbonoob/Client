import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetRoomQueueMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetRoomQueueMessage'); }

    public static readonly _SafeStr_8703: string = "RWRQM_EXIT_QUEUE";
    public static readonly CHANGE_TO_VISITOR_QUEUE: string = "RWRQM_CHANGE_TO_VISITOR_QUEUE";
    public static readonly CHANGE_TO_SPECTATOR_QUEUE: string = "RWRQM_CHANGE_TO_SPECTATOR_QUEUE";
    public static readonly _SafeStr_8726: string = "RWRQM_CLUB_LINK";

    constructor(param1: string) {
        super(param1);
    }
}
