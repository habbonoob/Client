import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6081 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::_SafeCls_6081'); }

    public static readonly CLASSIC_PROGRESS: string = "classic_progress";
    public static readonly CLASSIC_MINI_PROGRESS: string = "classic_mini_progress";
    public static readonly BLOCK_PROGRESS: string = "block_progress";
    public static readonly STRIPED_PROGRESS: string = "striped_progress";
    public static readonly ARROW_PROGRESS: string = "arrow_progress";
    public static readonly HEALTH_PROGRESS: string = "health_progress";
    public static readonly MASKED_HEART_FILL: string = "masked_heart_fill";
    public static readonly STACKED_HEALTH_POINTS: string = "stacked_health_points";
    public static readonly THERMOMETER_HEALTH_POINTS: string = "thermometer_health_points";
    public static readonly LEVEL_WITH_PROGRESS: string = "level_with_progress";
    public static readonly LEVEL_WITH_BAR_AND_NUMERICAL_PROGRESS: string = "level_with_bar_and_numerical_progress";
    public static readonly BOSS_HEALTH_BAR: string = "boss_health_bar";
    public static readonly NUMERICAL_PROGRESS: string = "numerical_progress";
    public static readonly NUMBER_RECOLORABLE: string = "number_recolorable";
    public static readonly NUMBER_BAKED_COLORS: string = "number_baked_colors";
    public static readonly CLASSIC_PROGRESS_ID: number = 0;
    public static readonly CLASSIC_MINI_PROGRESS_ID: number = 1;
    public static readonly BLOCK_PROGRESS_ID: number = 2;
    public static readonly STRIPED_PROGRESS_ID: number = 3;
    public static readonly ARROW_PROGRESS_ID: number = 4;
    public static readonly _SafeStr_14507: number = 10;
    public static readonly MASKED_HEART_FILL_ID: number = 11;
    public static readonly STACKED_HEALTH_POINTS_ID: number = 12;
    public static readonly THERMOMETER_HEALTH_POINTS_ID: number = 13;
    public static readonly _SafeStr_14508: number = 20;
    public static readonly _SafeStr_14509: number = 21;
    public static readonly BOSS_HEALTH_BAR_ID: number = 100;
    public static readonly NUMERICAL_PROGRESS_ID: number = 101;
    public static readonly NUMBER_RECOLORABLE_ID: number = 200;
    public static readonly NUMBER_BAKED_COLORS_ID: number = 201;

    constructor() {
    }

    public static resolveId(param1: string): number {
        switch (param1) {
            case "classic_progress":
                return 0;
            case "classic_mini_progress":
                return 1;
            case "block_progress":
                return 2;
            case "striped_progress":
                return 3;
            case "arrow_progress":
                return 4;
            case "health_progress":
                return 10;
            case "masked_heart_fill":
                return 11;
            case "stacked_health_points":
                return 12;
            case "thermometer_health_points":
                return 13;
            case "level_with_progress":
                return 20;
            case "level_with_bar_and_numerical_progress":
                return 21;
            case "boss_health_bar":
                return 100;
            case "numerical_progress":
                return 101;
            case "number_recolorable":
                return 200;
            case "number_baked_colors":
                return 201;
            default:
                return -1;
        }
    }

    public static resolveById(param1: number): string {
        switch (param1) {
            case 0:
                return "classic_progress";
            case 1:
                return "classic_mini_progress";
            case 2:
                return "block_progress";
            case 3:
                return "striped_progress";
            case 4:
                return "arrow_progress";
            case 10:
                return "health_progress";
            case 11:
                return "masked_heart_fill";
            case 12:
                return "stacked_health_points";
            case 13:
                return "thermometer_health_points";
            case 20:
                return "level_with_progress";
            case 21:
                return "level_with_bar_and_numerical_progress";
            case 100:
                return "boss_health_bar";
            case 101:
                return "numerical_progress";
            case 200:
                return "number_recolorable";
            case 201:
                return "number_baked_colors";
            default:
                return null;
        }
    }
}
