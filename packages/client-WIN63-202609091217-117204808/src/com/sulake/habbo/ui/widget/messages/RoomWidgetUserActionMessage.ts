import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetUserActionMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetUserActionMessage'); }

    public static readonly WHISPER_USER: string = "RWUAM_WHISPER_USER";
    public static readonly IGNORE_USER: string = "RWUAM_IGNORE_USER";
    public static readonly _SafeStr_8013: string = "RWUAM_IGNORE_USER_BUBBLE";
    public static readonly UNIGNORE_USER: string = "RWUAM_UNIGNORE_USER";
    public static readonly KICK_USER: string = "RWUAM_KICK_USER";
    public static readonly BAN_USER_HOUR: string = "RWUAM_BAN_USER_HOUR";
    public static readonly BAN_USER_DAY: string = "RWUAM_BAN_USER_DAY";
    public static readonly BAN_USER_PERM: string = "RWUAM_BAN_USER_PERM";
    public static readonly MUTE_USER_2MIN: string = "RWUAM_MUTE_USER_2MIN";
    public static readonly MUTE_USER_5MIN: string = "RWUAM_MUTE_USER_5MIN";
    public static readonly MUTE_USER_10MIN: string = "RWUAM_MUTE_USER_10MIN";
    public static readonly SEND_FRIEND_REQUEST: string = "RWUAM_SEND_FRIEND_REQUEST";
    public static readonly RESPECT_USER: string = "RWUAM_RESPECT_USER";
    public static readonly REPLENISH_RESPECT: string = "RWUAM_REPLENISH_RESPECT_USER";
    public static readonly _SafeStr_7537: string = "RWUAM_WIRED_INSPECT";
    public static readonly WIRED_INSPECT_PET: string = "RWUAM_WIRED_INSPECT_PET";
    public static readonly _SafeStr_7591: string = "RWUAM_WIRED_INSPECT_BOT";
    public static readonly _SafeStr_7650: string = "RWUAM_OPEN_PROFILE";
    public static readonly GIVE_RIGHTS: string = "RWUAM_GIVE_RIGHTS";
    public static readonly TAKE_RIGHTS: string = "RWUAM_TAKE_RIGHTS";
    public static readonly START_TRADING: string = "RWUAM_START_TRADING";
    public static readonly OPEN_HOME_PAGE: string = "RWUAM_OPEN_HOME_PAGE";
    public static readonly REPORT: string = "RWUAM_REPORT";
    public static readonly PICK_UP_PET: string = "RWUAM_PICKUP_PET";
    public static readonly MOUNT_PET: string = "RWUAM_MOUNT_PET";
    public static readonly TOGGLE_PET_RIDING_PERMISSION: string = "RWUAM_TOGGLE_PET_RIDING_PERMISSION";
    public static readonly TOGGLE_PET_BREEDING_PERMISSION: string = "RWUAM_TOGGLE_PET_BREEDING_PERMISSION";
    public static readonly DISMOUNT_PET: string = "RWUAM_DISMOUNT_PET";
    public static readonly SADDLE_OFF: string = "RWUAM_SADDLE_OFF";
    public static readonly TRAIN_PET: string = "RWUAM_TRAIN_PET";
    public static readonly RESPECT_PET: string = " RWUAM_RESPECT_PET";
    public static readonly TREAT_PET: string = "RWUAM_TREAT_PET";
    public static readonly REQUEST_PET_UPDATE: string = "RWUAM_REQUEST_PET_UPDATE";
    public static readonly START_NAME_CHANGE: string = "RWUAM_START_NAME_CHANGE";
    public static readonly PASS_CARRY_ITEM: string = "RWUAM_PASS_CARRY_ITEM";
    public static readonly _SafeStr_8308: string = "RWUAM_DROP_CARRY_ITEM";
    public static readonly GIVE_CARRY_ITEM_TO_PET: string = "RWUAM_GIVE_CARRY_ITEM_TO_PET";
    public static readonly GIVE_WATER_TO_PET: string = "RWUAM_GIVE_WATER_TO_PET";
    public static readonly GIVE_LIGHT_TO_PET: string = "RWUAM_GIVE_LIGHT_TO_PET";
    public static readonly REQUEST_BREED_PET: string = "RWUAM_REQUEST_BREED_PET";
    public static readonly HARVEST_PET: string = "RWUAM_HARVEST_PET";
    public static readonly REVIVE_PET: string = "RWUAM_REVIVE_PET";
    public static readonly COMPOST_PLANT: string = "RWUAM_COMPOST_PLANT";
    public static readonly GET_BOT_INFO: string = "RWUAM_GET_BOT_INFO";
    public static readonly REPORT_CFH_OTHER: string = "RWUAM_REPORT_CFH_OTHER";
    public static readonly AMBASSADOR_ALERT_USER: string = "RWUAM_AMBASSADOR_ALERT_USER";
    public static readonly AMBASSADOR_KICK_USER: string = "RWUAM_AMBASSADOR_KICK_USER";
    public static readonly AMBASSADOR_MUTE_USER_2MIN: string = "RWUAM_AMBASSADOR_MUTE_2MIN";
    public static readonly AMBASSADOR_MUTE_USER_15MIN: string = "RWUAM_AMBASSADOR_MUTE_15MIN";
    public static readonly AMBASSADOR_MUTE_USER_10MIN: string = "RWUAM_AMBASSADOR_MUTE_10MIN";
    public static readonly AMBASSADOR_MUTE_USER_60MIN: string = "RWUAM_AMBASSADOR_MUTE_60MIN";
    public static readonly AMBASSADOR_MUTE_USER_18HOUR: string = "RWUAM_AMBASSADOR_MUTE_18HOUR";
    public static readonly AMBASSADOR_MUTE_USER_36HOUR: string = "RWUAM_AMBASSADOR_MUTE_36HOUR";
    public static readonly AMBASSADOR_MUTE_USER_72HOUR: string = "RWUAM_AMBASSADOR_MUTE_72HOUR";
    public static readonly AMBASSADOR_UNMUTE_USER: string = "RWUAM_AMBASSADOR_UNMUTE";
    private _userId: number = 0;

    constructor(param1: string, param2: number = 0) {
        super(param1);
        this._userId = param2;
    }

    public get userId(): number {
        return this._userId;
    }
}
