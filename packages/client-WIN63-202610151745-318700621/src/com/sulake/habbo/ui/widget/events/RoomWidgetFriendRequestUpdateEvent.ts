import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetFriendRequestUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetFriendRequestUpdateEvent'); }

    public static readonly SHOW_FRIEND_REQUEST: string = "RWFRUE_SHOW_FRIEND_REQUEST";
    public static readonly HIDE_FRIEND_REQUEST: string = "RWFRUE_HIDE_FRIEND_REQUEST";

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    constructor(param1: string, param2: number, param3: number = 0, param4: string = null, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._requestId = param2;
        this._userId = param3;
        this._userName = param4;
    }

    public get requestId(): number {
        return this._requestId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }
}
