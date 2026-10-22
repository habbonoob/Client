import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { SelectableController } from '@/com/sulake/core/window/Classes.group';
import { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class RadioButtonController extends SelectableController implements IRadioButtonWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::RadioButtonController'); }

    protected static readonly TEXT_FIELD_NAME: string = "_CAPTION_TEXT";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 1;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set caption(param1: string) {
        super.caption = param1;
        let _loc2_: IWindow = this.getChildByName("_CAPTION_TEXT");
        if (_loc2_ != null) {
            _loc2_.caption = this.caption;
        }
    }

    public override setRectangle(param1: number, param2: number, param3: number, param4: number): void {
        super.setRectangle(param1, param2, param3, param4);
        let _loc5_: ITextWindow = asGuarded(this.getChildByName("_CAPTION_TEXT"), isITextWindow);
        if (_loc5_ != null) {
            _loc5_.width = param3;
        }
    }

    public override get caption(): string {
        return super.caption;
    }

    get [IRadioButtonWindow](): true {
        return true;
    }
}
