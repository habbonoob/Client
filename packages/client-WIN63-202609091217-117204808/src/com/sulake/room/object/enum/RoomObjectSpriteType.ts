import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectSpriteType {
    static { registerClassName(this, 'com.sulake.room.object.enum::RoomObjectSpriteType'); }

    public static DEFAULT: number = 1;
    public static ROOM_PLANE: number = 2;
    public static AVATAR: number = 3;
    public static _SafeStr_7153: number = 4;

    constructor() {
    }
}
