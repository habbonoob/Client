import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';

export class HabboFriendListBootstrap extends HabboFriendList {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboFriendListBootstrap'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }
}
