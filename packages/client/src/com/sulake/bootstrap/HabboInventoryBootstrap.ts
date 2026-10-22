import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';

export class HabboInventoryBootstrap extends HabboInventory {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboInventoryBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
