import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboFriendBar } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';

export class HabboFriendBarBootstrap extends HabboFriendBar {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboFriendBarBootstrap'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
