import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CollectibleRarity {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.util::CollectibleRarity'); }

    private static readonly rarityColors: any = { "common": 6187373, "uncommon": 24916, "rare": 1202293, "epic": 7150694, "legendary": 8526848, "legendary+": 11167744 };

    constructor() {
    }

    public static getRarityColor(param1: string): number {
        let _loc2_: string = param1.toUpperCase();
        if (CollectibleRarity.rarityColors.hasOwnProperty(_loc2_)) {
            return CollectibleRarity.rarityColors[_loc2_] >>> 0;
        }
        return 8947848;
    }
}
