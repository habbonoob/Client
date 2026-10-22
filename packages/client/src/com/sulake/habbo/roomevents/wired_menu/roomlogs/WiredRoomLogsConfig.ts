import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WiredRoomLogsConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.roomlogs::WiredRoomLogsConfig'); }

    public static PAGE_SIZE: number = 50;

    constructor() {
    }
}
