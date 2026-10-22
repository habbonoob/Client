import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineObjectSamplePlaybackEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineObjectSamplePlaybackEvent'); }

    public static readonly ROOM_OBJECT_INITIALIZED: string = "REOSPE_ROOM_OBJECT_INITIALIZED";
    public static readonly ROOM_OBJECT_DISPOSED: string = "REOSPE_ROOM_OBJECT_DISPOSED";
    public static readonly PLAY_SAMPLE: string = "REOSPE_PLAY_SAMPLE";
    public static readonly CHANGE_PITCH: string = "REOSPE_CHANGE_PITCH";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: number, param6: number = 1, param7: boolean = false, param8: boolean = false) {
        super(param1, param2, param3, param4);
        this._sampleId = param5;
        this._pitch = param6;
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
