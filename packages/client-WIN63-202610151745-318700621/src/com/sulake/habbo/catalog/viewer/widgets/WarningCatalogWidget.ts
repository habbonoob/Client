import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CatalogWidgetShowWarningTextEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetShowWarningTextEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';

export class WarningCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::WarningCatalogWidget'); }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._window.findChildByName("warning_text").caption = "";
        this.events.addEventListener("CWE_SHOW_WARNING_TEXT", this.onWarningText);
        return true;
    }

    private onWarningText = (param1: CatalogWidgetShowWarningTextEvent): void => {
        this._window.findChildByName("warning_text").caption = param1.text;
    };
}
