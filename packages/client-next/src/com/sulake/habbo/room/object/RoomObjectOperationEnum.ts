import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectOperationEnum {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomObjectOperationEnum'); }

    public static readonly OBJECT_UNDEFINED: string = "OBJECT_UNDEFINED";
    public static readonly OBJECT_MOVE: string = "OBJECT_MOVE";
    public static readonly OBJECT_PLACE: string = "OBJECT_PLACE";
    public static readonly OBJECT_ROTATE_POSITIVE: string = "OBJECT_ROTATE_POSITIVE";
    public static readonly OBJECT_ROTATE_NEGATIVE: string = "OBJECT_ROTATE_NEGATIVE";
    public static readonly OBJECT_MOVE_TO: string = "OBJECT_MOVE_TO";
    public static readonly OBJECT_PLACE_TO: string = "OBJECT_PLACE_TO";
    public static readonly OBJECT_PICKUP: string = "OBJECT_PICKUP";
    public static readonly OBJECT_PICKUP_BOT: string = "OBJECT_PICKUP_BOT";
    public static readonly OBJECT_PICKUP_PET: string = "OBJECT_PICKUP_PET";
    public static readonly OBJECT_EJECT: string = "OBJECT_EJECT";
    public static readonly OBJECT_SAVE_STUFF_DATA: string = "OBJECT_SAVE_STUFF_DATA";

    constructor() {
    }
}
