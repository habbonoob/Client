import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionUserDataUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionUserDataUpdateEvent'); }

    public static readonly USER_DATA_UPDATED: string = "rsudue_user_data_updated";

    declare private _addedUsers: IUserData[];

    constructor(param1: IRoomSession, param2: IUserData[], param3: boolean = false, param4: boolean = false) {
        super("rsudue_user_data_updated", param1, param3, param4);
        this._addedUsers = param2;
    }

    public get addedUsers(): IUserData[] {
        return this._addedUsers;
    }
}
