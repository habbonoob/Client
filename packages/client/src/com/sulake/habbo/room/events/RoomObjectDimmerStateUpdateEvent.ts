import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectDimmerStateUpdateEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectDimmerStateUpdateEvent'); }

    public static readonly _SafeStr_7397: string = "RODSUE_DIMMER_STATE";

    constructor(param1: IRoomObject, param2: number, param3: number, param4: number, param5: number, param6: number, param7: boolean = false, param8: boolean = false) {
        super("RODSUE_DIMMER_STATE", param1, param7, param8);
        this._state = param2;
        this._presetId = param3;
        this._effectId = param4;
        this._color = param5;
        this._brightness = param6;
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _presetId: number;
    static { (this.prototype as any)._presetId = 0; }

    declare private _effectId: number;
    static { (this.prototype as any)._effectId = 0; }

    declare private _brightness: number;
    static { (this.prototype as any)._brightness = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    public get state(): number {
        return this._state;
    }

    public get presetId(): number {
        return this._presetId;
    }

    public get effectId(): number {
        return this._effectId;
    }

    public get brightness(): number {
        return this._brightness >>> 0;
    }
}
