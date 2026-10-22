import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboSoundManagerFlash10 } from '@/com/sulake/habbo/sound/HabboSoundManagerFlash10';

export class HabboSoundManagerFlash10Bootstrap extends HabboSoundManagerFlash10 {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboSoundManagerFlash10Bootstrap'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
