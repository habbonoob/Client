import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectMoveEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectMoveEvent'); }

    public static readonly SLIDE_ANIMATION: string = "ROME_SLIDE_ANIMATION";
    public static readonly _SafeStr_8429: string = "ROME_POSITION_CHANGED";
    public static readonly _SafeStr_7855: string = "ROME_OBJECT_REMOVED";

    constructor(param1: string, param2: IRoomObject, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
