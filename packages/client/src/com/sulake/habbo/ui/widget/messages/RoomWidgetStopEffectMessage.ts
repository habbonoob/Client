import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetStopEffectMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetStopEffectMessage'); }

    public static readonly _SafeStr_8230: string = "RWGOI_MESSAGE_STOP_EFFECT";

    constructor() {
        super("RWGOI_MESSAGE_STOP_EFFECT");
    }
}
