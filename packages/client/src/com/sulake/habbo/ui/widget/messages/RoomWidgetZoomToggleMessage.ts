import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetZoomToggleMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetZoomToggleMessage'); }

    public static readonly _SafeStr_7460: string = "RWZTM_ZOOM_TOGGLE";

    constructor() {
        super("RWZTM_ZOOM_TOGGLE");
    }
}
