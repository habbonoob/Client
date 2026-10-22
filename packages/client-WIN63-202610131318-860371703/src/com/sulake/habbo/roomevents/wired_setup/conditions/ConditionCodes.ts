import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ConditionCodes {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::ConditionCodes'); }

    public static STATES_MATCH: number = 0;
    public static FURNIS_HAVE_AVATARS: number = 1;
    public static TRIGGERER_IS_ON_FURNI: number = 2;
    public static TIME_ELAPSED_MORE: number = 3;
    public static TIME_ELAPSED_LESS: number = 4;
    public static USER_COUNT_IN: number = 5;
    public static ACTOR_IS_IN_TEAM: number = 6;
    public static HAS_STACKED_FURNIS: number = 7;
    public static STUFF_TYPE_MATCHES: number = 8;
    public static ACTOR_IS_GROUP_MEMBER: number = 10;
    public static ACTOR_IS_WEARING_BADGE: number = 11;
    public static ACTOR_IS_WEARING_EFFECT: number = 12;
    public static NOT_STATES_MATCH: number = 13;
    public static NOT_FURNIS_HAVE_AVATARS: number = 14;
    public static NOT_TRIGGERER_IS_ON_FURNI: number = 15;
    public static NOT_USER_COUNT_IN: number = 16;
    public static NOT_ACTOR_IS_IN_TEAM: number = 17;
    public static NOT_HAS_STACKED_FURNIS: number = 18;
    public static NOT_STUFF_TYPE_MATCHES: number = 19;
    public static NOT_ACTOR_IS_GROUP_MEMBER: number = 21;
    public static NOT_ACTOR_IS_WEARING_BADGE: number = 22;
    public static NOT_ACTOR_IS_WEARING_EFFECT: number = 23;
    public static DATE_RANGE_ACTIVE: number = 24;
    public static ACTOR_HAS_HANDITEM: number = 25;
    public static TRIGGERER_MATCHES: number = 26;
    public static NOT_TRIGGERER_MATCHES: number = 27;
    public static TIME_MATCHES: number = 28;
    public static DATE_MATCHES: number = 29;
    public static NOT_HAS_HANDITEM: number = 30;
    public static TEAM_IS_WINNING: number = 31;
    public static PERFORMING_ACTION: number = 32;
    public static NOT_PERFORMING_ACTION: number = 33;
    public static TEAM_HAS_SCORE: number = 34;
    public static CLOCK_TIME_MATCHES: number = 35;
    public static FURNI_HAS_ALTITUDE: number = 36;
    public static USER_DIRECTION: number = 37;
    public static INPUT_SOURCE_QUANTITY: number = 38;
    public static CAN_PERFORM_MOVE: number = 39;
    public static _SafeStr_7487: number = 40;
    public static NOT_HAS_VARIABLE: number = 41;
    public static VARIABLE_VALUE: number = 42;
    public static VARIABLE_AGE: number = 43;
    public static USER_LEVEL: number = 44;
    public static CHEST_HAS_ITEMS: number = 45;
    public static CHEST_HAS_ITEM_TYPES: number = 46;

    constructor() {
    }
}
