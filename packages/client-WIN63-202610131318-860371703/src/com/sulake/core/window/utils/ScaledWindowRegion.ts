import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { RegionController, WindowContext } from '@/com/sulake/core/window/Classes.group';
import { GraphicContext } from '@/com/sulake/core/window/graphics/GraphicContext';

export class ScaledWindowRegion extends RegionController {
    static { registerClassName(this, 'com.sulake.core.window.utils::ScaledWindowRegion'); }

    declare private _SafeStr_15101: (...args: any[]) => any;

    constructor(param1: IWindowContainer, param2: (...args: any[]) => any, param3: (...args: any[]) => any) {
        super(param1.name + "_scaled", 5, 0, 0, castTo(param1.context, WindowContext), param1.rectangle, null, param2);
        this._SafeStr_15101 = param3;
    }

    public override getGraphicContext(param1: boolean): IGraphicContext {
        if (param1 && this._SafeStr_2145 == null) {
            this._SafeStr_2145 = new GraphicContext("GC {" + this._name + "}", 4, this.rectangle);
            this._SafeStr_2145.visible = this._visible;
        }
        return this._SafeStr_2145;
    }

    public override groupParameterFilteredChildrenUnderPoint(param1: Point, param2: any[], param3: number = 0): void {
        if (this.visible && this._SafeStr_15101(new Point(param1.x - this.x, param1.y - this.y))) {
            super.groupParameterFilteredChildrenUnderPoint(param1, param2, param3);
        }
    }
}
