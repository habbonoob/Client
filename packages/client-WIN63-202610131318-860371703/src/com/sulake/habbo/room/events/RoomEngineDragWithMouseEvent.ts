import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineDragWithMouseEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineDragWithMouseEvent'); }

    public static readonly _SafeStr_7612: string = "REDWME_DRAG_START";
    public static readonly _SafeStr_7761: string = "REDWME_DRAG_END";

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
