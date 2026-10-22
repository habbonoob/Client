import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ActionTypeCodes {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ActionTypeCodes'); }

    public static TOGGLE_FURNI_STATE: number = 0;
    public static RESET: number = 1;
    public static _SafeStr_7567: number = 3;
    public static MOVE_FURNI: number = 4;
    public static GIVE_SCORE: number = 6;
    public static CHAT: number = 7;
    public static _SafeStr_7550: number = 8;
    public static JOIN_TEAM: number = 9;
    public static LEAVE_TEAM: number = 10;
    public static CHASE: number = 11;
    public static FLEE: number = 12;
    public static MOVE_TO_DIRECTION: number = 13;
    public static GIVE_SCORE_TO_PREDEFINED_TEAM: number = 14;
    public static TOGGLE_TO_RANDOM_STATE: number = 15;
    public static MOVE_FURNI_TO: number = 16;
    public static GIVE_REWARD: number = 17;
    public static CALL_ANOTHER_STACK: number = 18;
    public static KICK_FROM_ROOM: number = 19;
    public static MUTE_USER: number = 20;
    public static BOT_TELEPORT: number = 21;
    public static BOT_MOVE: number = 22;
    public static BOT_TALK: number = 23;
    public static BOT_GIVE_HAND_ITEM: number = 24;
    public static BOT_FOLLOW_AVATAR: number = 25;
    public static BOT_CHANGE_FIGURE: number = 26;
    public static BOT_TALK_DIRECT_TO_AVTR: number = 27;
    public static CONTROL_CLOCK: number = 28;
    public static SET_FURNI_ALTITUDE: number = 29;
    public static SEND_SIGNAL: number = 30;
    public static FREEZE_USER: number = 31;
    public static UNFREEZE_USER: number = 32;
    public static RELATIVE_FURNI_MOVE: number = 33;
    public static MOVE_FURNI_TO_FURNI: number = 34;
    public static MOVE_FURNI_TO_USER: number = 35;
    public static NEG_CALL_ANOTHER_STACK: number = 36;
    public static NEG_SEND_SIGNAL: number = 37;
    public static ADJUST_CLOCK: number = 38;
    public static GIVE_VARIABLE: number = 39;
    public static REMOVE_VARIABLE: number = 40;
    public static CHANGE_VARIABLE: number = 41;
    public static MOVE_USER: number = 42;
    public static MOVE_USER_TO_FURNI: number = 43;
    public static TELEPORT_TO_ROOM: number = 44;
    public static GIVE_CURRENCY_FROM_CHEST: number = 45;
    public static GIVE_FURNI_FROM_CHEST: number = 46;
    public static INITIATE_TRANSACTION: number = 47;
    public static CANCEL_TRANSACTION: number = 48;
    public static _SafeStr_7434: number = 49;
    public static _SafeStr_7494: number = 50;
    public static PROGRESS_ACHIEVEMENT: number = 51;
    public static GIVE_EFFECT: number = 52;
    public static OVERRIDE_HEIGHT: number = 53;
    public static _SafeStr_14588: number = 54;
    public static PLACE_FURNI: number = 55;
    public static REMOVE_FURNI: number = 56;
    public static MOVE_AS_GROUP: number = 57;
    public static PROGRESS_REWARD_TRACK: number = 58;
    public static RESET_REWARD_TRACK: number = 59;

    constructor() {
    }
}
