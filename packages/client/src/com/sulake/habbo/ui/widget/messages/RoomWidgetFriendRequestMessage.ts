import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetFriendRequestMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetFriendRequestMessage'); }

    public static readonly ACCEPT: string = "RWFRM_ACCEPT";
    public static readonly DECLINE: string = "RWFRM_DECLINE";

    constructor(param1: string, param2: number = 0) {
        super(param1);
        this._requestId = param2;
    }

    private _requestId: number = 0;

    public get requestId(): number {
        return this._requestId;
    }
}
