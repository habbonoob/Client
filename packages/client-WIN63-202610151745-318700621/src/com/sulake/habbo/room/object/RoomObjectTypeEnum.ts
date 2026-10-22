import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomObjectTypeEnum'); }

    public static readonly OBJECT_TYPE_USER: number = 1;
    public static readonly OBJECT_TYPE_PET: number = 2;
    public static readonly _SafeStr_7810: number = 3;
    public static readonly _SafeStr_8356: number = 4;

    constructor() {
    }
}
