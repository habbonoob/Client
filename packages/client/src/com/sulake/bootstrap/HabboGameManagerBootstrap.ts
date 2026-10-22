import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboGameManager } from '@/com/sulake/habbo/game/HabboGameManager.group';

export class HabboGameManagerBootstrap extends HabboGameManager {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboGameManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
