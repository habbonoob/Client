import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboDiscordManager } from '@/com/sulake/habbo/discord/HabboDiscordManager';

export class HabboDiscordManagerBootstrap extends HabboDiscordManager {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboDiscordManagerBootstrap'); }

    constructor(param1: IContext, param2: number, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
