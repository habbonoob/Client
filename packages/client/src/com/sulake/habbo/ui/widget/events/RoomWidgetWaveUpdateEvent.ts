import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetWaveUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetWaveUpdateEvent'); }

    public static readonly _SafeStr_7890: string = "RWUE_WAVE";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("RWUE_WAVE", param1, param2);
    }
}
