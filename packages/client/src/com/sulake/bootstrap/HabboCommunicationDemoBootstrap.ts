import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboCommunicationDemo } from '@/com/sulake/habbo/communication/demo/HabboCommunicationDemo';

export class HabboCommunicationDemoBootstrap extends HabboCommunicationDemo {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboCommunicationDemoBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
