import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPropertyUpdateEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPropertyUpdateEvent'); }

    public static readonly ALLOW_PETS: string = "RSDUE_ALLOW_PETS";

    constructor(param1: string, param2: IRoomSession, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
