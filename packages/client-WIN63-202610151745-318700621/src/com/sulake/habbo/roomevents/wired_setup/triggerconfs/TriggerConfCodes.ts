import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TriggerConfCodes {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::TriggerConfCodes'); }

    public static AVATAR_SAYS_SOMETHING: number = 0;
    public static _SafeStr_7438: number = 1;
    public static _SafeStr_7473: number = 2;
    public static TRIGGER_ONCE: number = 3;
    public static USE_STUFF: number = 4;
    public static TRIGGER_PERIODICALLY: number = 6;
    public static AVATAR_ENTERS_ROOM: number = 7;
    public static GAME_STARTS: number = 8;
    public static GAME_ENDS: number = 9;
    public static SCORE_ACHIEVED: number = 10;
    public static AVATAR_CAUGHT: number = 11;
    public static PERIODIC_LONG: number = 12;
    public static BOT_DESTINATION_REACHED: number = 13;
    public static BOT_AVATAR_REACHED: number = 14;
    public static CLOCK_REACH_TIME: number = 15;
    public static _SafeStr_7503: number = 16;
    public static RECEIVE_SIGNAL: number = 17;
    public static AVATAR_CLICKS_FURNI: number = 18;
    public static PERIODIC_SHORT: number = 19;
    public static STATE_CHANGE: number = 20;
    public static _SafeStr_7474: number = 21;
    public static VARIABLE_UPDATE: number = 22;
    public static AVATAR_LEAVES_ROOM: number = 23;
    public static USER_CLICKS_USER: number = 24;
    public static TRANSACTION_COMPLETED: number = 25;
    public static TRANSACTION_FAILED: number = 26;
    public static INITIALIZATION: number = 28;
    public static RECEIVE_LINK_MESSAGE: number = 29;
    public static RECEIVE_LINK_DATAFRAME: number = 30;

    constructor() {
    }
}
