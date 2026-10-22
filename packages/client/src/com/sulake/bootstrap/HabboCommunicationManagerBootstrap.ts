import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboCommunicationManager } from '@/com/sulake/habbo/communication/HabboCommunicationManager';

export class HabboCommunicationManagerBootstrap extends HabboCommunicationManager {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboCommunicationManagerBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
