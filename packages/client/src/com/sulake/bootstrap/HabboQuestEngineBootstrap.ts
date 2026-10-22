import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';

export class HabboQuestEngineBootstrap extends HabboQuestEngine {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboQuestEngineBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
