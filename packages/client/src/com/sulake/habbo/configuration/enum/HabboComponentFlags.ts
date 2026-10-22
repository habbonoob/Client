import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboComponentFlags {
    static { registerClassName(this, 'com.sulake.habbo.configuration.enum::HabboComponentFlags'); }

    public static readonly ROOM_VIEWER_MODE: number = 1;

    public static isRoomViewerMode(flags: number): boolean {
        return (flags & HabboComponentFlags.ROOM_VIEWER_MODE) != 0;
    }
}
