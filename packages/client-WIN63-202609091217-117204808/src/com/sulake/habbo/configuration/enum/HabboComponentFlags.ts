import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboComponentFlags {
    static { registerClassName(this, 'com.sulake.habbo.configuration.enum::HabboComponentFlags'); }

    public static readonly ROOM_VIEWER_MODE: number = 1;

    constructor() {
    }

    public static isRoomViewerMode(param1: number): boolean {
        return (param1 & 1) != 0;
    }
}
