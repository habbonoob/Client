import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SongDiskInventoryReceivedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.sound.events::SongDiskInventoryReceivedEvent'); }

    public static readonly SONG_DISK_INVENTORY_RECEIVED: string = "SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
