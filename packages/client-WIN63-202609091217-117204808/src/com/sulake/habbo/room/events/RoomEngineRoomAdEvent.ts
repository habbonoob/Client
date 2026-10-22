import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineRoomAdEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineRoomAdEvent'); }

    public static readonly FURNI_CLICK: string = "RERAE_FURNI_CLICK";
    public static readonly FURNI_DOUBLE_CLICK: string = "RERAE_FURNI_DOUBLE_CLICK";
    public static readonly TOOLTIP_SHOW: string = "RERAE_TOOLTIP_SHOW";
    public static readonly TOOLTIP_HIDE: string = "RERAE_TOOLTIP_HIDE";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super(param1, param2, param3, param4, param5, param6);
    }
}
