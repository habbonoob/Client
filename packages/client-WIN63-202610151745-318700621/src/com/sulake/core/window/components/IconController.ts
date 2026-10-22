import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { BitmapSkinRenderer } from '@/com/sulake/core/window/graphics/renderer/BitmapSkinRenderer';

export class IconController extends WindowController implements IIconWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::IconController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set style(param1: number) {
        super.style = param1;
    }

    public fitToSize(): void {
        let _loc3_: ISkinRenderer = this._context.getWindowFactory().getRendererByTypeAndStyle(1, this.style);
        if (!_loc3_) {
            return;
        }
        let _loc2_: BitmapSkinRenderer = _loc3_ instanceof BitmapSkinRenderer ? _loc3_ : null;
        if (!_loc2_) {
            return;
        }
        let _loc1_: ISkinLayout = _loc2_.getLayoutByState(this.state);
        if (!_loc1_) {
            return;
        }
        let _loc4_: number = _loc1_.width | 0;
        let _loc5_: number = _loc1_.height | 0;
        if (_loc4_ != this._SafeStr_2132 || _loc5_ != this._height) {
            this.setRectangle(this._SafeStr_2126, this._y, _loc4_, _loc5_);
        }
    }

    public override get style(): number {
        return super.style;
    }

    get [IIconWindow](): true {
        return true;
    }
}
