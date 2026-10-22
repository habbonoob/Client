import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TrophyTheme {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.trophy::TrophyTheme'); }

    public static readonly GOLD: number = 0;
    public static readonly SILVER: number = 1;
    public static readonly BRONZE: number = 2;
    public static readonly DEFAULT_BACKGROUND_TINT: number = 16777215;
    private static readonly BACKGROUND_ASSET_NAMES: any[] = ["trophy_bg_gold", "trophy_bg_silver", "trophy_bg_bronze"];
    private static readonly HEADER_COLORS: any[] = [4293707079, 4291411404, 4290279476];

    constructor() {
    }

    public static normalize(param1: number): number {
        if (param1 < 0 || param1 > 2) {
            return 0;
        }
        return param1;
    }

    public static getBackgroundAssetName(param1: number): string {
        return stringOrNull(TrophyTheme.BACKGROUND_ASSET_NAMES[TrophyTheme.normalize(param1)]);
    }

    public static getHeaderColor(param1: number): number {
        return TrophyTheme.HEADER_COLORS[TrophyTheme.normalize(param1)] >>> 0;
    }
}
