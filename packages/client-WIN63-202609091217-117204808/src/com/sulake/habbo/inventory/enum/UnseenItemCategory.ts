import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UnseenItemCategory {
    static { registerClassName(this, 'com.sulake.habbo.inventory.enum::UnseenItemCategory'); }

    public static readonly OWNED_FURNI: number = 1;
    public static readonly RENTED_FURNI: number = 2;
    public static readonly PET: number = 3;
    public static readonly BADGE: number = 4;
    public static readonly BOT: number = 5;
    public static readonly GAMES: number = 6;
    public static readonly COLLECTIBLES: number = 7;
    public static readonly _SafeStr_14079: number = 8;
    public static readonly INVENTORY_CATEGORIES: any[] = [1, 2, 3, 4, 5];

    constructor() {
    }
}
