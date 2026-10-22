import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6038 {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::_SafeCls_6038'); }

    public static readonly COMMON: number = 0;
    public static readonly _SafeStr_14180: number = 1;
    public static readonly RARE: number = 2;
    public static readonly VERY_RARE: number = 3;
    public static readonly MYTHICAL: number = 4;
    public static readonly _SafeStr_14181: number = 5;
    public static readonly _SafeStr_14182: number = 6;
    private static readonly _SafeStr_14183: number = 11759111;

    constructor() {
    }

    public static isRareOrHigher(param1: number): boolean {
        return param1 >= 2;
    }

    public static isStandaloneTier(param1: number, param2: boolean = false): boolean {
        return _SafeCls_6038.isRareOrHigher(param1) || param2 && param1 == 1;
    }

    public static getLocalizationKey(param1: number, param2: boolean = false): string {
        switch (param1 - 1) {
            case 0:
                return param2 ? "badge.rarity.uncommon" : "";
            case 1:
                return "badge.rarity.rare";
            case 2:
                return "badge.rarity.epic";
            case 3:
                return "badge.rarity.mythical";
            case 4:
                return "badge.rarity.legendary";
            case 5:
                return "badge.rarity.unique";
            default:
                return "";
        }
    }

    public static getLabelLocalizationKey(param1: number, param2: boolean = false): string {
        return _SafeCls_6038.isStandaloneTier(param1, param2) ? _SafeCls_6038.getLocalizationKey(param1, param2) : "badge.rarity.common";
    }

    public static getDisplayColor(param1: number, param2: boolean = false): number {
        switch (param1 - 1) {
            case 0:
                return (param2 ? 16758605 : 0) >>> 0;
            case 1:
                return 8780159;
            case 2:
                return 6732543;
            case 3:
                return 12809942;
            case 4:
                return 14036772;
            case 5:
                return 13406720;
            default:
                return 0;
        }
    }

    public static getGlowColor(param1: number, param2: boolean = false): number {
        return (param2 && param1 == 1 ? 11759111 : _SafeCls_6038.getDisplayColor(param1, param2)) >>> 0;
    }

    public static getWhiteBackgroundTagColor(param1: number, param2: boolean = false): number {
        switch (param1) {
            case 0:
                return 7829367;
            case 1:
                return (param2 ? _SafeCls_6038.getDisplayColor(param1, param2) : 7829367) >>> 0;
            case 2:
                return _SafeCls_6038.darkenColor(_SafeCls_6038.getDisplayColor(param1, param2), 0.35);
            case 3:
                return _SafeCls_6038.darkenColor(_SafeCls_6038.getDisplayColor(param1, param2), 0.2);
            case 4:
                return _SafeCls_6038.darkenColor(_SafeCls_6038.getDisplayColor(param1, param2), 0.15);
            case 5:
                return _SafeCls_6038.darkenColor(_SafeCls_6038.getDisplayColor(param1, param2), 0.1);
            default:
                return _SafeCls_6038.getDisplayColor(param1, param2);
        }
    }

    private static darkenColor(param1: number, param2: number): number {
        let _loc6_: number = 1 - param2;
        let _loc3_: number = (param1 >> 16 & 0xFF) >>> 0;
        let _loc4_: number = (param1 >> 8 & 0xFF) >>> 0;
        let _loc5_: number = (param1 & 0xFF) >>> 0;
        _loc3_ = _loc3_ * _loc6_ >>> 0;
        _loc4_ = _loc4_ * _loc6_ >>> 0;
        _loc5_ = _loc5_ * _loc6_ >>> 0;
        return (_loc3_ << 16 | _loc4_ << 8 | _loc5_) >>> 0;
    }
}
