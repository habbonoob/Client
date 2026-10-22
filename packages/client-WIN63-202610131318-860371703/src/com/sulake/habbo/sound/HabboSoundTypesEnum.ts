import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboSoundTypesEnum {
    static { registerClassName(this, 'com.sulake.habbo.sound::HabboSoundTypesEnum'); }

    public static readonly SOUND_CALL_FOR_HELP: string = "HBST_call_for_help";
    public static readonly SOUND_CREDIT_BALANCE: string = "HBST_purchase";
    public static readonly SOUND_DUCKET_BALANCE: string = "HBST_pixels";
    public static readonly SOUND_MESSAGE_SENT: string = "HBST_message_sent";
    public static readonly SOUND_MESSAGE_RECEIVED: string = "HBST_message_received";
    public static readonly SOUND_GUIDE_INVITATION: string = "HBST_guide_invitation";
    public static readonly SOUND_GUIDE_REQUEST: string = "HBST_guide_request";
    public static readonly SOUND_RESPECT: string = "HBST_respect";
    public static readonly GAMES_SW_GET_SNOWBALL: string = "HBSTG_snowwar_get_snowball";
    public static readonly GAMES_SW_HIT1: string = "HBSTG_snowwar_hit1";
    public static readonly GAMES_SW_HIT2: string = "HBSTG_snowwar_hit2";
    public static readonly GAMES_SW_HIT3: string = "HBSTG_snowwar_hit3";
    public static readonly GAMES_SW_MAKE_SNOWBALL: string = "HBSTG_snowwar_make_snowball";
    public static readonly GAMES_SW_MISS: string = "HBSTG_snowwar_miss";
    public static readonly GAMES_SW_THROW: string = "HBSTG_snowwar_throw";
    public static readonly GAMES_SW_WALK: string = "HBSTG_snowwar_walk";
    public static readonly GAMES_IG_COUNTDOWN: string = "HBSTG_ig_countdown";
    public static readonly GAMES_IG_WINNING: string = "HBSTG_ig_winning";
    public static readonly GAMES_IG_LOSING: string = "HBSTG_ig_losing";
    public static readonly FURNITURE_SOUND_CUCKOO_CLOCK: string = "FURNITURE_cuckoo_clock";
    public static readonly CAMERA_SHUTTER: string = "CAMERA_shutter";

    constructor() {
    }
}
