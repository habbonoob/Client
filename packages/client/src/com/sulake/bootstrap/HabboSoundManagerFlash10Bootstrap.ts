import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';

export class HabboSoundManagerFlash10Bootstrap extends HabboSoundManagerFlash10 {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboSoundManagerFlash10Bootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
