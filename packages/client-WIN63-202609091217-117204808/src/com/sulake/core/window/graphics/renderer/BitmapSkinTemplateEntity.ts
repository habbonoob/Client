import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SkinTemplateEntity } from '@/com/sulake/core/window/graphics/renderer/SkinTemplateEntity';

export class BitmapSkinTemplateEntity extends SkinTemplateEntity {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::BitmapSkinTemplateEntity'); }

    constructor(param1: string, param2: string, param3: number, param4: Rectangle) {
        super(param1, param2, param3, param4);
    }
}
