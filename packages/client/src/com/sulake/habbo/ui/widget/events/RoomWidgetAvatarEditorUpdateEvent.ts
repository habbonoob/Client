import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetAvatarEditorUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetAvatarEditorUpdateEvent'); }

    public static readonly _SafeStr_7609: string = "RWUE_HIDE_AVATAR_EDITOR";
    public static readonly _SafeStr_8000: string = "RWUE_AVATAR_EDITOR_CLOSED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
