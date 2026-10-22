import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator.group';

export class HabboNavigatorBootstrap extends HabboNavigator {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboNavigatorBootstrap'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
