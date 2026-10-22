import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarFigurePartType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarFigurePartType'); }

    public static readonly BODY: string = "bd";
    public static readonly SHOES: string = "sh";
    public static readonly _SafeStr_7541: string = "lg";
    public static readonly CHEST: string = "ch";
    public static readonly _SafeStr_7714: string = "wa";
    public static readonly CHEST_ACCESSORY: string = "ca";
    public static readonly HEAD: string = "hd";
    public static readonly HAIR: string = "hr";
    public static readonly _SafeStr_8025: string = "fa";
    public static readonly _SafeStr_7719: string = "ea";
    public static readonly _SafeStr_8089: string = "ha";
    public static readonly _SafeStr_8730: string = "he";
    public static readonly COAT_CHEST: string = "cc";
    public static readonly CHEST_PRINT: string = "cp";
    public static readonly MISC: string = "mc";
    public static readonly MISC_RIGHT: string = "mcr";
    public static readonly _SafeStr_8144: string = "mcl";
    public static readonly PET: string = "pt";
    public static readonly PET_RIGHT: string = "ptr";
    public static readonly PET_LEFT: string = "ptl";
    public static readonly _SafeStr_8056: string = "li";
    public static readonly _SafeStr_8523: string = "lh";
    public static readonly LEFT_SLEEVE: string = "ls";
    public static readonly _SafeStr_8383: string = "rh";
    public static readonly RIGHT_SLEEVE: string = "rs";
    public static readonly _SafeStr_8432: string = "fc";
    public static readonly EYES: string = "ey";
    public static readonly _SafeStr_7667: string = "hrb";
    public static readonly _SafeStr_8581: string = "ri";
    public static readonly LEFT_COAT_SLEEVE: string = "lc";
    public static readonly RIGHT_COAT_SLEEVE: string = "rc";
    public static FIGURE_SETS: any[] = ["sh", "lg", "ch", "wa", "ca", "hd", "hr", "fa", "ea", "ha", "he", "cc", "cp", "pt", "mc"];

    constructor() {
    }
}
