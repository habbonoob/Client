import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboConfigurationManager } from '@/com/sulake/habbo/configuration/HabboConfigurationManager';

export class HabboConfigurationManagerBootstrap extends HabboConfigurationManager {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboConfigurationManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
