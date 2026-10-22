import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';

export class RoomObjectPlaySoundIdEvent extends RoomObjectFurnitureActionEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectPlaySoundIdEvent'); }

    public static readonly PLAY_SOUND: string = "ROPSIE_PLAY_SOUND";
    public static readonly PLAY_SOUND_AT_PITCH: string = "ROPSIE_PLAY_SOUND_AT_PITCH";

    constructor(param1: string, param2: IRoomObject, param3: string, param4: number = 1, param5: boolean = false, param6: boolean = false) {
        super(param1, param2, param5, param6);
        this._soundId = param3;
        this._pitch = param4;
    }

    declare private _soundId: string;

    declare private _pitch: number;
    static { (this.prototype as any)._pitch = NaN; }

    public get soundId(): string {
        return this._soundId;
    }

    public get pitch(): number {
        return this._pitch;
    }
}
