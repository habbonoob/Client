import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetToolbarClickedUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetToolbarClickedUpdateEvent'); }

    public static readonly REQUEST_ME_MENU_TOOLBAR_CLICKED_EVENT: string = "RWUE_REQUEST_ME_MENU_TOOLBAR_CLICKED";
    public static readonly ICON_TYPE_ME_MENU: string = "ICON_TYPE_ME_MENU";
    public static readonly ICON_TYPE_ROOM_INFO: string = "ICON_TYPE_ROOM_INFO";

    constructor(param1: string, param2: boolean = false, param3: boolean = false, param4: boolean = false) {
        super("RWUE_REQUEST_ME_MENU_TOOLBAR_CLICKED", param3, param4);
        this._iconType = param1;
        this._active = param2;
    }

    declare private _iconType: string;

    private _active: boolean = false;

    public get active(): boolean {
        return this._active;
    }

    public get iconType(): string {
        return this._iconType;
    }
}
