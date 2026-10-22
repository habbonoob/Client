import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboErrorVariableEnum {
    static { registerClassName(this, 'com.sulake.habbo.tracking::HabboErrorVariableEnum'); }

    public static readonly ERROR_VARIABLE_HOST: string = "host";
    public static readonly ERROR_VARIABLE_PORT: string = "port";
    public static readonly ERROR_VARIABLE_IS_FATAL: string = "is_fatal";
    public static readonly ERROR_VARIABLE_SENT_MESSAGE_TIME: string = "sent_msg_time";
    public static readonly ERROR_VARIABLE_SENT_MESSAGE_DATA: string = "sent_msg_data";
    public static readonly ERROR_VARIABLE_RECEIVED_MESSAGE_TIME: string = "rece_msg_time";
    public static readonly ERROR_VARIABLE_RECEIVED_MESSAGE_DATA: string = "rece_msg_data";
    public static readonly ERROR_VARIABLE_CLIENT_START_TIME: string = "start_time";
    public static readonly ERROR_VARIABLE_CLIENT_CRASH_TIME: string = "crash_time";
    public static readonly ERROR_VARIABLE_USER_AGENT: string = "agent";
    public static readonly ERROR_VARIABLE_CAPABILITIES: string = "system";
    public static readonly ERROR_VARIABLE_CONTEXT: string = "error_ctx";
    public static readonly ERROR_VARIABLE_LAST_VISITED_ROOM: string = "last_room";
    public static readonly ERROR_VARIABLE_IS_IN_ROOM: string = "in_room";
    public static readonly ERROR_VARIABLE_FLASH_VERSION: string = "flash_version";
    public static readonly ERROR_VARIABLE_AVERAGE_UPDATE_INTERVAL: string = "avg_update";
    public static readonly ERROR_VARIABLE_MOUSE_UP_TIME: string = "mouse_up_time";
    public static readonly ERROR_VARIABLE_MOUSE_UP_TARGET: string = "mouse_up_target";
    public static readonly ERROR_VARIABLE_MOUSE_CLICK_TIME: string = "click_time";
    public static readonly ERROR_VARIABLE_MOUSE_CLICK_TARGET: string = "click_target";
    public static readonly ERROR_VARIABLE_DEBUG: string = "debug";
    public static readonly ERROR_PARAM_KEY_DATA: string = "error_data";
    public static readonly ERROR_PARAM_KEY_CATEGORY: string = "error_cat";
    public static readonly ERROR_PARAM_KEY_DESCRIPTION: string = "error_desc";

    constructor() {
    }
}
