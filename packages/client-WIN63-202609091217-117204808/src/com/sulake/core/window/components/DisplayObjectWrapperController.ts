import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { GraphicContext } from '@/com/sulake/core/window/graphics/GraphicContext';

export class DisplayObjectWrapperController extends WindowController implements IDisplayObjectWrapper {
    static { registerClassName(this, 'com.sulake.core.window.components::DisplayObjectWrapperController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 &= ~0x10;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_2451 = false;
    }

    public override getGraphicContext(param1: boolean): IGraphicContext {
        if (param1 && !this._SafeStr_2145) {
            this._SafeStr_2145 = new GraphicContext("GC {" + this._name + "}", 4, this.rectangle);
        }
        return this._SafeStr_2145;
    }

    public getDisplayObject(): DisplayObject {
        return this.getGraphicContext(true).getDisplayObject();
    }

    public setDisplayObject(param1: DisplayObject): void {
        this.getGraphicContext(true).setDisplayObject(param1);
    }

    get [IDisplayObjectWrapper](): true {
        return true;
    }
}
