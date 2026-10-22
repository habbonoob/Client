import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class ShapeSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::ShapeSkinRenderer'); }

    constructor(param1: string) {
        super(param1);
    }
}
