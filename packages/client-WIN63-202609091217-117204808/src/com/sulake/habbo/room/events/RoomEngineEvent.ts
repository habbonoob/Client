import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class RoomEngineEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineEvent'); }

    public static readonly ROOM_ENGINE_INITIALIZED: string = "REE_ENGINE_INITIALIZED";
    public static readonly ROOM_INITIALIZED: string = "REE_INITIALIZED";
    public static readonly ROOM_DISPOSED: string = "REE_DISPOSED";
    public static readonly ROOM_ENGINE_GAME_MODE: string = "REE_GAME_MODE";
    public static readonly ROOM_ENGINE_NORMAL_MODE: string = "REE_NORMAL_MODE";
    public static readonly ROOM_OBJECTS_INITIALIZED: string = "REE_OBJECTS_INITIALIZED";
    public static readonly ROOM_ZOOMED: string = "REE_ROOM_ZOOMED";
    public static readonly ROOM_ENTRANCE_AFTER_SPECTATE: string = "REE_ENTRANCE_AFTER_SPECTATE";

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._roomId = param2;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
