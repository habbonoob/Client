import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';

export class HabboNotificationsBootstrap extends HabboNotifications {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboNotificationsBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
