import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';

export class HabboWindowManagerComponentBootstrap extends HabboWindowManagerComponent {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboWindowManagerComponentBootstrap'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
