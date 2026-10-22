import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SelectableController } from '@/com/sulake/core/window/Classes.group';
import { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';

export class CheckBoxController extends SelectableController implements ICheckBoxWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::CheckBoxController'); }

    protected static readonly TEXT_FIELD_NAME: string = "_CAPTION_TEXT";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set caption(param1: string) {
        super.caption = param1;
        let _loc2_: IWindow = this.getChildByName("_CAPTION_TEXT");
        if (_loc2_ != null) {
            _loc2_.caption = this.caption;
        }
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (param1 == this) {
            switch (param2.type) {
                case "WME_DOWN":
                    if (this.isSelected) {
                        param2.preventWindowOperation();
                    }
                    break;
                case "WME_UP":
                    if (this.isSelected) {
                        this.unselect();
                        break;
                    }
                    this.select();
            }
        }
        return super.update(param1, param2);
    }

    public override get caption(): string {
        return super.caption;
    }

    get [ICheckBoxWindow](): true {
        return true;
    }
}
