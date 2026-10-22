import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class InventoryCategory {
    static { registerClassName(this, 'com.sulake.habbo.inventory.enum::InventoryCategory'); }

    public static readonly FURNITURE: string = "furni";
    public static readonly RENTABLES: string = "rentables";
    public static readonly BADGES: string = "badges";
    public static readonly _SafeStr_7359: string = "effects";
    public static readonly PETS: string = "pets";
    public static readonly BOTS: string = "bots";
    public static readonly MARKETPLACE: string = "marketplace";
    public static readonly COLLECTIBLES: string = "collectibles";

    constructor() {
    }
}
