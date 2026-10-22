import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetNavigateToRoomMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetNavigateToRoomMessage'); }

    public static readonly WIDGET_MESSAGE_NAVIGATE_TO_ROOM: string = "RWGOI_MESSAGE_NAVIGATE_TO_ROOM";
    public static readonly WIDGET_MESSAGE_NAVIGATE_HOME: string = "RWGOI_MESSAGE_NAVIGATE_HOME";

    constructor(param1: string, param2: number = -1) {
        super(param1);
        this._roomId = param2;
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    public get roomId(): number {
        return this._roomId;
    }
}
