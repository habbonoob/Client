import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectCategoryEnum {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomObjectCategoryEnum'); }

    public static readonly _SafeStr_7690: number = -2;
    public static readonly OBJECT_CATEGORY_ROOM: number = 0;
    public static readonly OBJECT_CATEGORY_FURNITURE: number = 10;
    public static readonly _SafeStr_8298: number = 20;
    public static readonly OBJECT_CATEGORY_USER: number = 100;
    public static readonly _SafeStr_8468: number = 200;
    public static readonly SNOWBALL: number = 201;
    public static readonly SNOW_SPLASH: number = 202;

    constructor() {
    }
}
