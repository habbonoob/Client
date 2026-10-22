import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetTutorialEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetTutorialEvent'); }

    public static readonly _SafeStr_7543: string = "HHTPNUFWE_AE_STARTED";
    public static readonly _SafeStr_8395: string = "HHTPNUFWE_AE_HIGHLIGHT";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
