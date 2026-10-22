import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';

export class FriendlyTime {
    static { registerClassName(this, 'com.sulake.habbo.utils::FriendlyTime'); }

    private static readonly _SafeStr_8710: number = 60;
    private static readonly _SafeStr_8181: number = 3600;
    private static readonly _SafeStr_8520: number = 86400;
    private static readonly _SafeStr_7780: number = 604800;
    private static readonly MONTH_IN_SECONDS: number = 2592000;
    private static readonly YEAR_IN_SECONDS: number = 31536000;

    public static getFriendlyTime(param1: IHabboLocalizationManager, param2: number, param3: string = "", param4: number = 3): string {
        if (param2 > param4 * 31536000) {
            return FriendlyTime.getLocalization(param1, "friendlytime.years" + param3, Math.round(param2 / 31536000) | 0);
        }
        if (param2 > param4 * 2592000) {
            return FriendlyTime.getLocalization(param1, "friendlytime.months" + param3, Math.round(param2 / 2592000) | 0);
        }
        if (param2 > param4 * 86400) {
            return FriendlyTime.getLocalization(param1, "friendlytime.days" + param3, Math.round(param2 / 86400) | 0);
        }
        if (param2 > param4 * 3600) {
            return FriendlyTime.getLocalization(param1, "friendlytime.hours" + param3, Math.round(param2 / 3600) | 0);
        }
        if (param2 > param4 * 60) {
            return FriendlyTime.getLocalization(param1, "friendlytime.minutes" + param3, Math.round(param2 / 60) | 0);
        }
        return FriendlyTime.getLocalization(param1, "friendlytime.seconds" + param3, Math.round(param2) | 0);
    }

    public static getShortFriendlyTime(param1: IHabboLocalizationManager, param2: number, param3: string = "", param4: number = 3): string {
        if (param2 > param4 * 31536000) {
            return FriendlyTime.getLocalization(param1, "friendlytime.years.short" + param3, Math.round(param2 / 31536000) | 0);
        }
        if (param2 > param4 * 2592000) {
            return FriendlyTime.getLocalization(param1, "friendlytime.months.short" + param3, Math.round(param2 / 2592000) | 0);
        }
        if (param2 > param4 * 86400) {
            return FriendlyTime.getLocalization(param1, "friendlytime.days.short" + param3, Math.round(param2 / 86400) | 0);
        }
        if (param2 > param4 * 3600) {
            return FriendlyTime.getLocalization(param1, "friendlytime.hours.short" + param3, Math.round(param2 / 3600) | 0);
        }
        if (param2 > param4 * 60) {
            return FriendlyTime.getLocalization(param1, "friendlytime.minutes.short" + param3, Math.round(param2 / 60) | 0);
        }
        return FriendlyTime.getLocalization(param1, "friendlytime.seconds.short" + param3, Math.round(param2) | 0);
    }

    public static getLocalization(param1: IHabboLocalizationManager, param2: string, param3: number): string {
        return param1.getLocalizationWithParams(param2, param2, "amount", param3.toString());
    }

    constructor() {
    }
}
