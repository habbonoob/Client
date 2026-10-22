import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';

export class RoomObjectFurnitureActionEvent extends RoomObjectEvent {
    static { registerClassName(this, 'com.sulake.habbo.room.events::RoomObjectFurnitureActionEvent'); }

    public static readonly _SafeStr_8125: string = "ROFCAE_DICE_OFF";
    public static readonly _SafeStr_8342: string = "ROFCAE_DICE_ACTIVATE";
    public static readonly USE_HABBOWHEEL: string = "ROFCAE_USE_HABBOWHEEL";
    public static readonly STICKIE: string = "ROFCAE_STICKIE";
    public static readonly _SafeStr_7778: string = "ROFCAE_ENTER_ONEWAYDOOR";
    public static readonly SOUND_MACHINE_INIT: string = "ROFCAE_SOUND_MACHINE_INIT";
    public static readonly SOUND_MACHINE_START: string = "ROFCAE_SOUND_MACHINE_START";
    public static readonly SOUND_MACHINE_STOP: string = "ROFCAE_SOUND_MACHINE_STOP";
    public static readonly SOUND_MACHINE_DISPOSE: string = "ROFCAE_SOUND_MACHINE_DISPOSE";
    public static readonly JUKEBOX_INIT: string = "ROFCAE_JUKEBOX_INIT";
    public static readonly _SafeStr_8612: string = "ROFCAE_JUKEBOX_START";
    public static readonly _SafeStr_7630: string = "ROFCAE_JUKEBOX_MACHINE_STOP";
    public static readonly _SafeStr_7489: string = "ROFCAE_JUKEBOX_DISPOSE";
    public static readonly CURSOR_REQUEST_BUTTON: string = "ROFCAE_MOUSE_BUTTON";
    public static readonly CURSOR_REQUEST_ARROW: string = "ROFCAE_MOUSE_ARROW";
    public static readonly NFT_REWARD_BOX: string = "ROFCAE_NFT_REWARD_BOX";

    constructor(param1: string, param2: IRoomObject, param3: boolean = false, param4: boolean = false) {
        super(param1, param2, param3, param4);
    }
}
