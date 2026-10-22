import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetEffectsMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetGetEffectsMessage'); }

    public static readonly _SafeStr_8685: string = "RWCM_MESSAGE_GET_EFFECTS";

    constructor() {
        super("RWCM_MESSAGE_GET_EFFECTS");
    }
}
