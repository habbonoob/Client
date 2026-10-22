import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IBackgroundWindow } from '@/com/sulake/core/window/components/IBackgroundWindow';
import { ContainerIterator } from '@/com/sulake/core/window/iterators/ContainerIterator';
import { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export class BackgroundController extends WindowController implements IBackgroundWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::BackgroundController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this.background = true;
        this.color = 4294967295;
    }

    public get iterator(): IIterator {
        return new ContainerIterator(this);
    }

    get [IBackgroundWindow](): true {
        return true;
    }

    get [IWindowContainer](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
