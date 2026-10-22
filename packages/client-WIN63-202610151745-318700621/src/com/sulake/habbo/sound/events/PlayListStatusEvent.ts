import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class PlayListStatusEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.sound.events::PlayListStatusEvent'); }

    public static readonly PLAY_LIST_UPDATED: string = "PLUE_PLAY_LIST_UPDATED";
    public static readonly PLAY_LIST_FULL: string = "PLUE_PLAY_LIST_FULL";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
