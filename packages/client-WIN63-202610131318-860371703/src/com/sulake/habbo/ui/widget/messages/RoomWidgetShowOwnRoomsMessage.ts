import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetShowOwnRoomsMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetShowOwnRoomsMessage'); }

    public static readonly SHOW_OWN_ROOMS: string = "RWSORM_SHOW_OWN_ROOMS";

    constructor() {
        super("RWSORM_SHOW_OWN_ROOMS");
    }
}
