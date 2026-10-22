import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export class HabboFaceFocuser {
    static { registerClassName(this, 'com.sulake.habbo.utils::HabboFaceFocuser'); }

    private static readonly ICON_HEIGHT_NORMAL: number = 50;
    private static readonly ICON_WIDTH_NORMAL: number = 50;
    private static readonly _SafeStr_6655: any[] = [-100, -100, 21, 21, -100, -100, -100, -100, -100];
    private static readonly _SafeStr_7092: any[] = [-100, -100, 28, 30, -100, -100, -100, -100, -100];

    constructor() {
    }

    public static focusUserFace(param1: IAvatarImage, param2: string, param3: number, param4: number, param5: number = -1, param6: number = -1): BitmapData {
        let _loc11_: number = 50 * param4 | 0;
        let _loc10_: number = 50 * param4 | 0;
        if (param5 == -1) {
            param5 = _loc11_;
        }
        if (param6 == -1) {
            param6 = _loc10_;
        }
        param1.setDirection(param2, param3);
        let _loc9_: BitmapData = param1.getImage(param2, true, param4);
        let _loc12_: number = (param6 - _loc10_) / 2;
        let _loc7_: BitmapData = new BitmapData(param5 | 0, param6 | 0, true, 0);
        let _loc8_: Rectangle = new Rectangle(HabboFaceFocuser._SafeStr_6655[param3] * param4, HabboFaceFocuser._SafeStr_7092[param3] * param4, _loc11_, _loc10_);
        _loc7_.copyPixels(_loc9_, _loc8_, new Point(0, _loc12_));
        return _loc7_;
    }

    public static cutCircleFromBitmap(param1: BitmapData, param2: number): BitmapData {
        let _loc4_: number = param1.width;
        let _loc7_: number = param1.height;
        let _loc3_: BitmapData = new BitmapData(_loc4_, _loc7_, true, 0);
        let _loc6_: Shape = new Shape();
        _loc6_.graphics.beginFill(16777215);
        _loc6_.graphics.drawCircle(_loc4_ / 2, _loc7_ / 2, param2);
        _loc6_.graphics.endFill();
        let _loc5_: BitmapData = new BitmapData(_loc4_, _loc7_, true, 0);
        _loc5_.draw(_loc6_);
        _loc3_.copyPixels(param1, new Rectangle(0, 0, _loc4_, _loc7_), new Point(0, 0), _loc5_, new Point(0, 0), true);
        return _loc3_;
    }
}
