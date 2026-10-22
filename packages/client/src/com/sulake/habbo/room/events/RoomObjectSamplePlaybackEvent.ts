import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';

export class RoomObjectSamplePlaybackEvent extends RoomObjectFurnitureActionEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectSamplePlaybackEvent'); }

    public static readonly ROOM_OBJECT_INITIALIZED: string = "ROPSPE_ROOM_OBJECT_INITIALIZED";
    public static readonly ROOM_OBJECT_DISPOSED: string = "ROPSPE_ROOM_OBJECT_DISPOSED";
    public static readonly PLAY_SAMPLE: string = "ROPSPE_PLAY_SAMPLE";
    public static readonly CHANGE_PITCH: string = "ROPSPE_CHANGE_PITCH";

    constructor(param1: string, param2: IRoomObject, param3: number, param4: number = 1, param5: boolean = false, param6: boolean = false) {
        super(param1, param2, param5, param6);
        this._sampleId = param3;
        this._pitch = param4;
    }

    declare private _sampleId: number;
    static { (this.prototype as any)._sampleId = 0; }

    declare private _pitch: number;
    static { (this.prototype as any)._pitch = NaN; }

    public get sampleId(): number {
        return this._sampleId;
    }

    public get pitch(): number {
        return this._pitch;
    }
}
