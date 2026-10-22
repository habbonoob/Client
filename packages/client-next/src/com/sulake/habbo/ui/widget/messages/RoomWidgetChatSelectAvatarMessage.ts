import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetChatSelectAvatarMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetChatSelectAvatarMessage'); }

    public static readonly WIDGET_MESSAGE_SELECT_AVATAR: string = "RWCSAM_MESSAGE_SELECT_AVATAR";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _userName: string;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor(param1: string, param2: number, param3: string, param4: number) {
        super(param1);
        this._objectId = param2;
        this._roomId = param4;
        this._userName = param3;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
