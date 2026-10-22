import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class _SafeCls_6080 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6080'); }

    public static readonly NOT_APPLICABLE: string = "NOT_APPLICABLE";
    public static readonly DYNAMIC_DELEGATED: string = "DYNAMIC_DELEGATED";
    public static readonly GREEN: string = "GREEN";
    public static readonly LIME_GREEN: string = "LIME_GREEN";
    public static readonly YELLOW: string = "YELLOW";
    public static readonly ORANGE: string = "ORANGE";
    public static readonly RED: string = "RED";
    public static readonly CYAN: string = "CYAN";
    public static readonly BLUE: string = "BLUE";
    public static readonly PURPLE: string = "PURPLE";
    public static readonly PINK: string = "PINK";
    public static readonly BROWN: string = "BROWN";
    public static readonly BEIGE: string = "BEIGE";
    public static readonly TEAL: string = "TEAL";
    public static readonly INDIGO: string = "INDIGO";
    public static readonly MAGENTA: string = "MAGENTA";
    public static readonly LIGHT_BLUE: string = "LIGHT_BLUE";
    public static readonly FIRE_ORANGE: string = "FIRE_ORANGE";
    public static readonly DARK_GREEN: string = "DARK_GREEN";
    public static readonly DARK_BLUE: string = "DARK_BLUE";
    public static readonly WHITE: string = "WHITE";
    public static readonly BRONZE: string = "BRONZE";
    public static readonly SILVER: string = "SILVER";
    public static readonly GOLD: string = "GOLD";
    public static readonly DIAMOND: string = "DIAMOND";
    public static readonly EMERALD: string = "EMERALD";
    public static readonly DYNAMIC_RED_TO_GREEN: string = "DYNAMIC_RED_TO_GREEN";
    public static readonly DYNAMIC_LEVELLING: string = "DYNAMIC_LEVELLING";
    public static readonly DYNAMIC_TEAM_COLOR: string = "DYNAMIC_TEAM_COLOR";
    private static readonly DYNAMIC_LEVELLING_START_HUE: number = 115;
    private static readonly DYNAMIC_LEVELLING_END_HUE: number = 360;
    private static readonly DYNAMIC_LEVELLING_SATURATION: number = 0.85;
    private static readonly DYNAMIC_LEVELLING_VALUE: number = 0.8;
    private static readonly DYNAMIC_RED_TO_GREEN_BAND_RGBS: any[] = [15672088, 16554256, 904478];

    constructor() {
    }

    public static resolve(param1: string): any {
        switch (param1) {
            case "GREEN":
                return _SafeCls_6080.color(param1, 3584586, false);
            case "LIME_GREEN":
                return _SafeCls_6080.color(param1, 9296949, false);
            case "YELLOW":
                return _SafeCls_6080.color(param1, 16767037, false);
            case "ORANGE":
                return _SafeCls_6080.color(param1, 16752420, false);
            case "RED":
                return _SafeCls_6080.color(param1, 14625054, false);
            case "CYAN":
                return _SafeCls_6080.color(param1, 4379880, false);
            case "BLUE":
                return _SafeCls_6080.color(param1, 3898851, false);
            case "PURPLE":
                return _SafeCls_6080.color(param1, 8868305, false);
            case "PINK":
                return _SafeCls_6080.color(param1, 16740275, false);
            case "BROWN":
                return _SafeCls_6080.color(param1, 9065274, false);
            case "BEIGE":
                return _SafeCls_6080.color(param1, 14074508, false);
            case "TEAL":
                return _SafeCls_6080.color(param1, 3127208, false);
            case "INDIGO":
                return _SafeCls_6080.color(param1, 5069783, false);
            case "MAGENTA":
                return _SafeCls_6080.color(param1, 14044097, false);
            case "LIGHT_BLUE":
                return _SafeCls_6080.color(param1, 8572927, false);
            case "FIRE_ORANGE":
                return _SafeCls_6080.color(param1, 16734751, false);
            case "DARK_GREEN":
                return _SafeCls_6080.color(param1, 2060090, false);
            case "DARK_BLUE":
                return _SafeCls_6080.color(param1, 2047375, false);
            case "WHITE":
                return _SafeCls_6080.color(param1, 14211288, false);
            case "BRONZE":
                return _SafeCls_6080.color(param1, 13467442, true);
            case "SILVER":
                return _SafeCls_6080.color(param1, 12632256, true);
            case "GOLD":
                return _SafeCls_6080.color(param1, 16762941, true);
            case "DIAMOND":
                return _SafeCls_6080.color(param1, 9366271, true);
            case "EMERALD":
                return _SafeCls_6080.color(param1, 2606187, true);
            case "DYNAMIC_RED_TO_GREEN":
                return _SafeCls_6080.color(param1, 14625054, false);
            case "DYNAMIC_LEVELLING":
                return _SafeCls_6080.color(param1, 3001374, false);
            case "DYNAMIC_TEAM_COLOR":
                return _SafeCls_6080.color(param1, 14211288, false);
            case "DYNAMIC_DELEGATED":
                return _SafeCls_6080.color(param1, 16777215, false);
            default:
                return _SafeCls_6080.color("NOT_APPLICABLE", 16777215, false);
        }
    }

    public static resolvePaintColor(param1: string, param2: UtilsMap = null): any {
        let _loc3_: any = _SafeCls_6080.resolve(param1);
        let _loc5_: any = _SafeCls_6080.parseExtraBoolean(_SafeCls_6080.readExtra(param2, "metallic"));
        let _loc4_: any = _SafeCls_6080.parseExtraColor(_SafeCls_6080.readExtra(param2, "color"));
        return { "typeName": _loc3_.typeName, "rgb": (_loc4_ == null ? _loc3_.rgb : _loc4_), "isMetallic": (_loc5_ == null ? _loc3_.isMetallic : _loc5_) };
    }

    public static resolveTargetPaintColor(param1: string, param2: UtilsMap = null, param3: number = 0, param4: UtilsMap = null): any {
        let _loc6_: any = null;
        let _loc5_: any = _SafeCls_6080.resolve(param1);
        if (_loc5_.typeName == "DYNAMIC_RED_TO_GREEN") {
            _loc6_ = _SafeCls_6080.resolveDynamicRedToGreenBand(param3);
            return { "typeName": _loc5_.typeName, "rgb": _loc6_.rgb, "isMetallic": false, "dynamicBandIndex": _loc6_.index };
        }
        if (_loc5_.typeName == "DYNAMIC_LEVELLING") {
            return { "typeName": _loc5_.typeName, "rgb": _SafeCls_6080.resolveDynamicLevellingRgb(param4), "isMetallic": false, "snapTransition": true };
        }
        if (_loc5_.typeName == "DYNAMIC_DELEGATED" || _loc5_.typeName == "DYNAMIC_TEAM_COLOR") {
            return { "typeName": _loc5_.typeName, "rgb": (_SafeCls_6080.parseExtraColor(_SafeCls_6080.readExtra(param4, "delegated_color")) == null ? _loc5_.rgb : _SafeCls_6080.parseExtraColor(_SafeCls_6080.readExtra(param4, "delegated_color"))), "isMetallic": false, "snapTransition": true };
        }
        return _SafeCls_6080.resolvePaintColor(param1, param2);
    }

    public static resolveDynamicPaintBandRgb(param1: string, param2: number): any {
        if (_SafeCls_6080.resolve(param1).typeName != "DYNAMIC_RED_TO_GREEN") {
            return null;
        }
        return _SafeCls_6080.DYNAMIC_RED_TO_GREEN_BAND_RGBS[Math.max(0, Math.min(2, param2))];
    }

    public static isDynamicPaintColor(param1: string): boolean {
        return _SafeCls_6080.resolve(param1).typeName.indexOf("DYNAMIC_") == 0;
    }

    public static parseRgbColor(param1: string): any {
        return _SafeCls_6080.parseExtraColor(param1);
    }

    private static color(param1: string, param2: number, param3: boolean): any {
        return { "typeName": param1, "rgb": param2 & 0xFFFFFF, "isMetallic": param3 };
    }

    private static resolveDynamicRedToGreenBand(param1: number): any {
        let _loc2_: number = isFinite(param1) ? Math.max(0, Math.min(1, param1)) : 0;
        if (_loc2_ < 0.3333333333333333) {
            return { "index": 0, "rgb": _SafeCls_6080.DYNAMIC_RED_TO_GREEN_BAND_RGBS[0] };
        }
        if (_loc2_ < 0.6666666666666666) {
            return { "index": 1, "rgb": _SafeCls_6080.DYNAMIC_RED_TO_GREEN_BAND_RGBS[1] };
        }
        return { "index": 2, "rgb": _SafeCls_6080.DYNAMIC_RED_TO_GREEN_BAND_RGBS[2] };
    }

    private static resolveDynamicLevellingRgb(param1: UtilsMap): number {
        let _loc4_: any = null;
        let _loc5_: number = NaN;
        let _loc6_: number = NaN;
        let _loc2_: any = _SafeCls_6080.parseExtraNumber(_SafeCls_6080.readExtra(param1, "max_level"));
        let _loc3_: number = _loc2_ == null ? 0 : _loc2_ | 0;
        let _loc7_: boolean = _SafeCls_6080.readExtra(param1, "is_maxed").toLowerCase() == "true";
        if (_loc3_ <= 1) {
            return _loc7_ ? _SafeCls_6080.rgbFromHsv(360, 0.85, 0.8) : _SafeCls_6080.rgbFromHsv(115, 0.85, 0.8);
        }
        _loc4_ = _SafeCls_6080.parseExtraNumber(_SafeCls_6080.readExtra(param1, "current_level"));
        _loc5_ = Math.max(0, Math.min(1, ((_loc4_ == null ? 0 : _loc4_ | 0) - 1) / (_loc3_ - 1)));
        _loc6_ = 115 + (360 - 115) * _loc5_;
        return _SafeCls_6080.rgbFromHsv(_loc6_, 0.85, 0.8);
    }

    private static rgbFromHsv(param1: number, param2: number, param3: number): number {
        let _loc7_: number = (param1 % 360 + 360) % 360;
        let _loc5_: number = param3 * param2;
        let _loc4_: number = _loc7_ / 60;
        let _loc9_: number = _loc5_ * (1 - Math.abs(_loc4_ % 2 - 1));
        let _loc6_: number = param3 - _loc5_;
        let _loc8_: any[] = _SafeCls_6080.resolveRgbFromHueSection(_loc4_, _loc5_, _loc9_);
        return (Math.floor((_loc8_[0] + _loc6_) * 255) << 16 | Math.floor((_loc8_[1] + _loc6_) * 255) << 8 | Math.floor((_loc8_[2] + _loc6_) * 255)) >>> 0;
    }

    private static resolveRgbFromHueSection(param1: number, param2: number, param3: number): any[] {
        if (param1 < 1) {
            return [param2, param3, 0];
        }
        if (param1 < 2) {
            return [param3, param2, 0];
        }
        if (param1 < 3) {
            return [0, param2, param3];
        }
        if (param1 < 4) {
            return [0, param3, param2];
        }
        if (param1 < 5) {
            return [param3, 0, param2];
        }
        return [param2, 0, param3];
    }

    private static parseExtraNumber(param1: string): any {
        let _loc2_: number = Number(param1);
        return isFinite(_loc2_) ? _loc2_ : null;
    }

    private static parseExtraBoolean(param1: string): any {
        switch (param1 == null ? "" : param1.toLowerCase()) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                return null;
        }
    }

    private static parseExtraColor(param1: string): any {
        let _loc2_: string = null;
        if (param1 == null) {
            return null;
        }
        _loc2_ = param1.replace(/^\s+|\s+$/g, "").replace(/^#/, "").replace(/^0x/i, "");
        if (!/^[0-9a-f]{6}$/i.test(_loc2_)) {
            return null;
        }
        return parseInt(_loc2_, 16) & 0xFFFFFF;
    }

    public static readExtra(param1: UtilsMap, param2: string): string {
        if (param1 == null || param1.getValue(param2) == null) {
            return null;
        }
        return String(param1.getValue(param2)).replace(/^\s+|\s+$/g, "");
    }
}
