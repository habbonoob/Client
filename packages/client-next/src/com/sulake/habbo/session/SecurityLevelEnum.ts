import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SecurityLevelEnum {
    static { registerClassName(this, 'com.sulake.habbo.session::SecurityLevelEnum'); }

    public static readonly SUPER_USER: number = 9;
    public static readonly ADMINISTRATOR: number = 8;
    public static readonly COMMUNITY: number = 7;
    public static readonly PLAYER_SUPPORT: number = 6;
    public static readonly MODERATOR: number = 5;
    public static readonly EMPLOYEE: number = 4;
    public static readonly BUS_PARTNER: number = 3;
    public static readonly PARTNER: number = 2;
    public static readonly _SafeStr_8280: number = 1;
    public static readonly NONE: number = 0;

    constructor() {
    }
}
