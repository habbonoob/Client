import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { _SafeCls_6081 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6081';

export class _SafeCls_6073 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6073'); }

    public static readonly CATEGORY_HEALTH_POINTS: string = "health_points";
    public static readonly CATEGORY_PROGRESS_BAR: string = "progress_bar";
    public static readonly CATEGORY_LEVELLING_PROGRESS: string = "levelling_progress";
    public static readonly CATEGORY_STATUS_BAR: string = "status_bar";
    public static readonly CATEGORY_BOSS_BAR: string = "boss_bar";
    public static readonly CATEGORY_NUMBER_DISPLAY: string = "number_display";
    public static readonly CATEGORY_HEALTH_POINTS_ID: number = 0;
    public static readonly CATEGORY_PROGRESS_BAR_ID: number = 1;
    public static readonly CATEGORY_LEVELLING_PROGRESS_ID: number = 2;
    public static readonly CATEGORY_STATUS_BAR_ID: number = 3;
    public static readonly CATEGORY_BOSS_BAR_ID: number = 4;
    public static readonly CATEGORY_NUMBER_DISPLAY_ID: number = 5;
    private static readonly CATEGORY_IDS: any[] = [0, 1, 2, 3, 4, 5];
    private static readonly COLOR_IDS: any[] = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 100, 101, 102, 103, 104, 1000, 1001, 1002];
    private static readonly _SafeStr_14502: any[] = [-1, 0, 1, 2, 3, 4, 100];
    private static readonly RENDERER_IDS: any[] = [0, 1, 2, 3, 4, 10, 11, 12, 13, 20, 21, 100, 101, 200, 201];

    constructor() {
    }

    public static getCategoryIds(): any[] {
        return _SafeCls_6073.CATEGORY_IDS.concat();
    }

    public static getColorIds(): any[] {
        return _SafeCls_6073.COLOR_IDS.concat();
    }

    public static getWidthIds(): any[] {
        return _SafeCls_6073._SafeStr_14502.concat();
    }

    public static getRendererIds(): any[] {
        return _SafeCls_6073.RENDERER_IDS.concat();
    }

    public static resolveCategoryById(param1: number): string {
        switch (param1) {
            case 0:
                return "health_points";
            case 1:
                return "progress_bar";
            case 2:
                return "levelling_progress";
            case 3:
                return "status_bar";
            case 4:
                return "boss_bar";
            case 5:
                return "number_display";
            default:
                return null;
        }
    }

    public static resolveCategoryId(param1: string): number {
        switch (param1) {
            case "health_points":
                return 0;
            case "progress_bar":
                return 1;
            case "levelling_progress":
                return 2;
            case "status_bar":
                return 3;
            case "boss_bar":
                return 4;
            case "number_display":
                return 5;
            default:
                return -1;
        }
    }

    public static resolveColorById(param1: number): string {
        switch (param1) {
            case -1:
                return "NOT_APPLICABLE";
            case 1:
                return "GREEN";
            case 2:
                return "LIME_GREEN";
            case 3:
                return "YELLOW";
            case 4:
                return "ORANGE";
            case 5:
                return "RED";
            case 6:
                return "CYAN";
            case 7:
                return "BLUE";
            case 8:
                return "PURPLE";
            case 9:
                return "PINK";
            case 10:
                return "BROWN";
            case 11:
                return "BEIGE";
            case 12:
                return "TEAL";
            case 13:
                return "INDIGO";
            case 14:
                return "MAGENTA";
            case 15:
                return "LIGHT_BLUE";
            case 16:
                return "FIRE_ORANGE";
            case 17:
                return "DARK_GREEN";
            case 18:
                return "DARK_BLUE";
            case 19:
                return "WHITE";
            case 100:
                return "BRONZE";
            case 101:
                return "SILVER";
            case 102:
                return "GOLD";
            case 103:
                return "DIAMOND";
            case 104:
                return "EMERALD";
            case 1000:
                return "DYNAMIC_RED_TO_GREEN";
            case 1001:
                return "DYNAMIC_LEVELLING";
            case 1002:
                return "DYNAMIC_TEAM_COLOR";
            default:
                return "NOT_APPLICABLE";
        }
    }

    public static resolveColorId(param1: string): number {
        switch (param1) {
            case "NOT_APPLICABLE":
                return -1;
            case "GREEN":
                return 1;
            case "LIME_GREEN":
                return 2;
            case "YELLOW":
                return 3;
            case "ORANGE":
                return 4;
            case "RED":
                return 5;
            case "CYAN":
                return 6;
            case "BLUE":
                return 7;
            case "PURPLE":
                return 8;
            case "PINK":
                return 9;
            case "BROWN":
                return 10;
            case "BEIGE":
                return 11;
            case "TEAL":
                return 12;
            case "INDIGO":
                return 13;
            case "MAGENTA":
                return 14;
            case "LIGHT_BLUE":
                return 15;
            case "FIRE_ORANGE":
                return 16;
            case "DARK_GREEN":
                return 17;
            case "DARK_BLUE":
                return 18;
            case "WHITE":
                return 19;
            case "BRONZE":
                return 100;
            case "SILVER":
                return 101;
            case "GOLD":
                return 102;
            case "DIAMOND":
                return 103;
            case "EMERALD":
                return 104;
            case "DYNAMIC_RED_TO_GREEN":
                return 1000;
            case "DYNAMIC_LEVELLING":
                return 1001;
            case "DYNAMIC_TEAM_COLOR":
                return 1002;
            default:
                return -1;
        }
    }

    public static resolveWidthById(param1: number): string {
        switch (param1) {
            case -1:
                return "not_applicable";
            case 0:
                return "extra_small";
            case 1:
                return "small";
            case 2:
                return "medium";
            case 3:
                return "large";
            case 4:
                return "extra_large";
            case 100:
                return "big_mahoosive_chonky";
            default:
                return "medium";
        }
    }

    public static resolveWidthId(param1: string): number {
        switch (param1) {
            case "not_applicable":
                return -1;
            case "extra_small":
                return 0;
            case "small":
                return 1;
            case "medium":
                return 2;
            case "large":
                return 3;
            case "extra_large":
                return 4;
            case "big_mahoosive_chonky":
                return 100;
            default:
                return 2;
        }
    }

    public static resolveRendererById(param1: number): string {
        return _SafeCls_6081.resolveById(param1);
    }

    public static resolveRendererId(param1: string): number {
        return _SafeCls_6081.resolveId(param1);
    }
}
