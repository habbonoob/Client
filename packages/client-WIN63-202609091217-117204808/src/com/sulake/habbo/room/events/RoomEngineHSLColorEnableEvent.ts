import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';

export class RoomEngineHSLColorEnableEvent extends RoomEngineEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineHSLColorEnableEvent'); }

    public static readonly ROOM_BACKGROUND_COLOR: string = "ROHSLCEE_ROOM_BACKGROUND_COLOR";

    declare private _enable: boolean;
    static { (this.prototype as any)._enable = false; }

    declare private _hue: number;
    static { (this.prototype as any)._hue = 0; }

    declare private _saturation: number;
    static { (this.prototype as any)._saturation = 0; }

    declare private _lightness: number;
    static { (this.prototype as any)._lightness = 0; }

    constructor(param1: string, param2: number, param3: boolean, param4: number, param5: number, param6: number, param7: boolean = false, param8: boolean = false) {
        super(param1, param2, param7, param8);
        this._enable = param3;
        this._hue = param4;
        this._saturation = param5;
        this._lightness = param6;
    }

    public get enable(): boolean {
        return this._enable;
    }

    public get hue(): number {
        return this._hue;
    }

    public get saturation(): number {
        return this._saturation;
    }

    public get lightness(): number {
        return this._lightness;
    }
}
