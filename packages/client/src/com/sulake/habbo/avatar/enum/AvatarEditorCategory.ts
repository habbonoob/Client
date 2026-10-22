import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarEditorCategory {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarEditorCategory'); }

    public static readonly GENERIC: string = "generic";
    public static readonly HEAD: string = "head";
    public static readonly TORSO: string = "torso";
    public static readonly _SafeStr_7541: string = "legs";
    public static readonly MISC: string = "misc";
    public static readonly _SafeStr_7522: string = "hotlooks";
    public static readonly WARDROBE: string = "wardrobe";
    public static readonly _SafeStr_7359: string = "effects";
    public static readonly NFT_FIGURES: string = "nfts";
}
