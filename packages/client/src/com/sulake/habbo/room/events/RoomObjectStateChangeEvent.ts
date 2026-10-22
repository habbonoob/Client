import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectStateChangeEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectStateChangeEvent'); }

    public static readonly ROOM_OBJECT_STATE_CHANGE: string = "ROSCE_STATE_CHANGE";
    public static readonly ROOM_OBJECT_STATE_RANDOM: string = "ROSCE_STATE_RANDOM";

    constructor(param1: string, param2: IRoomObject, param3: number = 0, param4: boolean = false, param5: boolean = false) {
        super(param1, param2, param4, param5);
        this._SafeStr_2147 = param3;
    }

    private _SafeStr_2147: number = 0;

    public get param(): number {
        return this._SafeStr_2147;
    }
}
