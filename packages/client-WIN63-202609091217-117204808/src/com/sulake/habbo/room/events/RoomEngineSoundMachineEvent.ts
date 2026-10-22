import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';

export class RoomEngineSoundMachineEvent extends RoomEngineObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomEngineSoundMachineEvent'); }

    public static readonly SOUND_MACHINE_INIT: string = "ROSM_SOUND_MACHINE_INIT";
    public static readonly SOUND_MACHINE_SWITCHED_ON: string = "ROSM_SOUND_MACHINE_SWITCHED_ON";
    public static readonly SOUND_MACHINE_SWITCHED_OFF: string = "ROSM_SOUND_MACHINE_SWITCHED_OFF";
    public static readonly SOUND_MACHINE_DISPOSE: string = "ROSM_SOUND_MACHINE_DISPOSE";
    public static readonly JUKEBOX_INIT: string = "ROSM_JUKEBOX_INIT";
    public static readonly _SafeStr_8443: string = "ROSM_JUKEBOX_SWITCHED_ON";
    public static readonly _SafeStr_8777: string = "ROSM_JUKEBOX_SWITCHED_OFF";
    public static readonly _SafeStr_7489: string = "ROSM_JUKEBOX_DISPOSE";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super(param1, param2, param3, param4, param5, param6);
    }
}
