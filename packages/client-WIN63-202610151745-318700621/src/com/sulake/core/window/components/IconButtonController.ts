import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';

export class IconButtonController extends InteractiveController implements IIconButtonWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::IconButtonController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    get [IIconButtonWindow](): true {
        return true;
    }
}
