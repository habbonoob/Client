import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineZoomEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineZoomEvent'); }

    public static readonly ROOM_ZOOM: string = "REE_ROOM_ZOOM";

    constructor(param1: number, param2: number, param3: any = false, param4: boolean = false, param5: boolean = false) {
        super("REE_ROOM_ZOOM", param1, param4, param5);
        this._level = param2;
        this._isFlipForced = param3;
    }

    private _level: number = 1;
    private _isFlipForced: boolean = false;

    public get level(): number {
        return this._level;
    }

    public get isFlipForced(): boolean {
        return this._isFlipForced;
    }
}
