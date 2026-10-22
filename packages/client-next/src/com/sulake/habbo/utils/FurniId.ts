import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniId {
    static { registerClassName(this, 'com.sulake.habbo.utils::FurniId'); }

    private static readonly MAX_CLUB_FURNI_ID: number = 2147483647;
    private static readonly _SafeStr_14760: number = 2147418112;
    private static readonly MAX_TEMP_FURNI_ID: number = 2147418111;
    private static readonly _SafeStr_14761: number = 2147401728;
    private static readonly MAX_NORMAL_FURNI_ID: number = 2147401727;

    constructor() {
    }

    public static isBuilderClubId(param1: number): boolean {
        return param1 >= 2147418112 && param1 <= 2147483647;
    }

    public static isTempId(param1: number): boolean {
        return param1 >= 2147401728 && param1 <= 2147418111;
    }

    public static isNormalId(param1: number): boolean {
        return param1 <= 2147401727;
    }
}
