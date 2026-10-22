import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboLocalizationManager } from '@/com/sulake/habbo/localization/HabboLocalizationManager';

export class HabboLocalizationManagerBootstrap extends HabboLocalizationManager {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboLocalizationManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
