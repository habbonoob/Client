import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomObjectEvent extends Event {
    static { registerClassName(this, 'com.sulake.room.events::RoomObjectEvent'); }

    declare private _object: IRoomObject;

    constructor(param1: string, param2: IRoomObject, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._object = param2;
    }

    public get object(): IRoomObject {
        return this._object;
    }

    public get objectId(): number {
        if (this._object != null) {
            return this._object.getId();
        }
        return -1;
    }

    public get objectType(): string {
        if (this._object != null) {
            return this._object.getType();
        }
        return null;
    }
}
