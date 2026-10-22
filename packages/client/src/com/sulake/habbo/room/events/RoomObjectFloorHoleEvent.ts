import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectFloorHoleEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectFloorHoleEvent'); }

    public static readonly ADD_HOLE: string = "ROFHO_ADD_HOLE";
    public static readonly REMOVE_HOLE: string = "ROFHO_REMOVE_HOLE";

    constructor(param1: string, param2: IRoomObject, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
