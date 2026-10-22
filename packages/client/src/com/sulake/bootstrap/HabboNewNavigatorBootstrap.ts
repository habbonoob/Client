import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator.group';

export class HabboNewNavigatorBootstrap extends HabboNewNavigator {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboNewNavigatorBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
