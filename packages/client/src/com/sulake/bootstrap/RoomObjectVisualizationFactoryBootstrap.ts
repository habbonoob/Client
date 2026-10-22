import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { RoomObjectVisualizationFactory } from '@/com/sulake/habbo/room/object/RoomObjectVisualizationFactory';

export class RoomObjectVisualizationFactoryBootstrap extends RoomObjectVisualizationFactory {
    static { registerClassName(this, 'com.sulake.bootstrap::RoomObjectVisualizationFactoryBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
