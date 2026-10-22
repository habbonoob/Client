import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomVariableEnum {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomVariableEnum'); }

    public static readonly ROOM_MIN_X: string = "room_min_x";
    public static readonly ROOM_MAX_X: string = "room_max_x";
    public static readonly ROOM_MIN_Y: string = "room_min_y";
    public static readonly ROOM_MAX_Y: string = "room_max_y";
    public static readonly ROOM_IS_PUBLIC: string = "room_is_public";
    public static readonly ROOM_Z_SCALE: string = "room_z_scale";
    public static readonly AD_DISPLAY_DELAY_MILLIS: string = "ad_display_delay";
    public static readonly IS_PLAYING_GAME: string = "is_playing_game";
    public static readonly _SafeStr_8355: string = "handitem_control_blocked";
    public static readonly CHOOSER_DISABLED: string = "chooser_disabled";
    public static readonly FREE_FURNI_MOVEMENTS_MODE: string = "free_furni_movements_mode";
    public static readonly INVISIBLE_FURNI: string = "invisible_furni";
    public static readonly CAMERA_INIT_X: string = "camera_init_x";
    public static readonly CAMERA_INIT_Y: string = "camera_init_y";
    public static readonly CAMERA_INIT_Z: string = "camera_init_z";

    constructor() {
    }
}
