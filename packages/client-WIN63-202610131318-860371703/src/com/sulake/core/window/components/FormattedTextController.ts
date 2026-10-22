import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextController } from '@/com/sulake/core/window/Classes.group';

export class FormattedTextController extends TextController {
    static { registerClassName(this, 'com.sulake.core.window.components::FormattedTextController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set text(param1: string) {
        if (param1 == null) {
            return;
        }
        if (this._localized) {
            this.context.removeLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
            this._localized = false;
        }
        this._caption = param1;
        if (!this._displayRaw && this._caption.charAt(0) == "$" && this._caption.charAt(1) == "{") {
            this._localized = true;
            this.context.registerLocalizationListener(this._caption.slice(2, this._caption.indexOf("}")), this);
        } else if (this._field != null) {
            this._field.htmlText = this._caption;
            this.refreshTextImage();
        }
    }

    public override set localization(param1: string) {
        if (param1 != null && this._field != null) {
            this._field.htmlText = this.limitStringLength(param1);
            this.refreshTextImage();
        }
    }

    public override get text(): string {
        return super.text;
    }
}
