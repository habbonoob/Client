import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxPreviewStyleDefinition } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxPreviewStyleDefinition';

export class _SafeCls_6071 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6071'); }

    private static readonly _SafeStr_14503: number = 0;
    private static readonly PROGRESS_BAR_CATEGORY_ID: number = 1;
    private static readonly _SafeStr_14504: number = 2;
    private static readonly STATUS_BAR_CATEGORY_ID: number = 3;
    private static readonly BOSS_BAR_CATEGORY_ID: number = 4;
    private static readonly NUMBER_DISPLAY_CATEGORY_ID: number = 5;
    private static _SafeStr_14505: any[];
    private static _serverStyleNames: any[];

    constructor() {
    }

    public static get DEFINITIONS(): any[] {
        _SafeCls_6071.initialize();
        return _SafeCls_6071._SafeStr_14505;
    }

    public static getByServerStyle(param1: string): VariableFxPreviewStyleDefinition {
        let _loc2_: any = null;
        _SafeCls_6071.initialize();
        for (_loc2_ of _SafeCls_6071._SafeStr_14505 ?? []) {
            if (_loc2_.serverStyle == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public static getByCategoryAndStyleId(param1: number, param2: number): VariableFxPreviewStyleDefinition {
        let _loc3_: any = null;
        _SafeCls_6071.initialize();
        for (_loc3_ of _SafeCls_6071._SafeStr_14505 ?? []) {
            if (_loc3_.categoryId == param1 && _loc3_._SafeStr_14428 == param2) {
                return _loc3_;
            }
        }
        return null;
    }

    public static getByCategoryId(param1: number): any[] {
        let _loc3_: any = null;
        let _loc2_: any[] = [];
        _SafeCls_6071.initialize();
        for (_loc3_ of _SafeCls_6071._SafeStr_14505 ?? []) {
            if (_loc3_.categoryId == param1) {
                _loc2_.push(_loc3_);
            }
        }
        return _loc2_;
    }

    public static getImplementedServerStyles(): any[] {
        _SafeCls_6071.initialize();
        return _SafeCls_6071._serverStyleNames.concat();
    }

    private static initialize(): void {
        if (_SafeCls_6071._SafeStr_14505 != null) {
            return;
        }
        _SafeCls_6071._SafeStr_14505 = [_SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["classic_progress"], _SafeCls_6071.xsToXlWidths(), "progress_bar", 1, "GREEN", "classic_progress", "medium", "CLASSIC_BAR", 0), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["block_progress"], _SafeCls_6071.xsToXlWidths(), "progress_bar", 1, "GREEN", "block_progress", "medium", "BLOCK_BAR", 1), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["striped_progress"], _SafeCls_6071.xsToXlWidths(), "progress_bar", 1, "GREEN", "striped_progress", "medium", "STRIPED_BAR", 2), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["arrow_progress"], _SafeCls_6071.xsToXlWidths(), "progress_bar", 1, "GREEN", "arrow_progress", "medium", "ARROW_BAR", 3), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["classic_mini_progress"], _SafeCls_6071.xsToXlWidths(), "progress_bar", 1, "GREEN", "classic_mini_progress", "medium", "CLASSIC_MINI_BAR", 4), _SafeCls_6071.definition(_SafeCls_6071.dynamicRedToGreenColors(), ["health_progress"], _SafeCls_6071.smallToLargeWidths(), "health_points", 0, "DYNAMIC_RED_TO_GREEN", "health_progress", "medium", "HEALTH_BAR", 0, _SafeCls_6071.extra("icon", "misc_heart")), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["masked_heart_fill"], ["not_applicable"], "health_points", 0, "RED", "masked_heart_fill", "not_applicable", "SINGLE_HEART", 3), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["stacked_health_points"], ["medium", "large"], "health_points", 0, "RED", "stacked_health_points", "medium", "STACKED", 1), _SafeCls_6071.definition(["NOT_APPLICABLE"], ["thermometer_health_points"], _SafeCls_6071.xsToXlWidths(), "health_points", 0, "NOT_APPLICABLE", "thermometer_health_points", "medium", "THERMOMETER", 2), _SafeCls_6071.definition(_SafeCls_6071.levellingColors(), ["level_with_progress"], _SafeCls_6071.smallToLargeWidths(), "levelling_progress", 2, "DYNAMIC_LEVELLING", "level_with_progress", "medium", "LEVEL_AND_BAR", 0, _SafeCls_6071.extra("sub_renderer", "2"), _SafeCls_6071.levelStatusExtra()), _SafeCls_6071.definition(_SafeCls_6071.levellingColors(), ["level_with_bar_and_numerical_progress"], _SafeCls_6071.sToXlWidths(), "levelling_progress", 2, "DYNAMIC_LEVELLING", "level_with_bar_and_numerical_progress", "medium", "LEVEL_DETAILS", 1, _SafeCls_6071.extra("sub_renderer", "1"), _SafeCls_6071.levelStatusExtra()), _SafeCls_6071.definition(["RED"], ["boss_health_bar"], _SafeCls_6071.lToXxlWidths(), "boss_bar", 4, "RED", "boss_health_bar", "extra_large", "BOSS_HEALTH_AND_SKULL", 0, _SafeCls_6071.extra("icon", "misc_skull", "icon_alignment", "double")), _SafeCls_6071.definition(_SafeCls_6071.allAndRedToGreenColors(), ["boss_health_bar"], _SafeCls_6071.lToXxlWidths(), "boss_bar", 4, "RED", "boss_health_bar", "extra_large", "BOSS_HEALTH", 1), _SafeCls_6071.definition(_SafeCls_6071.numberTeamColors(), ["number_baked_colors"], ["not_applicable"], "number_display", 5, "GREEN", "number_baked_colors", "not_applicable", "NUMBER_FREEZE", 0, _SafeCls_6071.extra("design", "freeze_style")), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["number_recolorable"], ["not_applicable"], "number_display", 5, "GREEN", "number_recolorable", "not_applicable", "NUMBER_SHALIMAR", 1, _SafeCls_6071.extra("design", "shalimar")), _SafeCls_6071.definition(_SafeCls_6071.allAndTeamColors(), ["number_recolorable"], ["not_applicable"], "number_display", 5, "GREEN", "number_recolorable", "not_applicable", "NUMBER_BLOCKY", 2, _SafeCls_6071.extra("design", "blocky")), _SafeCls_6071.statusDefinition("STATUS_ENERGY", 0, "energy", "#ffd83d"), _SafeCls_6071.statusDefinition("STATUS_SHIELD", 1, "shield", "#4aa9f6"), _SafeCls_6071.statusDefinition("STATUS_MAGIC", 2, "magic", "#8751d1"), _SafeCls_6071.statusDefinition("STATUS_FOOD", 3, "food", "#ff9f24"), _SafeCls_6071.statusDefinition("STATUS_STAMINA", 4, "stamina", "#86d213"), _SafeCls_6071.statusDefinition("STATUS_POISON", 5, "poison", "#8ddc35"), _SafeCls_6071.statusDefinition("STATUS_MANA", 6, "mana", "#268fff"), _SafeCls_6071.statusDefinition("STATUS_HEALTH", 7, "health", "#7dce35"), _SafeCls_6071.statusDefinition("STATUS_GOLD", 8, "gold", "#ffc83d", true), _SafeCls_6071.statusDefinition("STATUS_GEMS", 9, "gems", "#416bdd", true), _SafeCls_6071.statusDefinition("STATUS_HONOR", 10, "honor", "#fac384"), _SafeCls_6071.statusDefinition("STATUS_REPUTATION", 11, "reputation", "#ffd83d"), _SafeCls_6071.statusDefinition("STATUS_COOLDOWN", 12, "cooldown", "#b8c3cc"), _SafeCls_6071.statusDefinition("STATUS_TIME_LEFT", 13, "timeleft", "#74b9e8"), _SafeCls_6071.statusDefinition("STATUS_BURNING", 14, "burning", "#ff5a1f"), _SafeCls_6071.statusDefinition("STATUS_FREEZING", 15, "freezing", "#82cfff"), _SafeCls_6071.definition(_SafeCls_6071.dynamicRedToGreenColors(), _SafeCls_6071.statusRenderers(), _SafeCls_6071.xsToXlWidths(), "status_bar", 3, "DYNAMIC_RED_TO_GREEN", "block_progress", "medium", "STATUS_BATTERY", 16, _SafeCls_6071.extra("icon", "battery")), _SafeCls_6071.statusDefinition("STATUS_REPAIRING", 17, "repairing", "#c9c5b8", true), _SafeCls_6071.statusDefinition("STATUS_STEALTH", 18, "stealth", "#6254a8"), _SafeCls_6071.statusDefinition("STATUS_UPGRADING", 19, "upgrading", "#6bdc34"), _SafeCls_6071.statusDefinition("STATUS_STAR_POWER", 20, "star_power", "#ffd900", true), _SafeCls_6071.statusDefinition("STATUS_WATER", 21, "droplet", "#4aabf5")];
        _SafeCls_6071._serverStyleNames = [];
        for (const _loc1_ of _SafeCls_6071._SafeStr_14505 ?? []) {
            _SafeCls_6071._serverStyleNames.push(_loc1_.serverStyle);
        }
    }

    private static definition(param1: any[], param2: any[], param3: any[], param4: string, param5: number, param6: string, param7: string, param8: string, param9: string, param10: number, param11: UtilsMap = null, param12: UtilsMap = null): VariableFxPreviewStyleDefinition {
        return new VariableFxPreviewStyleDefinition(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12);
    }

    private static statusDefinition(param1: string, param2: number, param3: string, param4: string, param5: boolean = false): VariableFxPreviewStyleDefinition {
        return _SafeCls_6071.definition(["NOT_APPLICABLE"], _SafeCls_6071.statusRenderers(), _SafeCls_6071.xsToXlWidths(), "status_bar", 3, "NOT_APPLICABLE", "block_progress", "medium", param1, param2, _SafeCls_6071.extra("icon", param3, "color", param4, "metallic", String(param5)));
    }

    private static normalColors(): any[] {
        return ["GREEN", "LIME_GREEN", "YELLOW", "ORANGE", "RED", "CYAN", "BLUE", "PURPLE", "PINK", "BROWN", "BEIGE", "TEAL", "INDIGO", "MAGENTA", "LIGHT_BLUE", "FIRE_ORANGE", "DARK_GREEN", "DARK_BLUE", "WHITE", "BRONZE", "SILVER", "GOLD", "DIAMOND", "EMERALD"];
    }

    private static allAndTeamColors(): any[] {
        let _loc1_: any[] = _SafeCls_6071.normalColors();
        _loc1_.push("DYNAMIC_TEAM_COLOR");
        return _loc1_;
    }

    private static allAndRedToGreenColors(): any[] {
        let _loc1_: any[] = _SafeCls_6071.normalColors();
        _loc1_.push("DYNAMIC_RED_TO_GREEN");
        _loc1_.push("DYNAMIC_TEAM_COLOR");
        return _loc1_;
    }

    private static levellingColors(): any[] {
        let _loc1_: any[] = _SafeCls_6071.normalColors();
        _loc1_.push("DYNAMIC_LEVELLING");
        _loc1_.push("DYNAMIC_TEAM_COLOR");
        return _loc1_;
    }

    private static dynamicRedToGreenColors(): any[] {
        return ["DYNAMIC_RED_TO_GREEN"];
    }

    private static numberTeamColors(): any[] {
        return ["RED", "GREEN", "BLUE", "YELLOW", "WHITE", "DYNAMIC_TEAM_COLOR"];
    }

    private static smallToLargeWidths(): any[] {
        return ["small", "medium", "large"];
    }

    private static sToXlWidths(): any[] {
        return ["small", "medium", "large", "extra_large"];
    }

    private static xsToXlWidths(): any[] {
        return ["extra_small", "small", "medium", "large", "extra_large"];
    }

    private static lToXxlWidths(): any[] {
        return ["large", "extra_large", "big_mahoosive_chonky"];
    }

    private static statusRenderers(): any[] {
        return ["block_progress", "striped_progress", "arrow_progress"];
    }

    private static levelStatusExtra(): UtilsMap {
        return _SafeCls_6071.extra("current_level", "1", "is_maxed", "false", "max_level", "25");
    }

    private static extra(param1: string, param2: any, param3: string = null, param4: any = null, param5: string = null, param6: any = null): UtilsMap {
        let _loc7_: UtilsMap = new UtilsMap();
        _loc7_.add(param1, param2);
        if (param3 != null) {
            _loc7_.add(param3, param4);
        }
        if (param5 != null) {
            _loc7_.add(param5, param6);
        }
        return _loc7_;
    }
}
