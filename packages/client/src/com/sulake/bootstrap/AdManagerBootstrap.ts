import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { AdManager } from '@/com/sulake/habbo/advertisement/AdManager';

export class AdManagerBootstrap extends AdManager {
    static { registerClassName(this, 'com.sulake.bootstrap::AdManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
