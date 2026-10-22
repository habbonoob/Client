import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { SessionDataManager } from '@/com/sulake/habbo/session/SessionDataManager';

export class SessionDataManagerBootstrap extends SessionDataManager {
    static { registerClassName(this, 'com.sulake.bootstrap::SessionDataManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
