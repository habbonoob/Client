import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineObjectPlaySoundEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineObjectPlaySoundEvent'); }

    public static readonly PLAY_SOUND: string = "REPSE_PLAY_SOUND";
    public static readonly PLAY_SOUND_AT_PITCH: string = "REPSE_PLAY_SOUND_AT_PITCH";

    declare private _soundId: string;

    declare private _pitch: number;
    static { (this.prototype as any)._pitch = NaN; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: string, param6: number = 1, param7: boolean = false, param8: boolean = false) {
        super(param1, param2, param3, param4);
        this._soundId = param5;
        this._pitch = param6;
    }

    public get soundId(): string {
        return this._soundId;
    }

    public get pitch(): number {
        return this._pitch;
    }
}
