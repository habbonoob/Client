import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';

export class HabboGroupsManagerBootstrap extends HabboGroupsManager {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboGroupsManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
