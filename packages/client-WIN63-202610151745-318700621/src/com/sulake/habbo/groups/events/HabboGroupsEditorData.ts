import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class HabboGroupsEditorData extends Event {
    static { registerClassName(this, 'com.sulake.habbo.groups.events::HabboGroupsEditorData'); }

    public static readonly EDIT_INFO: string = "HGE_EDIT_INFO";

    constructor(param1: boolean = false, param2: boolean = false) {
        super("HGE_EDIT_INFO", param1, param2);
    }
}
