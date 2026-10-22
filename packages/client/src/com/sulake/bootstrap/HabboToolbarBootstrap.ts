import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';

export class HabboToolbarBootstrap extends HabboToolbar {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboToolbarBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
