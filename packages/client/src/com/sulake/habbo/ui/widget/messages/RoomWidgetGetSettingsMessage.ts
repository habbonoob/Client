import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetSettingsMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetGetSettingsMessage'); }

    public static readonly GET_SETTINGS: string = "RWGSM_GET_SETTINGS";

    constructor(param1: string) {
        super(param1);
    }
}
