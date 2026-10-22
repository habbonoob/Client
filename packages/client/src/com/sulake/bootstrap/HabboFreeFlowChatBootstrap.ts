import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';

export class HabboFreeFlowChatBootstrap extends HabboFreeFlowChat {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboFreeFlowChatBootstrap'); }

    constructor(context: IContext, flags: number, assets: IAssetLibrary) {
        super(context, flags, assets);
    }
}
