import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineDimmerStateEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineDimmerStateEvent'); }

    public static readonly _SafeStr_7397: string = "REDSE_ROOM_COLOR";

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: boolean = false, param9: boolean = false) {
        super("REDSE_ROOM_COLOR", param1, param8, param9);
        this._objectId = param2;
        this._state = param3;
        this._presetId = param4;
        this._effectId = param5;
        this._color = param6;
        this._brightness = param7 | 0;
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _presetId: number;
    static { (this.prototype as any)._presetId = 0; }

    declare private _effectId: number;
    static { (this.prototype as any)._effectId = 0; }

    declare private _brightness: number;
    static { (this.prototype as any)._brightness = 0; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

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

    public get objectId(): number {
        return this._objectId;
    }
}
