import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';

export class HabboNotificationsBootstrap extends HabboNotifications {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboNotificationsBootstrap'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
