import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboClubLevelEnum {
    static { registerClassName(this, 'com.sulake.habbo.session::HabboClubLevelEnum'); }

    public static readonly NO_CLUB: number = 0;
    public static readonly CLUB: number = 1;
    public static readonly VIP: number = 2;

    constructor() {
    }

    public static HasClub(param1: number): boolean {
        return param1 >= 1;
    }

    public static HasVip(param1: number): boolean {
        return param1 >= 1;
    }
}
