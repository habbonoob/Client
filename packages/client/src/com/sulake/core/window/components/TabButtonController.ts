import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SelectableController, WindowController } from '@/com/sulake/core/window/Classes.group';
import { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';

export class TabButtonController extends SelectableController implements ITabButtonWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::TabButtonController'); }

    private static readonly CONTENT_TAG: string = "TAB_BUTTON_CONTENT";
    private static readonly LABEL_TAG: string = "TAB_BUTTON_TITLE";
    private static readonly ICON_TAG: string = "TAB_BUTTON_ICON";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 1;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set caption(param1: string) {
        super.caption = param1;
        let _loc2_: IWindow = this.findChildByTag("TAB_BUTTON_TITLE");
        if (_loc2_ != null) {
            _loc2_.caption = param1;
        }
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (param2.type == "WE_CHILD_RESIZED") {
            WindowController.resizeToAccommodateChildren(this);
        }
        return super.update(param1, param2);
    }

    public override get caption(): string {
        return super.caption;
    }

    get [ITabButtonWindow](): true {
        return true;
    }
}
