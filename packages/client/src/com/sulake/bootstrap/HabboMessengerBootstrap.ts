import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboMessenger } from '@/com/sulake/habbo/messenger/HabboMessenger';

export class HabboMessengerBootstrap extends HabboMessenger {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboMessengerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
