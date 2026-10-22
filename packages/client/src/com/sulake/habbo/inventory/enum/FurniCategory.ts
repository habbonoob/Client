import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniCategory {
    static { registerClassName(this, 'com.sulake.habbo.inventory.enum::FurniCategory'); }

    public static readonly DEFAULT: number = 1;
    public static readonly WALL_PAPER: number = 2;
    public static readonly _SafeStr_8126: number = 3;
    public static readonly LANDSCAPE: number = 4;
    public static readonly POST_IT: number = 5;
    public static readonly POSTER: number = 6;
    public static readonly SOUND_SET: number = 7;
    public static readonly TRAX_SONG: number = 8;
    public static readonly PRESENT: number = 9;
    public static readonly ECOTRON_BOX: number = 10;
    public static readonly TROPHY: number = 11;
    public static readonly CREDIT_FURNI: number = 12;
    public static readonly PET_SHAMPOO: number = 13;
    public static readonly PET_CUSTOM_PART: number = 14;
    public static readonly PET_CUSTOM_PART_SHAMPOO: number = 15;
    public static readonly PET_SADDLE: number = 16;
    public static readonly GUILD_FURNI: number = 17;
    public static readonly GAME_FURNI: number = 18;
    public static readonly MONSTERPLANT_SEED: number = 19;
    public static readonly MONSTERPLANT_REVIVAL: number = 20;
    public static readonly MONSTERPLANT_REBREED: number = 21;
    public static readonly MONSTERPLANT_FERTILIZE: number = 22;
    public static readonly FIGURE_PURCHASABLE_SET: number = 23;
    public static readonly FURNI_CHEST: number = 24;
    public static readonly COINS_CHEST: number = 25;
}
