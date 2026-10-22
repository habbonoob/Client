import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class InventorySubCategory {
    static { registerClassName(this, 'com.sulake.habbo.inventory.enum::InventorySubCategory'); }

    public static readonly _SafeStr_4649: string = "empty";
    public static readonly TRADING: string = "trading";
    public static readonly WIRED_TRADING: string = "wired_trading";
    public static readonly RECYCLER: string = "recycler";
}
