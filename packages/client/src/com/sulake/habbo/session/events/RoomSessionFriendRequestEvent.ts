import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionFriendRequestEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionFriendRequestEvent'); }

    public static readonly FRIEND_REQUEST: string = "RSFRE_FRIEND_REQUEST";

    constructor(param1: IRoomSession, param2: number, param3: number, param4: string, param5: boolean = false, param6: boolean = false) {
        super("RSFRE_FRIEND_REQUEST", param1, param5, param6);
        this._requestId = param2;
        this._userId = param3;
        this._userName = param4;
    }

    private _requestId: number = 0;
    private _userId: number = 0;

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get requestId(): number {
        return this._requestId;
    }

    public get userId(): number {
        return this._userId;
    }
}
