import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AddonCodes {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::AddonCodes'); }

    public static CONDITION_EVALUATION: number = 0;
    public static _SafeStr_7579: number = 1;
    public static _SafeStr_7509: number = 2;
    public static _SafeStr_7497: number = 5;
    public static NO_MOVE_ANIMATION: number = 6;
    public static _SafeStr_7450: number = 7;
    public static CARRY_USERS: number = 8;
    public static ANIMATION_TIME: number = 9;
    public static FURNI_SELECTOR_FILTER: number = 10;
    public static USER_SELECTOR_FILTER: number = 11;
    public static FURNI_VARIABLE_FILTER: number = 12;
    public static USER_VARIABLE_FILTER: number = 13;
    public static USERNAME_PLACEHOLDER: number = 14;
    public static VARIABLE_PLACEHOLDER: number = 15;
    public static VARIABLE_CAPTURER: number = 16;
    public static EXECUTE_IN_ORDER: number = 17;
    public static CHEST_ITEM_TYPE_SCANNER: number = 18;
    public static FURNI_NAME_PLACEHOLDER: number = 19;
    public static CUSTOM_CONTRACT: number = 20;
    public static VARIABLE_TEXT_CONVERTER: number = 1000;
    public static VARIABLE_LEVEL_UP: number = 1001;
    public static VARIABLE_TIME_UTIL: number = 1002;
    public static GLOBAL_PLACEHOLDER: number = 2000;

    constructor() {
    }
}
