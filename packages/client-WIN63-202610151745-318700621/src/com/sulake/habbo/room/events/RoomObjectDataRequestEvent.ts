import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectDataRequestEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectDataRequestEvent'); }

    public static readonly CURRENT_USER_ID: string = "RODRE_CURRENT_USER_ID";
    public static readonly URL_PREFIX: string = "RODRE_URL_PREFIX";

    constructor(param1: string, param2: IRoomObject, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
