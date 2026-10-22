import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CraftingStateEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.utils::CraftingStateEnum'); }

    public static readonly DEFAULT_VIEW: number = 0;
    public static readonly _SafeStr_8337: number = 1;
    public static readonly _SafeStr_8619: number = 2;
    public static readonly _SafeStr_7622: number = 3;
    public static readonly _SafeStr_8159: number = 4;
    public static readonly _SafeStr_7701: number = 5;
    public static readonly RECIPE_EMPTY: number = 6;
    public static readonly RECIPE_INCOMPLETE: number = 7;
    public static readonly RECIPE_COMPLETE: number = 8;
    public static readonly ITEM_NOT_IN_INVENTORY: number = 9;
    public static readonly STATE_CRAFTING_RESULT_OK: number = 999;
    public static readonly STATE_WORKING: number = 1000;
}
