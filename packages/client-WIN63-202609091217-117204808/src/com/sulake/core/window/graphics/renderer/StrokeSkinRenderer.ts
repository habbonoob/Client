import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { StrokeController } from '@/com/sulake/core/window/Classes.group';
import { ShapeSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ShapeSkinRenderer';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class StrokeSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::StrokeSkinRenderer'); }

    private static readonly SIDE_MASK_ALL: number = 15;

    constructor(param1: string) {
        super(param1);
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc7_: StrokeController = param1 instanceof StrokeController ? param1 : null;
        if (_loc7_ == null || param2 == null || param3 == null || param3.width <= 0 || param3.height <= 0) {
            return;
        }
        param2.fillRect(param3, 0);
        if (_loc7_.strokeThickness <= 0) {
            return;
        }
        let _loc6_: number = Math.max(1, Math.round(_loc7_.strokeThickness)) | 0;
        let _loc8_: number = _loc7_.sideMask;
        if (_loc6_ <= 0) {
            return;
        }
        if (_loc8_ == 15 && _loc7_.radius > 0) {
            ShapeSkinRenderer.drawRoundRectStroke(param2, param3.x, param3.y, param3.width, param3.height, _loc7_.radius, _loc6_, param1.color);
            return;
        }
        ShapeSkinRenderer.drawRectStrokeSides(param2, param3.x, param3.y, param3.width, param3.height, _loc6_, param1.color, (_loc8_ & 1) != 0, (_loc8_ & 2) != 0, (_loc8_ & 4) != 0, (_loc8_ & 8) != 0);
    }

    public override isStateDrawable(param1: number): boolean {
        return true;
    }
}
