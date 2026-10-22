import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetMeMenuMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetMeMenuMessage'); }

    public static readonly _SafeStr_7597: string = "RWMMM_MESSAGE_ME_MENU_OPENED";

    constructor(param1: string) {
        super(param1);
    }
}
