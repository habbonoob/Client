import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import { SkinTemplate } from '@/com/sulake/core/window/graphics/renderer/SkinTemplate';

export class BitmapSkinTemplate extends SkinTemplate {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::BitmapSkinTemplate'); }

    constructor(param1: string, param2: IAsset) {
        super(param1, param2);
    }
}
