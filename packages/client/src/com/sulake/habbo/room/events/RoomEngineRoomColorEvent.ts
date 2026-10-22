import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineRoomColorEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineRoomColorEvent'); }

    public static readonly ROOM_COLOR: string = "REE_ROOM_COLOR";

    constructor(param1: number, param2: number, param3: number, param4: boolean, param5: boolean = false, param6: boolean = false) {
        super("REE_ROOM_COLOR", param1, param5, param6);
        this._color = param2;
        this._brightness = param3;
        this._bgOnly = param4;
    }

    declare private _brightness: number;
    static { (this.prototype as any)._brightness = 0; }

    declare private _bgOnly: boolean;
    static { (this.prototype as any)._bgOnly = false; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    public get brightness(): number {
        return this._brightness;
    }

    public get bgOnly(): boolean {
        return this._bgOnly;
    }
}
