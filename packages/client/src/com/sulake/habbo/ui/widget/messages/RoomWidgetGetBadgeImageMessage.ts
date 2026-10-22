import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetGetBadgeImageMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetGetBadgeImageMessage'); }

    public static readonly WIDGET_MESSAGE_GET_BADGE_IMAGE: string = "RWGOI_MESSAGE_GET_BADGE_IMAGE";

    constructor(param1: string) {
        super("RWGOI_MESSAGE_GET_BADGE_IMAGE");
        this._badgeId = param1;
    }

    private _badgeId: string = "";

    public get badgeId(): string {
        return this._badgeId;
    }
}
