import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomUI } from '@/com/sulake/habbo/ui/RoomUI';

export class RoomUIBootstrap extends RoomUI {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomUIBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
