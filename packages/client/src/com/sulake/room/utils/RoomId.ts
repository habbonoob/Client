import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomId {
    static { registerClassName(this, 'com.sulake.room.utils::RoomId'); }

    private static readonly PREVIEW_ROOM_ID_BASE: number = 2147418112;

    public static makeRoomPreviewerId(param1: number): number {
        return (param1 & 0xFFFF) + 2147418112;
    }

    public static isRoomPreviewerId(param1: number): boolean {
        return param1 >= 2147418112;
    }

    constructor() {
    }
}
