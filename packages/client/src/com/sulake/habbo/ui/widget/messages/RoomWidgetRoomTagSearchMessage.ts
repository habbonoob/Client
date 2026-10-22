import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetRoomTagSearchMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetRoomTagSearchMessage'); }

    public static readonly ROOM_TAG_SEARCH: string = "RWRTSM_ROOM_TAG_SEARCH";

    constructor(param1: string) {
        super("RWRTSM_ROOM_TAG_SEARCH");
        this._tag = param1;
    }

    private _tag: string = "";

    public get tag(): string {
        return this._tag;
    }
}
