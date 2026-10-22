import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetScriptProceedMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetScriptProceedMessage'); }

    public static readonly ANSWER: string = "RWPM_ANSWER";

    constructor(param1: string) {
        super(param1);
    }
}
