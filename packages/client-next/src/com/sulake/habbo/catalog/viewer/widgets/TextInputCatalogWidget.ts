import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { TextInputEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/TextInputEvent';

export class TextInputCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::TextInputCatalogWidget'); }

    declare private _SafeStr_4536: ITextFieldWindow;

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._SafeStr_4536 = asGuarded(this._window.findChildByName("input_text"), isITextFieldWindow);
        if (this._SafeStr_4536 != null) {
            this._SafeStr_4536.addEventListener("WKE_KEY_UP", this.onKey);
        }
        return true;
    }

    private onKey = (param1: WindowKeyboardEvent): void => {
        if (this._SafeStr_4536 == null) {
            return;
        }
        this.events.dispatchEvent(new TextInputEvent(this._SafeStr_4536.text));
    };
}
