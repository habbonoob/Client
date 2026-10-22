import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxPreviewStyleDefinition } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxPreviewStyleDefinition';

export class VariableFxPreviewStyleDefinitions {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxPreviewStyleDefinitions'); }

    private static readonly _SafeStr_14650: number = 0;
    private static readonly PROGRESS_BAR_CATEGORY_ID: number = 1;
    private static readonly _SafeStr_14651: number = 2;
    private static readonly STATUS_BAR_CATEGORY_ID: number = 3;
    private static readonly BOSS_BAR_CATEGORY_ID: number = 4;
    private static readonly NUMBER_DISPLAY_CATEGORY_ID: number = 5;
    private static _SafeStr_14652: any[];
    private static _serverStyleNames: any[];

    constructor() {
    }

    public static get DEFINITIONS(): any[] {
        VariableFxPreviewStyleDefinitions.initialize();
        return VariableFxPreviewStyleDefinitions._SafeStr_14652;
    }

    public static getByServerStyle(param1: string): VariableFxPreviewStyleDefinition {
        let _loc2_: any = null;
        VariableFxPreviewStyleDefinitions.initialize();
        for (_loc2_ of VariableFxPreviewStyleDefinitions._SafeStr_14652 ?? []) {
            if (_loc2_.serverStyle == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public static getByCategoryAndStyleId(param1: number, param2: number): VariableFxPreviewStyleDefinition {
        let _loc3_: any = null;
        VariableFxPreviewStyleDefinitions.initialize();
        for (_loc3_ of VariableFxPreviewStyleDefinitions._SafeStr_14652 ?? []) {
            if (_loc3_.categoryId == param1 && _loc3_._SafeStr_14489 == param2) {
                return _loc3_;
            }
        }
        return null;
    }

    public static getByCategoryId(param1: number): any[] {
        let _loc3_: any = null;
        let _loc2_: any[] = [];
        VariableFxPreviewStyleDefinitions.initialize();
        for (_loc3_ of VariableFxPreviewStyleDefinitions._SafeStr_14652 ?? []) {
            if (_loc3_.categoryId == param1) {
                _loc2_.push(_loc3_);
            }
        }
        return _loc2_;
    }

    public static getImplementedServerStyles(): any[] {
        VariableFxPreviewStyleDefinitions.initialize();
        return VariableFxPreviewStyleDefinitions._serverStyleNames.concat();
    }

    private static initialize(): void {
        if (VariableFxPreviewStyleDefinitions._SafeStr_14652 != null) {
            return;
        }
        VariableFxPreviewStyleDefinitions._SafeStr_14652 = [VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["classic_progress"], VariableFxPreviewStyleDefinitions.xsToXlWidths(), "progress_bar", 1, "GREEN", "classic_progress", "medium", "CLASSIC_BAR", 0), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["block_progress"], VariableFxPreviewStyleDefinitions.xsToXlWidths(), "progress_bar", 1, "GREEN", "block_progress", "medium", "BLOCK_BAR", 1), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["striped_progress"], VariableFxPreviewStyleDefinitions.xsToXlWidths(), "progress_bar", 1, "GREEN", "striped_progress", "medium", "STRIPED_BAR", 2), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["arrow_progress"], VariableFxPreviewStyleDefinitions.xsToXlWidths(), "progress_bar", 1, "GREEN", "arrow_progress", "medium", "ARROW_BAR", 3), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["classic_mini_progress"], VariableFxPreviewStyleDefinitions.xsToXlWidths(), "progress_bar", 1, "GREEN", "classic_mini_progress", "medium", "CLASSIC_MINI_BAR", 4), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.dynamicRedToGreenColors(), ["health_progress"], VariableFxPreviewStyleDefinitions.smallToLargeWidths(), "health_points", 0, "DYNAMIC_RED_TO_GREEN", "health_progress", "medium", "HEALTH_BAR", 0, VariableFxPreviewStyleDefinitions.extra("icon", "misc_heart")), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["masked_heart_fill"], ["not_applicable"], "health_points", 0, "RED", "masked_heart_fill", "not_applicable", "SINGLE_HEART", 3), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["stacked_health_points"], ["medium", "large"], "health_points", 0, "RED", "stacked_health_points", "medium", "STACKED", 1), VariableFxPreviewStyleDefinitions.definition(["NOT_APPLICABLE"], ["thermometer_health_points"], VariableFxPreviewStyleDefinitions.xsToXlWidths(), "health_points", 0, "NOT_APPLICABLE", "thermometer_health_points", "medium", "THERMOMETER", 2), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.levellingColors(), ["level_with_progress"], VariableFxPreviewStyleDefinitions.smallToLargeWidths(), "levelling_progress", 2, "DYNAMIC_LEVELLING", "level_with_progress", "medium", "LEVEL_AND_BAR", 0, VariableFxPreviewStyleDefinitions.extra("sub_renderer", "2"), VariableFxPreviewStyleDefinitions.levelStatusExtra()), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.levellingColors(), ["level_with_bar_and_numerical_progress"], VariableFxPreviewStyleDefinitions.sToXlWidths(), "levelling_progress", 2, "DYNAMIC_LEVELLING", "level_with_bar_and_numerical_progress", "medium", "LEVEL_DETAILS", 1, VariableFxPreviewStyleDefinitions.extra("sub_renderer", "1"), VariableFxPreviewStyleDefinitions.levelStatusExtra()), VariableFxPreviewStyleDefinitions.definition(["RED"], ["boss_health_bar"], VariableFxPreviewStyleDefinitions.lToXxlWidths(), "boss_bar", 4, "RED", "boss_health_bar", "extra_large", "BOSS_HEALTH_AND_SKULL", 0, VariableFxPreviewStyleDefinitions.extra("icon", "misc_skull", "icon_alignment", "double")), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndRedToGreenColors(), ["boss_health_bar"], VariableFxPreviewStyleDefinitions.lToXxlWidths(), "boss_bar", 4, "RED", "boss_health_bar", "extra_large", "BOSS_HEALTH", 1), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.numberTeamColors(), ["number_baked_colors"], ["not_applicable"], "number_display", 5, "GREEN", "number_baked_colors", "not_applicable", "NUMBER_FREEZE", 0, VariableFxPreviewStyleDefinitions.extra("design", "freeze_style")), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["number_recolorable"], ["not_applicable"], "number_display", 5, "GREEN", "number_recolorable", "not_applicable", "NUMBER_SHALIMAR", 1, VariableFxPreviewStyleDefinitions.extra("design", "shalimar")), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.allAndTeamColors(), ["number_recolorable"], ["not_applicable"], "number_display", 5, "GREEN", "number_recolorable", "not_applicable", "NUMBER_BLOCKY", 2, VariableFxPreviewStyleDefinitions.extra("design", "blocky")), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_ENERGY", 0, "energy", "#ffd83d"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_SHIELD", 1, "shield", "#4aa9f6"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_MAGIC", 2, "magic", "#8751d1"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_FOOD", 3, "food", "#ff9f24"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_STAMINA", 4, "stamina", "#86d213"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_POISON", 5, "poison", "#8ddc35"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_MANA", 6, "mana", "#268fff"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_HEALTH", 7, "health", "#7dce35"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_GOLD", 8, "gold", "#ffc83d", true), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_GEMS", 9, "gems", "#416bdd", true), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_HONOR", 10, "honor", "#fac384"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_REPUTATION", 11, "reputation", "#ffd83d"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_COOLDOWN", 12, "cooldown", "#b8c3cc"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_TIME_LEFT", 13, "timeleft", "#74b9e8"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_BURNING", 14, "burning", "#ff5a1f"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_FREEZING", 15, "freezing", "#82cfff"), VariableFxPreviewStyleDefinitions.definition(VariableFxPreviewStyleDefinitions.dynamicRedToGreenColors(), VariableFxPreviewStyleDefinitions.statusRenderers(), VariableFxPreviewStyleDefinitions.xsToXlWidths(), "status_bar", 3, "DYNAMIC_RED_TO_GREEN", "block_progress", "medium", "STATUS_BATTERY", 16, VariableFxPreviewStyleDefinitions.extra("icon", "battery")), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_REPAIRING", 17, "repairing", "#c9c5b8", true), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_STEALTH", 18, "stealth", "#6254a8"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_UPGRADING", 19, "upgrading", "#6bdc34"), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_STAR_POWER", 20, "star_power", "#ffd900", true), VariableFxPreviewStyleDefinitions.statusDefinition("STATUS_WATER", 21, "droplet", "#4aabf5")];
        VariableFxPreviewStyleDefinitions._serverStyleNames = [];
        for (const _loc1_ of VariableFxPreviewStyleDefinitions._SafeStr_14652 ?? []) {
            VariableFxPreviewStyleDefinitions._serverStyleNames.push(_loc1_.serverStyle);
        }
    }

    private static definition(param1: any[], param2: any[], param3: any[], param4: string, param5: number, param6: string, param7: string, param8: string, param9: string, param10: number, param11: UtilsMap = null, param12: UtilsMap = null): VariableFxPreviewStyleDefinition {
        return new VariableFxPreviewStyleDefinition(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12);
    }

    private static statusDefinition(param1: string, param2: number, param3: string, param4: string, param5: boolean = false): VariableFxPreviewStyleDefinition {
        return VariableFxPreviewStyleDefinitions.definition(["NOT_APPLICABLE"], VariableFxPreviewStyleDefinitions.statusRenderers(), VariableFxPreviewStyleDefinitions.xsToXlWidths(), "status_bar", 3, "NOT_APPLICABLE", "block_progress", "medium", param1, param2, VariableFxPreviewStyleDefinitions.extra("icon", param3, "color", param4, "metallic", String(param5)));
    }

    private static normalColors(): any[] {
        return ["GREEN", "LIME_GREEN", "YELLOW", "ORANGE", "RED", "CYAN", "BLUE", "PURPLE", "PINK", "BROWN", "BEIGE", "TEAL", "INDIGO", "MAGENTA", "LIGHT_BLUE", "FIRE_ORANGE", "DARK_GREEN", "DARK_BLUE", "WHITE", "BRONZE", "SILVER", "GOLD", "DIAMOND", "EMERALD"];
    }

    private static allAndTeamColors(): any[] {
        let _loc1_: any[] = VariableFxPreviewStyleDefinitions.normalColors();
        _loc1_.push("DYNAMIC_TEAM_COLOR");
        return _loc1_;
    }

    private static allAndRedToGreenColors(): any[] {
        let _loc1_: any[] = VariableFxPreviewStyleDefinitions.normalColors();
        _loc1_.push("DYNAMIC_RED_TO_GREEN");
        _loc1_.push("DYNAMIC_TEAM_COLOR");
        return _loc1_;
    }

    private static levellingColors(): any[] {
        let _loc1_: any[] = VariableFxPreviewStyleDefinitions.normalColors();
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
        return VariableFxPreviewStyleDefinitions.extra("current_level", "1", "is_maxed", "false", "max_level", "25");
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
