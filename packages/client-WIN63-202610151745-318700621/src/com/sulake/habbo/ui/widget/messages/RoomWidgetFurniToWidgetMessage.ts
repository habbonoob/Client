import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetFurniToWidgetMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetFurniToWidgetMessage'); }

    public static readonly WIDGET_MESSAGE_REQUEST_CREDITFURNI_WIDGET: string = "RWFWM_MESSAGE_REQUEST_CREDITFURNI";
    public static readonly WIDGET_MESSAGE_REQUEST_STICKIE_WIDGET: string = "RWFWM_MESSAGE_REQUEST_STICKIE";
    public static readonly WIDGET_MESSAGE_REQUEST_PRESENT_WIDGET: string = "RWFWM_MESSAGE_REQUEST_PRESENT";
    public static readonly WIDGET_MESSAGE_REQUEST_TROPHY_WIDGET: string = "RWFWM_MESSAGE_REQUEST_TROPHY";
    public static readonly WIDGET_MESSAGE_REQUEST_TEASER_WIDGET: string = "RWFWM_MESSAGE_REQUEST_TEASER";
    public static readonly WIDGET_MESSAGE_REQUEST_ECOTRONBOX_WIDGET: string = "RWFWM_MESSAGE_REQUEST_ECOTRONBOX";
    public static readonly WIDGET_MESSAGE_REQUEST_DIMMER_WIDGET: string = "RWFWM_MESSAGE_REQUEST_DIMMER";
    public static readonly WIDGET_MESSAGE_REQUEST_PLACEHOLDER_WIDGET: string = "RWFWM_MESSAGE_REQUEST_PLACEHOLDER";
    public static readonly WIDGET_MESSAGE_REQUEST_CLOTHING_CHANGE_WIDGET: string = "RWFWM_MESSAGE_REQUEST_CLOTHING_CHANGE";
    public static readonly WIDGET_MESSAGE_REQUEST_PLAYLIST_EDITOR_WIDGET: string = "RWFWM_MESSAGE_REQUEST_PLAYLIST_EDITOR";
    public static readonly WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING: string = "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING";
    public static readonly _SafeStr_7923: string = "RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED";
    public static readonly WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING: string = "RWFWM_WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING";
    private _id: number = 0;
    private _category: number = 0;
    private _roomId: number = 0;

    constructor(param1: string, param2: number, param3: number, param4: number) {
        super(param1);
        this._id = param2;
        this._category = param3;
        this._roomId = param4;
    }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
