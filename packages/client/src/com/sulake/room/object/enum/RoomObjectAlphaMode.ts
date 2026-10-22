import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectAlphaMode {
    static { registerClassName(this, 'com.sulake.room.object.enum::RoomObjectAlphaMode'); }

    public static readonly MATCH_ALL_PIXELS: number = -1;
    public static readonly MATCH_OPAQUE_PIXELS: number = 128;
    public static readonly MATCH_NOTHING: number = 256;
}
