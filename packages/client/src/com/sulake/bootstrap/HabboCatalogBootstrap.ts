import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';

export class HabboCatalogBootstrap extends HabboCatalog {
    static { registerClassName(this, 'com.sulake.bootstrap::HabboCatalogBootstrap'); }

    constructor(context: IContext, flags: number = 0, assets: IAssetLibrary = null) {
        super(context, flags, assets);
    }
}
