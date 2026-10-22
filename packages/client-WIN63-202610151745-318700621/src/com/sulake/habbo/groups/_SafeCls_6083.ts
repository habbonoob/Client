import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6083 {
    static { registerClassName(this, 'com.sulake.habbo.groups::_SafeCls_6083'); }

    public static readonly LINK_ID: string = "badge_leaderboard";
    public static readonly LINK_PATTERN: string = "badge_leaderboard/";
    public static readonly _SafeStr_15017: number = 1000;
    public static readonly DEFAULT_RARITY: number = -1;
    public static readonly DEFAULT_PAGE: number = 0;
    public static readonly PAGE_SIZE: number = 10;
    public static readonly TOTAL_BADGES: number = 0;
    public static readonly BADGES_BY_RARITY: number = 1;
    public static readonly ACHIEVEMENT_LEVEL: number = 2;
    public static readonly FRAME_STYLE_TOTAL_BADGES: number = 10000;
    public static readonly FRAME_STYLE_ACHIEVEMENT_LEVEL: number = 10001;
    public static readonly FRAME_STYLE_RARE: number = 10002;
    public static readonly FRAME_STYLE_VERY_RARE: number = 10003;
    public static readonly FRAME_STYLE_MYTHICAL: number = 10004;
    public static readonly FRAME_STYLE_LEGENDARY: number = 10005;
    public static readonly FRAME_STYLE_UNIQUE: number = 10006;
    public static readonly FRAME_STYLE_UNCOMMON: number = 10007;

    constructor() {
    }

    public static getLink(param1: number, param2: number = -1, param3: number = 0): string {
        return "badge_leaderboard/" + param1 + "/" + param2 + "/" + param3;
    }

    public static getPageForRank(param1: number): number {
        if (param1 < 0) {
            return 0;
        }
        return Math.max(0, param1 - 1) / 10 | 0;
    }

    public static formatOwnerCount(param1: number): string {
        if (param1 >= 1000) {
            return "1000+";
        }
        return param1.toString();
    }

    public static shouldShowOwnerCount(param1: number): boolean {
        return param1 > 0 && param1 < 1000;
    }
}
