import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomToObjectEvent extends Event {
    static { registerClassName(this, 'com.sulake.room.events::RoomToObjectEvent'); }

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
