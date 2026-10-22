import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetLoadingBarUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetLoadingBarUpdateEvent'); }

    public static readonly SHOW: string = "RWLBUE_SHOW_LOADING_BAR";
    public static readonly HIDE: string = "RWLBUW_HIDE_LOADING_BAR";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
