import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Graphics } from '@habbo-pixi/runtime/display/Graphics';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { GradientController } from '@/com/sulake/core/window/Classes.group';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';

export class GradientSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::GradientSkinRenderer'); }

    private static readonly SHAPE: Shape = new Shape();
    private static readonly MATRIX: Matrix = new Matrix();

    constructor(param1: string) {
        super(param1);
    }

    public static angleForDirection(param1: string): number {
        switch (GradientController.normalizeDirection(param1)) {
            case "right":
                return 0;
            case "down":
                return 3.141592653589793 / 2;
            case "left":
                return 3.141592653589793;
            case "up":
                return -1.5707963267948966;
            case "down_right":
                return 3.141592653589793 / 4;
            case "down_left":
                return 2.356194490192345;
            case "up_left":
                return -2.356194490192345;
            case "up_right":
                return -0.7853981633974483;
            default:
                return 3.141592653589793 / 2;
        }
    }

    public static rgbFromColor(param1: number): number {
        return (param1 & 0xFFFFFF) >>> 0;
    }

    public static alphaFromColor(param1: number): number {
        let _loc2_: number = (param1 >>> 24 & 0xFF) >>> 0;
        return _loc2_ == 0 ? 1 : _loc2_ / 255;
    }

    public static drawGradient(param1: BitmapData, param2: Rectangle, param3: number, param4: number, param5: string, param6: string): void {
        let _loc9_: string = GradientController.normalizeMode(param5) == "radial" ? "radial" : "linear";
        let _loc7_: number = _loc9_ == "linear" ? GradientSkinRenderer.angleForDirection(param6) : 0;
        GradientSkinRenderer.MATRIX.createGradientBox(param2.width, param2.height, _loc7_, param2.x, param2.y);
        let _loc8_: Graphics = GradientSkinRenderer.SHAPE.graphics;
        _loc8_.clear();
        _loc8_.beginGradientFill(_loc9_, [GradientSkinRenderer.rgbFromColor(param3), GradientSkinRenderer.rgbFromColor(param4)], [GradientSkinRenderer.alphaFromColor(param3), GradientSkinRenderer.alphaFromColor(param4)], [0, 255], GradientSkinRenderer.MATRIX, "pad", "rgb");
        _loc8_.drawRect(param2.x, param2.y, param2.width, param2.height);
        _loc8_.endFill();
        param1.fillRect(param2, 0);
        param1.draw(GradientSkinRenderer.SHAPE, null, null, null, param2);
        _loc8_.clear();
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc6_: GradientController = param1 instanceof GradientController ? param1 : null;
        if (_loc6_ == null || param2 == null || param3 == null || param3.width <= 0 || param3.height <= 0) {
            return;
        }
        GradientSkinRenderer.drawGradient(param2, param3, _loc6_.color1, _loc6_.color2, _loc6_.mode, _loc6_.direction);
    }

    public override isStateDrawable(param1: number): boolean {
        return true;
    }
}
