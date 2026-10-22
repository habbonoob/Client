import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { AvatarRenderManager } from '@/com/sulake/habbo/avatar/AvatarRenderManager';

export class AvatarRenderManagerBootstrap extends AvatarRenderManager {
    static { registerClassName(this, 'com.sulake.bootstrap::AvatarRenderManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
