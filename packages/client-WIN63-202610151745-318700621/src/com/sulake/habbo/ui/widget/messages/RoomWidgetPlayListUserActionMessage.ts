import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetPlayListUserActionMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetPlayListUserActionMessage'); }

    public static readonly _SafeStr_7977: string = "RWPLUA_OPEN_CATALOGUE_BUTTON_PRESSED";

    constructor(param1: string) {
        super(param1);
    }
}
