import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class FillSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::FillSkinRenderer'); }

    constructor(param1: string) {
        super(param1);
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        param2.fillRect(param3, param1.color);
    }
}
